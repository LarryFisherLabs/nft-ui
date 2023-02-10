import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectAntStatus, selectRarityPrices, selectSelectedIndexes } from "../../redux/slices/antSlice"
import { buyAntThunk } from "../../redux/thunks/antThunks"
import { Panel, StyledAntCanvas, StyledButton, Text, TextBlock, ViewStyle } from "../../styles/general"
import { recursiveDraw, baseElements } from "../../utils/ant-utils/antCanvasUtils"
import { staticLayerInfo } from "../../utils/ant-utils/staticAntInfo"

import styled from 'styled-components'

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
    position: sticky;
    top: 83%;
    margin-top: 15px; 
`


export const LeftTextBlock = styled(TextBlock)`
    align-self: start;
`

export const AntCanvasPanel = styled(Panel)`
    display: flex;
    flex-flow: column;
    min-width: 500px;
    position: sticky;
    height: fit-content;
    top: 10%;
`

export const AntCanvas = () => {
    const dispatch = useDispatch()
    const selectedIndexes = useSelector(selectSelectedIndexes)
    const antStatus = useSelector(selectAntStatus)
    const prices = useSelector(selectRarityPrices)
    const canvas = useRef()
    const [totalPrice, updatePrice] = useState()

    useEffect(() => {
        if (antStatus === 'succeeded') {
            const ctx = canvas.current.getContext('2d');
            updateAntCanvas(ctx, selectedIndexes)
            let price = 0
            selectedIndexes.forEach((partIndex, sectionIndex) => {
                if (staticLayerInfo[sectionIndex].elements[partIndex].rarity > 0) {
                    price += parseFloat(prices[staticLayerInfo[sectionIndex].elements[partIndex].rarity - 1]) * 100000
                }
            })
            updatePrice((price + parseFloat(prices[0]) * 1100000) / 100000)
        }
    }, [antStatus, selectedIndexes, prices])

    const buyAnt = () => {
        dispatch(buyAntThunk({ selectedIndexes: selectedIndexes, totalPrice: totalPrice }))
    }

    return (
        <AntCanvasPanel>
            <StyledAntCanvas ref={canvas} height={164} width={164} >
                No browser support
            </StyledAntCanvas>
            {antStatus === 'succeeded' ? (
                <LeftTextBlock>
                    <div>{"Ant Base Price: " + (prices[0] * 1100000 / 100000) + " eth"}</div>
                    <div>{"Very Common Price: " + prices[0] + " eth"}</div>
                    <div>{"Common Price: " + prices[1] + " eth"}</div>
                    <div>{"Rare Price: " + prices[2] + " eth"}</div>
                    <div>{"Very Rare Price: " + prices[3] + " eth"}</div>
                    <div>{"Total Ant Price: " + totalPrice + " eth"}</div>
                </LeftTextBlock>
            ) : <Text>{antStatus}</Text>}
            <StickyButton onClick={buyAnt}>Buy Ant</StickyButton>
        </AntCanvasPanel>
    )
}
