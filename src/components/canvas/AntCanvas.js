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
    const fileNameArray = [[], [], [], [], [], [], []]
    indexes.forEach((selectedIndex, layerIndex) => {
        const isEmpty = staticLayerInfo[layerIndex].elements[selectedIndex].name === 'empty'
        const layer = staticLayerInfo[layerIndex]
        if (!isEmpty) {
            fileNameArray[layer.elements[selectedIndex].layerLevel].push(`ant/${layer.fileName}/${layer.elements[selectedIndex].name}.png`)
        }
    })
    recursiveDraw([...fileNameArray[0], ...baseElements, ...fileNameArray[1], ...fileNameArray[2], ...fileNameArray[3], ...fileNameArray[4], ...fileNameArray[5], ...fileNameArray[6]], 0, ctx)
}


export const StickyButton = styled(StyledButton)`
    margin-top: 5px; 
    @media ${getWidthOrHeightViewLevel(3, 3)} {
        margin-top: 3px; 
        font-size: 1rem;
    }
    @media ${getHeightViewLevel(4)}, ${getViewLevel(6)} {
        margin-top: 1px; 
        font-size: .83rem;
    }
`

const ErrorText = styled(TextBlock)`
    align-self: center;
    border-radius: 16px;
    @media ${getViewLevel(3)} {
        background-color: #8f7ae3;
    }
    @media ${getViewLevel(6)} {
        padding: 2px;
    }
`

export const ColoredTextBlock = styled(TextBlock)`
    display: flex;
    flex-flow: column;
    align-self: center;
    border-radius: 16px;
    width: 100%;
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

const BlackText = styled.div`
    color: black;
    font-size: 1.1rem;
    font-weight: 600;
    padding-bottom: .2rem;
    @media ${getViewLevel(1)} {
        font-size: .9rem;
    }
    @media ${getViewLevel(2)} {
        font-size: .8rem;
    }
    @media ${getWidthOrHeightViewLevel(3, 0)} {
        font-size: .78rem;
    }
    @media ${getWidthOrHeightViewLevel(4, 2)}, ${getWidthAndHeightViewLevel(3, 1)} {
        font-size: .76rem;
    }
    @media ${getWidthOrHeightViewLevel(5, 3)}, ${getWidthAndHeightViewLevel(3, 2)} {
        font-size: .74rem;
    }
    @media ${getHeightViewLevel(4)}, ${getWidthAndHeightViewLevel(3, 3)} {
        font-size: .72rem;
    }
`

const GrayText = styled(BlackText)`
    text-shadow: black 1px 1px 0px;
    padding-bottom: 0;
    color: lightgray;
`

const BrownText = styled(GrayText)`
    color: #eab0b4;
`

const GreenText = styled(GrayText)`
    color: #f39332;
`

const GoldText = styled(GrayText)`
    color: #57ec5a;
`

const PurpleText = styled(GrayText)`
    color: #54f4fd;
`

const ThemeGoldText = styled(GrayText)`
    padding-bottom: .2rem;
    color: #fed600;
`

const SpecialText = styled(GrayText)`
    color: #feff00;
`

const EpicText = styled(GrayText)`
    color: #ff3790;
`

const LegendText = styled(GrayText)`
    color: #eb65ff;
`

const TopPaddingText = styled(LargerText)`
    padding-top: .3rem;
    font-size: 1.3rem;
    align-self: center;
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
        padding-top: .2rem;
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
    min-width: 42%;
    @media ${getViewLevel(3)} {
        top: 5.1rem;
        min-width: 60%;
    }
    @media ${getViewLevel(4)} {
        top: 4.7rem;
        min-width: 80%;
    }
    @media ${getViewLevel(6)} {
        top: 4.2rem;
        min-width: 90%;
    }
`

const Row = styled.div`
    display: flex;
    flex-flow: row;
`

const LeftColCont = styled(Row)`
    width: 50%;
    justify-content: center;
    align-items: center;
`

const RightColCont = styled(LeftColCont)`
    width: 50%;
`

const Col = styled(Row)`
    flex-flow: column;
