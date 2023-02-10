import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeAntFile, selectAntFile, selectPartStocks, selectSelectedIndexes } from '../redux/slices/antSlice.js'
import { Title2CrossHair, Title4, Text, SmallText, CanvasPanel } from '../styles/general'
import { staticLayerInfo } from '../utils/ant-utils/staticAntInfo.js'

import styled from 'styled-components'

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
`

export const ButtonsPanel = styled(CanvasPanel)`
    padding: 0 1.2rem;
    min-width: 280px;
    padding-bottom: 1.2rem;
    max-width: 100%;
`

export const SectionButtons = styled.div`
    flex-flow: row wrap;
    display: ${props => props.isOpen ? 'flex' : 'none'};
    gap: .7rem;
    justify-content: center;
`

export const ToggledRemove = styled.div`
    display: ${props => props.isDisabled ? 'block' : 'none'};
`

export const ButtonBottom = styled.div`
    display: flex;
    align-items: center;
    flex-flow: column nowrap;
`

export const LayerButtons = ({ layerIndex }) => {
    const dispatch = useDispatch()
    const selectedIndexes = useSelector(selectSelectedIndexes)
    const partStocks = useSelector(selectPartStocks)

    const [isOpen, toggle] = useState(true)

    const toggleEod = (isAdding) => {
        if (isAdding) {
            dispatch(selectAntFile({ layerIndex: 0, elementIndex: 2 }))
            dispatch(selectAntFile({ layerIndex: 9, elementIndex: 0 }))
            if (selectedIndexes[3] === 2) {
                dispatch(removeAntFile({ layerIndex: 3 }))
            }
            if (selectedIndexes[5] === 1) {
                dispatch(removeAntFile({ layerIndex: 5 }))
            }
        } else {
            dispatch(removeAntFile({ layerIndex: 9 }))
            dispatch(removeAntFile({ layerIndex: 0 }))
        }
    }

    const clickAction = (element, index) => {
        if (index === selectedIndexes[layerIndex]) {
            // if true then remove selected element
            // remove eod together or remove single element
            if (element.name === '2-eod-mask' || element.name === '0-eod-suit') toggleEod(false)
            else dispatch(removeAntFile({ layerIndex: layerIndex }))
        } else {
            // else then select option
            if (element.name === '2-gas-mask') {
                // gas mask incompatible with eod, optical, mouth and face gear
                if (selectedIndexes[0] === 2) toggleEod(false)
                if (selectedIndexes[1] !== staticLayerInfo[1].defaultIndex) dispatch(removeAntFile({ layerIndex: 1 }))
                if (selectedIndexes[2] !== staticLayerInfo[2].defaultIndex) dispatch(removeAntFile({ layerIndex: 2 }))
                if (selectedIndexes[4] !== staticLayerInfo[4].defaultIndex) dispatch(removeAntFile({ layerIndex: 4 }))
                dispatch(selectAntFile({ layerIndex: 3, elementIndex: 2 }))
            } else if (element.name === '2-eod-mask' || element.name === '0-eod-suit') {
                // add eod together eod incompatible with shemagh and gas mask
                toggleEod(true)
            } else if (element.name === '1-shemagh') {
                if (selectedIndexes[0] === 2) toggleEod(false)
                dispatch(selectAntFile({ layerIndex: 5, elementIndex: 1 }))
            } else if (selectedIndexes[3] === 2 && (layerIndex === 1 || layerIndex === 2 || layerIndex === 4)) {

                dispatch(removeAntFile({ layerIndex: 3 }))
                dispatch(selectAntFile({ layerIndex: layerIndex, elementIndex: index }))
            } else if (selectedIndexes[0] === 2 && (layerIndex === 0 || layerIndex === 9)) {
                toggleEod(false)
                dispatch(selectAntFile({ layerIndex: layerIndex, elementIndex: index }))
            } else {
                dispatch(selectAntFile({ layerIndex: layerIndex, elementIndex: index }))
            }
        }
    }

    return (
        <ButtonsPanel>
            <Title2CrossHair onClick={() => toggle(!isOpen)}>
                {staticLayerInfo[layerIndex].fileName}
            </Title2CrossHair>
            <SectionButtons isOpen={isOpen}>
                {staticLayerInfo[layerIndex].elements.map((element, index) => {
                    if (element.name !== 'empty') {
                        const srcFile = `ant/${staticLayerInfo[layerIndex].fileName}/${element.name}.png`
                        const isSelected = selectedIndexes[layerIndex] === index
                        
                        return (
                            <Button key={index} onClick={() => clickAction(element, index)} srcFile={srcFile} isSelected={isSelected}>
                                <Title4>{element.name}</Title4>
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
                                            "Undefined"
                                        }
                                    </SmallText>
                                    <SmallText>
                                        {partStocks[layerIndex][index] === null ? "loading..." : "In stock: " + partStocks[layerIndex][index]}
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
