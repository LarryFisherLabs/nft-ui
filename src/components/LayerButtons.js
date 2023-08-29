import React, { useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { removeAntFile, selectAntFile, selectAntStatus, selectPartStocks, selectSelectedIndexes } from '../redux/slices/antSlice.js'
import { Title2CrossHair, Title4, Text, SmallText, CanvasPanel, BlackText } from '../styles/general'
import { staticLayerInfo } from '../utils/ant-utils/staticAntInfo.js'

import styled from 'styled-components'
import { getViewLevel } from '../utils/deviceType.js'
import { popupTypes } from '../utils/json-constants/popupInfo.js'
import { addPopup } from '../redux/slices/connectSlice.js'
import { eodMaskId_, gasMaskBongId_, gasMaskId_, reflectiveBeltId_, shroudedCheck, shroudedHelmetId_, tiedAntennaId_, toggleEod } from '../utils/ant-utils/antCanvasUtils.js'

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
                if (element.name.includes('-gas-mask') && selectedIndexes[3] !== 0) {
                    // gas mask incompatible with optical
                    dispatch(removeAntFile({ layerIndex: 3 }))
                    dispatch(addPopup({ id: popupTypes.antConflict.gasMask.optical }))
                }
                if (element.name.includes('-eod-')) {
                    // add eod together eod incompatible with shemagh, face gear, mouth accessories and bandolier belts
                    toggleEod(true, dispatch, layerIndex, selectedIndexes[2], selectedIndexes[6], selectedIndexes[5], selectedIndexes[7], selectedIndexes[3])
                }
                if (element.name.includes('-tags') && index > 1) {
                    // special dog tags incompatible with shrouded helmet
                    if (selectedIndexes[1] === shroudedHelmetId_) {
                        dispatch(removeAntFile({ layerIndex: 1 }))
                        dispatch(addPopup({ id: popupTypes.antConflict.tags.shrouded }))
                    }
                }
                if (layerIndex === 1 && ((staticLayerInfo[1].elements[index].hasOwnProperty('isTall') && selectedIndexes[0] !== 0) || (staticLayerInfo[1].elements[index].hasOwnProperty('isMidTall') && selectedIndexes[0] === tiedAntennaId_))) {
                    // remove special antenna for selected tall head gear + remove tied antenna for selected mid tall head gear
                    dispatch(removeAntFile({ layerIndex: 0 }))
                    if (staticLayerInfo[1].elements[index].hasOwnProperty('isMidTall')) dispatch(addPopup({ id: popupTypes.antConflict.midHeadGear.tiedAntenna }))
                    else dispatch(addPopup({ id: popupTypes.antConflict.tallHeadGear.antenna }))
                }
                if (element.name.includes('-reflective-belt') && staticLayerInfo[8].elements[selectedIndexes[8]].hasOwnProperty('hasSleeves')) {
                    // reflective belt incompatible with sleeved body gear
                    dispatch(removeAntFile({ layerIndex: 8 }))
                    dispatch(addPopup({ id: popupTypes.antConflict.bandolier.reflective.sleevedBody }))
                }
                if (element.name.includes('-shrouded-helmet')) {
                    // shrouded helmet incompatible with face gear, optical, face accessories, mouth accessories, and special dog tags
                    shroudedCheck(dispatch, selectedIndexes[2], selectedIndexes[3], selectedIndexes[4], selectedIndexes[5], selectedIndexes[6])
                }
                if ((element.name.includes('-antenna') && staticLayerInfo[1].elements[selectedIndexes[1]].hasOwnProperty('isTall')) || (element.name.includes('-tied-antenna') && staticLayerInfo[1].elements[selectedIndexes[1]].hasOwnProperty('isMidTall'))) {
                    // special antenna incompatible with tall head gear + tied antenna incompatible with mid tall head gear
                    dispatch(removeAntFile({ layerIndex: 1 }))
                    if (selectedIndexes[1] === shroudedHelmetId_) dispatch(addPopup({ id: popupTypes.antConflict.antenna.midHeadGear }))
                    else dispatch(addPopup({ id: popupTypes.antConflict.antenna.tallHeadGear }))
                }
                if ((selectedIndexes[2] === gasMaskId_ || selectedIndexes[2] === gasMaskBongId_) && layerIndex === 3) {
                    // remove gas mask for optical
                    dispatch(removeAntFile({ layerIndex: 2 }))
                    if (layerIndex === 3) dispatch(addPopup({ id: popupTypes.antConflict.optical.gasMask }))
                }
                if (selectedIndexes[1] === eodMaskId_ && (layerIndex === 1 || layerIndex === 8 || layerIndex === 5 || layerIndex === 7 || layerIndex === 2 || (layerIndex === 3 && staticLayerInfo[3].elements[index].hasOwnProperty('isOverEar')) || (layerIndex === 6 && element.name.includes('-shemagh')))) {
                    // remove eod for head, body, mouth accessory, bandolier, face gear, over-ear-optical, or shemagh change
                    toggleEod(false, dispatch, layerIndex)
                }
                if (selectedIndexes[1] === shroudedHelmetId_ && (layerIndex === 2 || layerIndex === 3 || layerIndex === 4 || layerIndex === 5)) {
                    // remove shrouded for face gear, optical, face accessory, or mouth accessory change
                    dispatch(removeAntFile({ layerIndex: 1 }))
                    if (layerIndex === 2 || layerIndex === 4) dispatch(addPopup({ id: popupTypes.antConflict.face.shrouded }))
                    else if (layerIndex === 3) dispatch(addPopup({ id: popupTypes.antConflict.optical.shrouded }))
                    else if (layerIndex === 5) dispatch(addPopup({ id: popupTypes.antConflict.mouth.shrouded }))
                }
                if (layerIndex === 8 && selectedIndexes[7] === reflectiveBeltId_ && staticLayerInfo[8].elements[index].hasOwnProperty('hasSleeves')) {
                    // remove reflective belt for sleeved body gear
                    dispatch(removeAntFile({ layerIndex: 7 }))
                    dispatch(addPopup({ id: popupTypes.antConflict.body.sleeved.reflective }))
                }
                if (layerIndex === 2) {
                    if (staticLayerInfo[2].elements[index].hasOwnProperty('isMouthCovered') && selectedIndexes[5] !== 0) {
                        // remove mouth accessory if selected face gear covers mouth
                        dispatch(removeAntFile({ layerIndex: 5 }))
                        dispatch(addPopup({ id: popupTypes.antConflict.faceGear.mouth }))
                    }
                    if (staticLayerInfo[2].elements[index].hasOwnProperty('isFaceCovered') && selectedIndexes[4] !== 0) {
                        // no face accessories if face gear covers face
                        dispatch(removeAntFile({ layerIndex: 4 }))
                        dispatch(addPopup({ id: popupTypes.antConflict.faceGear.face }))
                    }
                }
                if ((layerIndex === 5 && staticLayerInfo[2].elements[selectedIndexes[2]].hasOwnProperty('isMouthCovered')) || (layerIndex === 4 && staticLayerInfo[2].elements[selectedIndexes[2]].hasOwnProperty('isFaceCovered'))) {
                    // remove face gear if it: covers mouth when mouth accessory selected, or covers face when face accessory selected
                    dispatch(removeAntFile({ layerIndex: 2 }))
                    if (layerIndex === 5) dispatch(addPopup({ id: popupTypes.antConflict.mouth.faceGear }))
                    else dispatch(addPopup({ id: popupTypes.antConflict.face.faceGear }))
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
                {formatFileName(staticLayerInfo[layerIndex].fileName)}
                {isOpen ? <BlackText>∨</BlackText> : <BlackText>∧</BlackText>}
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
