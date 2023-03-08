import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectAntStatus, selectRarityPrices, selectSelectedIndexes } from "../../redux/slices/antSlice"
import { buyAntThunk } from "../../redux/thunks/antThunks"
import { Panel, StyledAntCanvas, StyledButton, TextBlock } from "../../styles/general"
import { recursiveDraw, baseElements } from "../../utils/ant-utils/antCanvasUtils"
import { staticLayerInfo } from "../../utils/ant-utils/staticAntInfo"

import styled from 'styled-components'
import { selectIsConnected, selectStatus, selectViewLevel } from "../../redux/slices/connectSlice"

const updateAntCanvas = (ctx, indexes) => {
    ctx.clearRect(0, 0, 328, 328)
    const fileNameArray = [[], [], [], [], [], []]
    indexes.forEach((selectedIndex, layerIndex) => {
        const layer = staticLayerInfo[layerIndex]
        if ((selectedIndex !== layer.defaultIndex) || selectedIndex > 0) {
            fileNameArray[layer.elements[selectedIndex].layerLevel].push(`ant/${layer.fileName}/${layer.elements[selectedIndex].name}.png`)
        }
    })
    recursiveDraw([...fileNameArray[0], ...baseElements, ...fileNameArray[1], ...fileNameArray[2], ...fileNameArray[3], ...fileNameArray[4], ...fileNameArray[5]], 0, ctx)
}


export const StickyButton = styled(StyledButton)`
    font-size: ${props => props.viewLevel < 4 ? null : '1rem'};
    margin-top: 5px; 
`


export const LeftTextBlock = styled(TextBlock)`
    align-self: ${props => props.viewLevel < 4 ? 'start' : 'center'};
    background-color: ${props => props.viewLevel < 4 ? null : '#901778'};
    border-radius: 16px;
`

export const AntCanvasPanel = styled(Panel)`
    display: flex;
    flex-flow: column;
    position: sticky;
    height: fit-content;
    top: ${props => props.viewLevel < 4 ? '4.6rem' : '6.21rem'};
`
const _prices = [0.0009, 0.0018, 0.0054, 0.0135]

export const AntCanvas = () => {
    const dispatch = useDispatch()
    const connectStatus = useSelector(selectStatus)
    const isConnected = useSelector(selectIsConnected)
    const selectedIndexes = useSelector(selectSelectedIndexes)
    const antStatus = useSelector(selectAntStatus)
    const pricesFromState = useSelector(selectRarityPrices)
    const viewLevel = useSelector(selectViewLevel)
    const canvas = useRef()
    const [totalPrice, updatePrice] = useState(0.0099)
    const [isFirstLoad, toggleIsFirstLoad] = useState(true)
    const [prices, updatePrices] = useState([..._prices])

    useEffect(() => {
        const ctx = canvas.current.getContext('2d')
        if ((connectStatus === 'succeeded' && !isConnected) || (connectStatus === 'succeeded' && isFirstLoad) || antStatus === 'succeeded' || connectStatus === "offline") updateAntCanvas(ctx, selectedIndexes)
        if (connectStatus === 'succeeded' && isFirstLoad) toggleIsFirstLoad(false)
        if (pricesFromState[0] !== null && pricesFromState[0] !== prices[0]) updatePrices([...pricesFromState])
        if (antStatus !== 'Buying ant...') {
            let price = 0
            selectedIndexes.forEach((partIndex, sectionIndex) => {
                if (staticLayerInfo[sectionIndex].elements[partIndex].rarity > 0) {
                    price += parseFloat(prices[staticLayerInfo[sectionIndex].elements[partIndex].rarity - 1]) * 100000
                }
            })
            updatePrice((price + parseFloat(prices[0]) * 1100000) / 100000)
        }
    }, [connectStatus, antStatus, selectedIndexes, isConnected, isFirstLoad, prices, pricesFromState])

    const buyAnt = () => {
        dispatch(buyAntThunk({ selectedIndexes: selectedIndexes, totalPrice: totalPrice }))
    }

    return (
        <AntCanvasPanel viewLevel={viewLevel}>
            <StyledAntCanvas ref={canvas} height={164} width={164} viewLevel={viewLevel} >
                No browser support
            </StyledAntCanvas>
            <LeftTextBlock viewLevel={viewLevel}>
                <div>{"Ant Base Price: " + (prices[0] * 1100000 / 100000) + " eth"}</div>
                <div>{"Very Common Price: " + prices[0] + " eth"}</div>
                <div>{"Common Price: " + prices[1] + " eth"}</div>
                <div>{"Rare Price: " + prices[2] + " eth"}</div>
                <div>{"Very Rare Price: " + prices[3] + " eth"}</div>
                <div>{"Total Ant Price: " + totalPrice + " eth"}</div>
            </LeftTextBlock>
            {isConnected === false ? <LeftTextBlock viewLevel={viewLevel}>Please Connect</LeftTextBlock> : null}
            {
                antStatus === 'succeeded' ? <StickyButton viewLevel={viewLevel} onClick={buyAnt}>Buy Ant</StickyButton> : 
                (antStatus === 'Buying ant...') || (antStatus.includes('Loading')) ? <LeftTextBlock viewLevel={viewLevel}>{antStatus}</LeftTextBlock> : null
            }
        </AntCanvasPanel>
    )
}
