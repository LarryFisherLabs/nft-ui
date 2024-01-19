import React, { useEffect, useRef, useState } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { selectAntStatus, selectRarityPrices, selectSelectedIndexes } from "../../redux/slices/antSlice"
import { buyAntThunk } from "../../redux/thunks/antThunks"
import { Panel, StyledAntCanvas, StyledButton, TextBlock } from "../../styles/general"
import { recursiveDraw, baseElements, reflectiveBeltId_, nvgId_ } from "../../utils/ant-utils/antCanvasUtils"
import { staticLayerInfo } from "../../utils/ant-utils/staticAntInfo"

import styled from 'styled-components'
import { addPopup, selectAccount, selectNetId } from "../../redux/slices/connectSlice"
import { getHeightViewLevel, getViewLevel, getWidthOrHeightViewLevel, getWidthAndHeightViewLevel } from "../../utils/deviceType"
import { popupTypes } from "../../utils/json-constants/popupInfo"

const updateAntCanvas = (ctx, indexes) => {
    ctx.clearRect(0, 0, 328, 328)
    const fileNameArray = [[], [], [], [], [], [], [], [], []]
    indexes.forEach((selectedIndex, layerIndex) => {
        const fileNameEnd = (
            (
                (layerIndex === 7) &&
                (selectedIndex === reflectiveBeltId_) &&
                staticLayerInfo[8].elements[indexes[8]].hasOwnProperty('hasSleeves')
            ) || (
                (layerIndex === 3) &&
                (selectedIndex === nvgId_) &&
                staticLayerInfo[1].elements[indexes[1]].name.includes('helm') &&
                !(staticLayerInfo[1].elements[indexes[1]].name.includes('shrouded'))
            )
        ) ? '-alt.png' : '.png'
        const isEmpty = staticLayerInfo[layerIndex].elements[selectedIndex].name === 'empty'
        const layer = staticLayerInfo[layerIndex]
        if (!isEmpty) {
            fileNameArray[layer.elements[selectedIndex].layerLevel].push(`ant/${layer.fileName}/${layer.elements[selectedIndex].name}${fileNameEnd}`)
        }
    })
    recursiveDraw([...fileNameArray[0], ...baseElements, ...fileNameArray[1], ...fileNameArray[2], ...fileNameArray[3], ...fileNameArray[4], ...fileNameArray[5], ...fileNameArray[6], ...fileNameArray[7], ...fileNameArray[8]], 0, ctx)
}


const StickyButton = styled(StyledButton)`
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

const ColoredTextBlock = styled(TextBlock)`
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

const StldPanelTitle = styled.div`
    font-size: 1.4rem;
    font-weight: 800;
    align-self: center;
    @media ${getWidthOrHeightViewLevel(0, 0)} {
        font-size: 1.35rem;
    }
    @media ${getWidthOrHeightViewLevel(1, 1)} {
        font-size: 1.3rem;
    }
    @media ${getWidthOrHeightViewLevel(2, 2)} {
        font-size: 1.25rem;
    }
    @media ${getWidthOrHeightViewLevel(4, 3)}, ${getWidthAndHeightViewLevel(3, 1)} {
        font-size: 1.2rem;
        font-weight: 700;
    }
    @media ${getHeightViewLevel(4)}, ${getWidthAndHeightViewLevel(3, 2)} {
        font-size: 1.15rem;
    }
    @media ${getWidthAndHeightViewLevel(3, 3)}, ${getViewLevel(6)} {
        font-size: 1.1rem;
        font-weight: 600;
    }
`

const StldBtmPnlTitle = styled.div`
    font-size: 1.3rem;
    font-weight: 700;
    padding-top: .3rem;
    align-self: center;
    @media ${getWidthOrHeightViewLevel(0, 0)} {
        font-size: 1.25rem;
    }
    @media ${getWidthOrHeightViewLevel(1, 1)} {
        font-size: 1.2rem;
    }
    @media ${getWidthOrHeightViewLevel(2, 2)} {
        font-size: 1.15rem;
    }
    @media ${getWidthOrHeightViewLevel(4, 3)}, ${getWidthAndHeightViewLevel(3, 1)} {
        font-size: 1.1rem;
        font-weight: 600;
    }
    @media ${getHeightViewLevel(4)}, ${getWidthAndHeightViewLevel(3, 2)} {
        font-size: 1.05rem;
        padding-top: .2rem;
    }
    @media ${getWidthAndHeightViewLevel(3, 3)}, ${getViewLevel(6)} {
        font-size: 1rem;
        padding-top: .1rem;
    }
`