`

// Vcom, com, rare, Vrare, Erare, special, epic, legendary
// 5,000, 3,000, 200, 69, 30, 15, 4, 3
const _prices = [0.0009, 0.0021, 0.006, 0.0169, 0.06, 0.2, 0.55, 0.8]

const _traitPointAllowance = 9
const _eRareTPCost = 1
const _specialTPCost = 3
const _epicTPCost = 4
const _legendaryTPCost = 5

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
    const [traitPoints, setTraitPoints] = useState(_traitPointAllowance)
    const [isTPNeg, setIsTPNeg] = useState(false)

    useEffect(() => {
        const ctx = canvas.current.getContext('2d')
        updateAntCanvas(ctx, selectedIndexes)
        let _traitPoints = _traitPointAllowance
        for (let i = 0; i < selectedIndexes.length; i++) {
            if (staticLayerInfo[i].elements[selectedIndexes[i]].name !== 'empty' && staticLayerInfo[i].elements[selectedIndexes[i]].rarity > 4) {
                if (staticLayerInfo[i].elements[selectedIndexes[i]].rarity === 5) _traitPoints = _traitPoints - _eRareTPCost
                else if (staticLayerInfo[i].elements[selectedIndexes[i]].rarity === 6) _traitPoints = _traitPoints - _specialTPCost
                else if (staticLayerInfo[i].elements[selectedIndexes[i]].rarity === 7) _traitPoints = _traitPoints - _epicTPCost
                else if (staticLayerInfo[i].elements[selectedIndexes[i]].rarity === 8) _traitPoints = _traitPoints - _legendaryTPCost
            }
        }
        if (_traitPoints < 0) setIsTPNeg(true)
        else setIsTPNeg(false)
        setTraitPoints(_traitPoints)
    }, [selectedIndexes, dispatch])

    useEffect(() => {
        if (isTPNeg) dispatch(addPopup({ id: popupTypes.antConflict.traitPoints }))
    }, [isTPNeg, dispatch])

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
        let isUpcomingSelected = false
        for (let i = 0; i < selectedIndexes.length; i++) {
            if (staticLayerInfo[i].elements[selectedIndexes[i]].hasOwnProperty('isComingSoon')) {
                isUpcomingSelected = true
            }
        }
        if (isUpcomingSelected) {
            dispatch(buyAntThunk({ selectedIndexes: selectedIndexes, totalPrice: totalPrice }))
            dispatch(addPopup({ id: popupTypes.txWaiting }))
        } else dispatch(addPopup({ id: popupTypes.antConflict.upcomingSelected}))
    }

    return (
        <AntCanvasPanel>
            <StyledAntCanvas ref={canvas} height={164} width={164} >
                No browser support
            </StyledAntCanvas>
            <ColoredTextBlock>
                <Row>
                    <LeftColCont>
                    <Col>
                        <BlackText>{"Ant Base Price: " + (prices[0] * 1100000 / 100000) + " eth"}</BlackText>
                        <GrayText>{"Very Common Price: " + prices[0] + " eth"}</GrayText>
                        <BrownText>{"Common Price: " + prices[1] + " eth"}</BrownText>
                        <GreenText>{"Rare Price: " + prices[2] + " eth"}</GreenText>
                        <GoldText>{"Very Rare Price: " + prices[3] + " eth"}</GoldText>
                    </Col>
                    </LeftColCont>
                    <RightColCont>
                    <Col>
                        <ThemeGoldText>{"Trait Points (TP): " + traitPoints}</ThemeGoldText>
                        <PurpleText>{"Extra Rare Price: " + prices[4] + " eth + " + _eRareTPCost + " TP"}</PurpleText>
                        <SpecialText>{"Special Price: " + prices[5] + " eth + " + _specialTPCost + " TP"}</SpecialText>
                        <EpicText>{"Epic Price: " + prices[6] + " eth + " + _epicTPCost + " TP"}</EpicText>
                        <LegendText>{"Legendary Price: " + prices[7] + " eth + " + _legendaryTPCost + " TP"}</LegendText>
                    </Col>
                    </RightColCont>
                </Row>
                <TopPaddingText>{"Total Ant Price: " + totalPrice + " eth"}</TopPaddingText>
            </ColoredTextBlock>
            { netId === 0 || netId === 1 ? <ErrorText>Please Change Network</ErrorText> : address === null ? <ErrorText>Please Connect</ErrorText> : null}
            {
                antStatus === 'succeeded' ? <StickyButton onClick={buyAnt}>Buy Ant</StickyButton> : 
                (antStatus === 'Buying ant...') || (antStatus.includes('Loading')) ? <ColoredTextBlock>{antStatus}</ColoredTextBlock> : null
            }
        </AntCanvasPanel>
    )
}
