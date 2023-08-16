import React, { useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { removeAntFile, selectAntFile, selectAntStatus, selectPartStocks, selectSelectedIndexes } from '../redux/slices/antSlice.js'
import { Title2CrossHair, Title4, Text, SmallText, CanvasPanel } from '../styles/general'
import { staticLayerInfo } from '../utils/ant-utils/staticAntInfo.js'

import styled from 'styled-components'
import { getViewLevel } from '../utils/deviceType.js'
import { popupTypes } from '../utils/json-constants/popupInfo.js'
import { addPopup } from '../redux/slices/connectSlice.js'
import { gasMaskCheck, shroudedCheck, toggleEod } from '../utils/ant-utils/antCanvasUtils.js'

export const Button = styled.div`
    display: flex;
    flex-flow: column nowrap;
    background-image: url(${props => props.srcFile});
    background-size: contain;
    padding: 5px;
    width: 164px;
    height: 164px;
    border: ${props => props.isSelected ? '5px solid #c76648' : props.isDisabled ? '5px solid rgb(199, 102, 72, .23)' : '1px solid #83f394'};
    align-items: center;
    cursor: pointer;
    justify-content: space-between;
    @media ${getViewLevel(0)} {
        width: 150px;
        height: 150px;
    }
    @media ${getViewLevel(1)} {
        width: 140px;
        height: 140px;
    }
    @media ${getViewLevel(2)} {
        width: 130px;
        height: 130px;
    }
    @media ${getViewLevel(3)} {
        width: 120px;
        height: 120px;
    }
    @media ${getViewLevel(6)} {
        width: 100px;
        height: 100px;
    }
`

export const ButtonsPanel = styled(CanvasPanel)`
    padding: 0 1.2rem;
    min-width: 100px;
    padding-bottom: 1.2rem;
    max-width: 100%;
    @media ${getViewLevel(3)} {
        margin-bottom: .6rem;
    }
`

export const SectionButtons = styled.div`
    flex-flow: row wrap;
    display: ${props => props.isOpen ? 'flex' : 'none'};
    gap: .7rem;
    justify-content: center;
    @media ${getViewLevel(3)} {
        gap: .2rem;
    }
`

export const ToggledRemove = styled.div`
    display: ${props => props.isDisabled ? 'block' : 'none'};
`

export const ButtonBottom = styled.div`
    display: flex;
    align-items: center;
    flex-flow: column nowrap;
`

export const LayerButtons = ({ layerIndex, isUpcomingDisplayed }) => {
    const dispatch = useDispatch()
    const selectedIndexes = useSelector(selectSelectedIndexes, shallowEqual)
    const partStocks = useSelector(selectPartStocks, shallowEqual)
    const antStatus = useSelector(selectAntStatus)

    const [isOpen, toggle] = useState(true)

    const clickAction = (element, index) => {
        if (antStatus !== 'Buying ant...') {
            if (index === selectedIndexes[layerIndex]) {
                // if true then remove selected element
                // remove eod together or remove single element
                if (element.name.includes('-eod-')) toggleEod(false, dispatch)
                else dispatch(removeAntFile({ layerIndex: layerIndex }))
            } else {
                // if not removing element then check compatability rules for selected option and add
                if (element.name.includes('-gas-mask')) {
                    // gas mask incompatible with eod, optical, mouth and face gear
                    gasMaskCheck(dispatch, selectedIndexes[1], selectedIndexes[3], selectedIndexes[5], selectedIndexes[4])
                }
                if (element.name.includes('-eod-')) {
                    // add eod together eod incompatible with shemagh, gas mask, mouth accessories and bandolier belts
                    toggleEod(true, dispatch, layerIndex, selectedIndexes[2], selectedIndexes[6], selectedIndexes[5], selectedIndexes[7], selectedIndexes[3])
                }
                if (element.name.includes('-shemagh')) {
                    // shemagh incompatible with eod
                    if (selectedIndexes[1] === 13) {
                        toggleEod(false, dispatch)
                        dispatch(addPopup({ id: popupTypes.antConflict.shemagh.eod }))
                    }
                }
                if (element.name.includes('-uncle-sam-hat') || element.name.includes('-uni-hat') || element.name.includes('-shrouded-helmet')) {
                    // uncle sam hat, uni hat, and shrouded helmet incompatible with special antenna
                    if (selectedIndexes[0] !== 0) {
                        dispatch(removeAntFile({ layerIndex: 0 }))
                        dispatch(addPopup({ id: popupTypes.antConflict.tallHeadGear.antenna }))
                    }
                }
                if (element.name.includes('-reflective-belt')) {
                    // reflective belt incompatible with sleeved body gear
                    if (staticLayerInfo[8].elements[selectedIndexes[8]].hasOwnProperty('hasSleeves')) {
                        dispatch(removeAntFile({ layerIndex: 8 }))
                        dispatch(addPopup({ id: popupTypes.antConflict.bandolier.reflective.sleevedBody }))
                    }
                }
                if (element.name.includes('-shrouded-helmet')) {
                    // shrouded helmet incompatible with face gear, optical, face accessories, (mouth accessories maybe)
                    shroudedCheck(dispatch, selectedIndexes[2], selectedIndexes[3], selectedIndexes[4], selectedIndexes[5])
                }
                if (element.name.includes('-antenna') && (selectedIndexes[1] === 14 || selectedIndexes[1] === 16 || selectedIndexes[1] === 20)) {
                    // special antenna incompatible with uncle sam hat, uni hat, and shrouded helmet
                    dispatch(removeAntFile({ layerIndex: 1 }))
                    dispatch(addPopup({ id: popupTypes.antConflict.antenna.tallHeadGear }))
                }
                if ((selectedIndexes[2] === 2 || selectedIndexes[2] === 4) && (layerIndex === 3 || layerIndex === 5 || layerIndex === 4)) {
                    // remove gas mask for optical, mouth or face accessories
                    dispatch(removeAntFile({ layerIndex: 2 }))
                    if (layerIndex === 3) dispatch(addPopup({ id: popupTypes.antConflict.optical.gasMask }))
                    else if (layerIndex === 5) dispatch(addPopup({ id: popupTypes.antConflict.mouth.gasMask }))
                    else if (layerIndex === 4) dispatch(addPopup({ id: popupTypes.antConflict.face.gasMask }))
                }
                if (selectedIndexes[1] === 13 && (layerIndex === 1 || layerIndex === 8 || layerIndex === 5 || layerIndex === 7 || (layerIndex === 3 && staticLayerInfo[3].elements[index].hasOwnProperty('isOverEar')))) {
                    // remove eod for head, body, mouth accessory, bandolier, or over-ear-optical change
                    toggleEod(false, dispatch)
                    if (layerIndex === 1) dispatch(addPopup({ id: popupTypes.antConflict.head.eod }))
                    else if (layerIndex === 8) dispatch(addPopup({ id: popupTypes.antConflict.body.eod }))
                    else if (layerIndex === 5) dispatch(addPopup({ id: popupTypes.antConflict.mouth.eod }))
                    else if (layerIndex === 7) dispatch(addPopup({ id: popupTypes.antConflict.bandolier.eod }))
                    else if (layerIndex === 3) dispatch(addPopup({ id: popupTypes.antConflict.optical.overEar.eod }))
                }
                if (selectedIndexes[1] === 20 && (layerIndex === 2 || layerIndex === 3 || layerIndex === 4 || layerIndex === 5)) {
                    // remove shrouded for face gear, optical, face accessory, or mouth accessory change
                    dispatch(removeAntFile({ layerIndex: 1 }))
                    if (layerIndex === 2 || layerIndex === 4) dispatch(addPopup({ id: popupTypes.antConflict.face.shrouded }))
                    else if (layerIndex === 3) dispatch(addPopup({ id: popupTypes.antConflict.optical.shrouded }))
                    else if (layerIndex === 5) dispatch(addPopup({ id: popupTypes.antConflict.mouth.shrouded }))
                }
                if (layerIndex === 8 && selectedIndexes[7] === 3 && staticLayerInfo[8].elements[index].hasOwnProperty('hasSleeves')) {
                    // remove reflective belt for sleeved body gear
                    dispatch(removeAntFile({ layerIndex: 7 }))
                    dispatch(addPopup({ id: popupTypes.antConflict.body.sleeved.reflective }))
                }
                dispatch(selectAntFile({ layerIndex: layerIndex, elementIndex: index }))
            }
        }
    }

    const formatFileName = (name) => {
        let formattedName = ""
        const splitName = name.split("-")
        for (let i = 1; i < splitName.length; i++) {
            if (i > 1) formattedName = formattedName + " "
            formattedName = formattedName + splitName[i].charAt(0).toUpperCase() + splitName[i].slice(1)
        }
        return formattedName
    }

    return (
        <ButtonsPanel>
            <Title2CrossHair onClick={() => toggle(!isOpen)}>
                {isOpen ? formatFileName(staticLayerInfo[layerIndex].fileName) + " ∨" : formatFileName(staticLayerInfo[layerIndex].fileName) + " ∧"}
            </Title2CrossHair>
            <SectionButtons isOpen={isOpen}>
                {staticLayerInfo[layerIndex].elements.map((element, index) => {
                    if (element.name !== 'empty') {
                        const srcFile = `ant/${staticLayerInfo[layerIndex].fileName}/${element.name}.png`
                        const isSelected = selectedIndexes[layerIndex] === index
                        const isComingSoon = element.hasOwnProperty('isComingSoon')
                        if (isComingSoon && !isUpcomingDisplayed) return null
                        
                        return (
                            <Button key={index} onClick={() => clickAction(element, index)} srcFile={srcFile} isSelected={isSelected}>
                                <Title4>{formatFileName(element.name)}</Title4>
                                <ButtonBottom>
                                    <ToggledRemove isDisabled={isSelected && (element.rarity > 0)}>
                                        <Text>Remove</Text>
                                    </ToggledRemove>
                                    <SmallText>
                                        {
                                            element.rarity === 0 ? "Base" :
                                            element.rarity === 1 ? "Very Common" :
                                            element.rarity === 2 ? "Common" :
                                            element.rarity === 3 ? "Rare" :
                                            element.rarity === 4 ? "Very Rare" :
                                            element.rarity === 5 ? "Extra Rare" :
                                            element.rarity === 6 ? "Special" :
                                            element.rarity === 7 ? "Epic" :
                                            element.rarity === 8 ? "Legendary" :
                                            "Unknown"
                                        }
                                    </SmallText>
                                    <SmallText>
                                        {partStocks[layerIndex][index] === null ? "Please Connect" : "In stock: " + partStocks[layerIndex][index]}
                                    </SmallText>
                                </ButtonBottom>
                            </Button>
                        )
                    } else return null
                })}
            </SectionButtons>
        </ButtonsPanel>
    )
}