const LargerText = styled.div`
    font-size: 1.2rem;
    font-weight: 600;
    @media ${getWidthOrHeightViewLevel(0, 0)} {
        font-size: 1rem;
    }
    @media ${getWidthOrHeightViewLevel(1, 1)} {
        font-size: .94rem;
    }
    @media ${getWidthOrHeightViewLevel(2, 2)} {
        font-size: .87rem;
    }
    @media ${getWidthOrHeightViewLevel(4, 3)}, ${getWidthAndHeightViewLevel(3, 1)} {
        font-size: .84rem;
        font-weight: 550;
    }
    @media ${getHeightViewLevel(4)}, ${getWidthAndHeightViewLevel(3, 2)} {
        font-size: .74rem;
    }
    @media ${getWidthAndHeightViewLevel(3, 3)}, ${getViewLevel(6)} {
        font-size: .73rem;
    }
`

const SmallerText = styled.div`
    font-size: 1.1rem;
    font-weight: 600;
    @media ${getWidthOrHeightViewLevel(0, 0)} {
        font-size: .92rem;
    }
    @media ${getWidthOrHeightViewLevel(1, 1)} {
        font-size: .86rem;
    }
    @media ${getWidthOrHeightViewLevel(2, 2)} {
        font-size: .81rem;
    }
    @media ${getWidthOrHeightViewLevel(4, 3)}, ${getWidthAndHeightViewLevel(3, 1)} {
        font-size: .8rem;
        font-weight: 550;
    }
    @media ${getHeightViewLevel(4)}, ${getWidthAndHeightViewLevel(3, 2)} {
        font-size: .73rem;
    }
    @media ${getWidthAndHeightViewLevel(3, 3)}, ${getViewLevel(6)} {
        font-size: .72rem;
    }
`

const BlackText = styled(LargerText)`
    color: black;
    padding-bottom: .2rem;
    @media ${getWidthOrHeightViewLevel(2, 2)} {
        padding-bottom: .15rem;
    }
`

const ThemeGoldText = styled(BlackText)`
    color: #fed600;
`

// when the TP count which is displayed in theme gold text goes to zero this is used
const ThemeGoldBlackAltText = styled(ThemeGoldText)`
    color: black;
`

// when the TP count which is displayed in theme gold text goes negative this is used
const ThemeGoldRedAltText = styled(ThemeGoldText)`
    color: red;
`

const GrayText = styled(SmallerText)`
    text-shadow: black 1px 1px 0px;
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

const SpecialText = styled(GrayText)`
    color: #feff00;
`

const EpicText = styled(GrayText)`
    color: #ff3790;
`

const LegendText = styled(GrayText)`
    color: #eb65ff;
`

const AntCanvasPanel = styled(Panel)`
    display: flex;
    flex-flow: column;
    position: sticky;
    height: fit-content;
    top: 4rem;
    min-width: 480px;
    @media ${getWidthOrHeightViewLevel(0, 0)} {
        min-width: 420px;
    }
    @media ${getWidthOrHeightViewLevel(1, 1)} {
        min-width: 410px;
    }
    @media ${getWidthOrHeightViewLevel(2, 2)} {
        min-width: 380px;
    }
    @media ${getHeightViewLevel(4)}, ${getWidthAndHeightViewLevel(3, 2)} {
        min-width: 340px;
    }
    @media ${getWidthAndHeightViewLevel(3, 3)}, ${getViewLevel(6)} {
        min-width: 320px;
    }
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

const Row = styled.div`
    display: flex;
    flex-flow: row;
`

