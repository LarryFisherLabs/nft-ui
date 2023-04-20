import React, { useEffect, useRef, useState } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { selectAntStatus, selectRarityPrices, selectSelectedIndexes } from "../../redux/slices/antSlice"
import { buyAntThunk } from "../../redux/thunks/antThunks"
import { Panel, StyledAntCanvas, StyledButton, TextBlock } from "../../styles/general"
import { recursiveDraw, baseElements } from "../../utils/ant-utils/antCanvasUtils"
import { staticLayerInfo } from "../../utils/ant-utils/staticAntInfo"

import styled from 'styled-components'
import { addPopup, selectAccount, selectNetId } from "../../redux/slices/connectSlice"
import { getHeightViewLevel, getViewLevel, getWidthOrHeightViewLevel, getWidthAndHeightViewLevel } from "../../utils/deviceType"
import { popupTypes } from "../../utils/json-constants/popupInfo"

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
    margin-top: 5px; 
    @media ${getWidthOrHeightViewLevel(3, 3)} {
        margin-top: 3px; 
        font-size: 1rem;
    }
    @media ${getHeightViewLevel(4), getViewLevel(6)} {
        margin-top: 1px; 
        font-size: .83rem;
    }
`


export const ColoredTextBlock = styled(TextBlock)`
    align-self: center;
    border-radius: 16px;
    @media ${getViewLevel(3)} {
        background-color: #8f7ae3;
    }
    @media ${getViewLevel(6)} {
        padding: 2px;
    }
`

export const LargerText = styled.div`
    color: #fed600;
    font-size: 1.2rem;
    font-weight: 600;
    @media ${getViewLevel(2)} {
        font-size: 1.1rem;
    }
    @media ${getWidthOrHeightViewLevel(3, 0)} {
        font-size: 1rem;
    }
    @media ${getWidthOrHeightViewLevel(4, 2)}, ${getWidthAndHeightViewLevel(3, 1)} {
        font-size: .9rem;
    }
    @media ${getWidthOrHeightViewLevel(5, 3)}, ${getWidthAndHeightViewLevel(3, 2)} {
        font-size: .8rem;
    }
    @media ${getHeightViewLevel(4)}, ${getWidthAndHeightViewLevel(3, 3)} {
        font-size: .73rem;
    }
`

const BlackText = styled(LargerText)`
    color: black;
    padding-bottom: .3rem;
    @media ${getHeightViewLevel(4)}, ${getWidthAndHeightViewLevel(3, 3)} {
        padding-bottom: .2rem;
    }
    @media ${getViewLevel(6)} {
        padding-bottom: .1rem;
    }
`

const BrownText = styled(LargerText)`
    text-shadow: black 1px 1px 0px;
    color: #ff7983;
`

const GreenText = styled(BrownText)`
    color: #68dd6b;
`

const GoldText = styled(BrownText)`
    color: #feff00;
`

const PurpleText = styled(BrownText)`
    color: #ffa3ff;
`

const TopPaddingText = styled(LargerText)`
    padding-top: .4rem;
    font-size: 1.3rem;
    @media ${getViewLevel(2)} {
        font-size: 1.2rem;
    }
    @media ${getWidthOrHeightViewLevel(3, 0)} {
        font-size: 1.1rem;
    }
    @media ${getWidthOrHeightViewLevel(4, 2)}, ${getWidthAndHeightViewLevel(3, 1)} {
        font-size: 1rem;
    }
    @media ${getWidthOrHeightViewLevel(5, 3)}, ${getWidthAndHeightViewLevel(3, 2)} {
        font-size: .9rem;
    }
    @media ${getHeightViewLevel(4)}, ${getWidthAndHeightViewLevel(3, 3)} {
        padding-top: .25rem;
        font-size: .83rem;
    }
    @media ${getViewLevel(6)} {
        padding-top: .1rem;
    }
`

export const AntCanvasPanel = styled(Panel)`
    display: flex;
    flex-flow: column;
    position: sticky;
    height: fit-content;
    top: 4rem;
    @media ${getViewLevel(3)} {
        top: 5.1rem;
    }
    @media ${getViewLevel(4)} {
        top: 4.7rem;
    }
    @media ${getViewLevel(6)} {
        top: 4.2rem;
    }
`
const _prices = [0.0009, 0.0018, 0.0054, 0.0135]

export const AntCanvas = () => {
    const dispatch = useDispatch()
    const address = useSelector(selectAccount)
    const netId = useSelector(selectNetId)
    const selectedIndexes = useSelector(selectSelectedIndexes, shallowEqual)
    const antStatus = useSelector(selectAntStatus)
    const pricesFromState = useSelector(selectRarityPrices, shallowEqual)
    const canvas = useRef()
    const [totalPrice, updatePrice] = useState(0.0099)
    const [prices, updatePrices] = useState([..._prices])

    useEffect(() => {
        const ctx = canvas.current.getContext('2d')
        updateAntCanvas(ctx, selectedIndexes)
    }, [selectedIndexes])

    useEffect(() => {
        if (pricesFromState[0] !== null) updatePrices([...pricesFromState])
    }, [pricesFromState])

    useEffect(() => {
        let price = 0
        selectedIndexes.forEach((partIndex, sectionIndex) => {
            if (staticLayerInfo[sectionIndex].elements[partIndex].rarity > 0) {
                price += parseFloat(prices[staticLayerInfo[sectionIndex].elements[partIndex].rarity - 1]) * 100000
            }
        })
        updatePrice((price + parseFloat(prices[0]) * 1100000) / 100000)
    }, [selectedIndexes, prices])

    const buyAnt = () => {
        dispatch(buyAntThunk({ selectedIndexes: selectedIndexes, totalPrice: totalPrice }))
        dispatch(addPopup({ id: popupTypes.txWaiting }))
    }

    return (
        <AntCanvasPanel>
            <StyledAntCanvas ref={canvas} height={164} width={164} >
                No browser support
            </StyledAntCanvas>
            <ColoredTextBlock>
                <BlackText>{"Ant Base Price: " + (prices[0] * 1100000 / 100000) + " eth"}</BlackText>
                <BrownText>{"Very Common Price: " + prices[0] + " eth"}</BrownText>
                <GreenText>{"Common Price: " + prices[1] + " eth"}</GreenText>
                <GoldText>{"Rare Price: " + prices[2] + " eth"}</GoldText>
                <PurpleText>{"Very Rare Price: " + prices[3] + " eth"}</PurpleText>
                <TopPaddingText>{"Total Ant Price: " + totalPrice + " eth"}</TopPaddingText>
            </ColoredTextBlock>
            { netId === 0 || netId === 1 ? <ColoredTextBlock>Please Change Network</ColoredTextBlock> : address === null ? <ColoredTextBlock>Please Connect</ColoredTextBlock> : null}
            {
                antStatus === 'succeeded' ? <StickyButton onClick={buyAnt}>Buy Ant</StickyButton> : 
                (antStatus === 'Buying ant...') || (antStatus.includes('Loading')) ? <ColoredTextBlock>{antStatus}</ColoredTextBlock> : null
            }
        </AntCanvasPanel>
    )
}