const StldTextRow = styled(Row)`
    justify-content: space-between;
    width: 100%;
    gap: 1rem;
    @media ${getWidthOrHeightViewLevel(1, 1)} {
        gap: .6rem;
    }
    @media ${getViewLevel(4)} {
        gap: .3rem;
    }
`

const LeftColCont = styled(Row)`
    width: 47.7%;
    justify-content: center;
    align-items: center;
`

const RightColCont = styled(LeftColCont)`
    width: 52.3%;
`

const Col = styled(Row)`
    flex-flow: column;
`

// Vcom, com, rare, Vrare, Erare, special, epic, legendary
// 5,000, 3,000, 200, 84, 36, 18, 9, 3
const _prices = [0.0009, 0.0015, 0.0036, 0.0072, 0.045, 0.108, 0.315, 0.48]

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
                <StldPanelTitle>Prices</StldPanelTitle>
                <Row>
                    <LeftColCont>
                        <Col>
                            <StldTextRow>
                                <BlackText>{"Ant Base:"}</BlackText>
                                <BlackText>{(prices[0] * 1100000 / 100000) + " eth"}</BlackText>
                            </StldTextRow>
                            <StldTextRow>
                                <GrayText>{"Very Common:"}</GrayText>
                                <GrayText>{prices[0] + " eth"}</GrayText>
                            </StldTextRow>
                            <StldTextRow>
                                <BrownText>{"Common:"}</BrownText>
                                <BrownText>{prices[1] + " eth"}</BrownText>
                            </StldTextRow>
                            <StldTextRow>
                                <GreenText>{"Rare:"}</GreenText>
                                <GreenText>{prices[2] + " eth"}</GreenText>
                            </StldTextRow>
                            <StldTextRow>
                                <GoldText>{"Very Rare:"}</GoldText>
                                <GoldText>{prices[3] + " eth"}</GoldText>
                            </StldTextRow>
                        </Col>
                    </LeftColCont>
                    <RightColCont>
                        <Col>
                            <StldTextRow>
                                <ThemeGoldText>{"Trait Points:"}</ThemeGoldText>
                                {
                                    traitPoints > 0 ? <ThemeGoldText>{traitPoints + " TP"}</ThemeGoldText> :
                                    traitPoints === 0 ? <ThemeGoldBlackAltText>{traitPoints + " TP"}</ThemeGoldBlackAltText> :
                                    <ThemeGoldRedAltText>{traitPoints + " TP"}</ThemeGoldRedAltText>
                                }
                            </StldTextRow>
                            <StldTextRow>
                                <PurpleText>{"Extra Rare:"}</PurpleText>
                                <PurpleText>{prices[4] + " eth + " + _eRareTPCost + " TP"}</PurpleText>
                            </StldTextRow>
                            <StldTextRow>
                                <SpecialText>{"Special:"}</SpecialText>
                                <SpecialText>{prices[5] + " eth + " + _specialTPCost + " TP"}</SpecialText>
                            </StldTextRow>
                            <StldTextRow>
                                <EpicText>{"Epic:"}</EpicText>
                                <EpicText>{prices[6] + " eth + " + _epicTPCost + " TP"}</EpicText>
                            </StldTextRow>
                            <StldTextRow>
                                <LegendText>{"Legendary:"}</LegendText>
                                <LegendText>{prices[7] + " eth + " + _legendaryTPCost + " TP"}</LegendText>
                            </StldTextRow>
                        </Col>
                    </RightColCont>
                </Row>
                <StldBtmPnlTitle>{"Ant Total: " + totalPrice + " eth"}</StldBtmPnlTitle>
            </ColoredTextBlock>
            { netId === 0 || netId === 1 ? <ErrorText>Please Change Network</ErrorText> : address === null ? <ErrorText>Please Connect</ErrorText> : null}
            {
                antStatus === 'succeeded' ? <StickyButton onClick={buyAnt}>Buy Ant</StickyButton> : 
                (antStatus === 'Buying ant...') || (antStatus.includes('Loading')) ? <ColoredTextBlock>{antStatus}</ColoredTextBlock> : null
            }
        </AntCanvasPanel>
    )
}
