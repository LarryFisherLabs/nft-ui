import { removeAntFile, selectAntFile } from "../../redux/slices/antSlice"
import { addPopup } from "../../redux/slices/connectSlice"
import { popupTypes } from "../json-constants/popupInfo"
import { staticLayerInfo } from "./staticAntInfo"

export const recursiveDraw = (files, index, ctx) => {
    const image = new Image(164, 164)
    image.src = files[index]
    image.onload = () => {
        ctx.drawImage(image, 0, 0)
        if (index + 1 < files.length) {
            recursiveDraw(files, index + 1, ctx)
        }
    }
}

export const baseElements = [
    'ant/base/5-ant-right-foreleg.png',
    'ant/base/3-ant-head.png',
    'ant/base/4-ant-thorax.png',
    'ant/base/6-ant-abdomen.png',
    'ant/base/1-ant-eyes.png', 
    'ant/base/2-ant-mandibles.png'
]

export const tiedAntennaId = 1
export const eodMaskId_ = 13
export const uniHatId_ = 15
export const uncleSamHatId_ = 16
export const shroudedHelmetId_ = 20
export const gasMaskId_ = 9
export const gasMaskBongId_ = 11
export const reflectiveBeltId_ = 1
export const eodSuitId_ = 11

/**
 * This function is called when the user adds or removes eod gear by clicking on either the eod head gear or the eod
 * body gear. This function ensures they always get added and removed together. If adding, first check compatibility
 * rules then add the part that was not selected as the calling function will add the selected part. If removing simply
 * remove both.
 * 
 * @param {*} isAdding Boolean for whether eod is being selected or removed.
 * @param {*} layerIndex Optional, needed when isAdding is true. Tells the function which eod trait was clicked when
 * adding so this function can add the other and let calling function add the selected trait
 */
export const toggleEod = (isAdding, dispatch, layerIndex = null, faceGearId = null, neckId = null, mouthId = null, bandolierId = null, opticalId = null) => {
    if (isAdding) {
        // no gas mask
        if (faceGearId === gasMaskId_ || faceGearId === gasMaskBongId_) {
            dispatch(removeAntFile({ layerIndex: 2 }))
            dispatch(addPopup({ id: popupTypes.antConflict.eod.gasMask }))
        }
        // no shemagh
        if (staticLayerInfo[6].elements[neckId].name.includes('-shemagh')) {
            dispatch(removeAntFile({ layerIndex: 6 }))
            dispatch(addPopup({ id: popupTypes.antConflict.eod.shemagh }))
        }
        // no mouth accessory
        if (mouthId !== 0) {
            dispatch(removeAntFile({ layerIndex: 5 }))
            dispatch(addPopup({ id: popupTypes.antConflict.eod.mouth }))
        }
        // no bando
        if (bandolierId !== 0) {
            dispatch(removeAntFile({ layerIndex: 7 }))
            dispatch(addPopup({ id: popupTypes.antConflict.eod.bandolier }))
        }
        // no over ear optical
        if (staticLayerInfo[3].elements[opticalId].hasOwnProperty('isOverEar')) {
            dispatch(removeAntFile({ layerIndex: 3 }))
            dispatch(addPopup({ id: popupTypes.antConflict.eod.overEarOptical }))
        }
        // add eod trait that was not clicked
        if (layerIndex === 8) dispatch(selectAntFile({ layerIndex: 1, elementIndex: eodMaskId_ }))
        else dispatch(selectAntFile({ layerIndex: 8, elementIndex: eodSuitId_ }))
    } else {
        dispatch(removeAntFile({ layerIndex: 1 }))
        dispatch(removeAntFile({ layerIndex: 8 }))
    }
}

// check compatibility rules when gas mask is selected
export const gasMaskCheck = (dispatch, headId, opticalId, mouthId, faceAccId) => {
    // no eod
    if (headId === eodMaskId_) {
        toggleEod(false, dispatch)
        dispatch(addPopup({ id: popupTypes.antConflict.gasMask.eod }))
    }
    // no optical gear
    if (opticalId !== 0) {
        dispatch(removeAntFile({ layerIndex: 3 }))
        dispatch(addPopup({ id: popupTypes.antConflict.gasMask.optical }))
    }
    // no mouth accessory
    if (mouthId !== 0) {
        dispatch(removeAntFile({ layerIndex: 5 }))
        dispatch(addPopup({ id: popupTypes.antConflict.gasMask.mouth }))
    }
    // no face accessory
    if (faceAccId !== 0) {
        dispatch(removeAntFile({ layerIndex: 4 }))
        dispatch(addPopup({ id: popupTypes.antConflict.gasMask.face }))
    }
}

// check compatibility rules when shrouded helmet is selected
export const shroudedCheck = (dispatch, faceGearId, opticalId, faceAccId, mouthId, antennaId, neckId) => {
    // no face gear
    if (faceGearId !== 0) {
        dispatch(removeAntFile({ layerIndex: 2 }))
        dispatch(addPopup({ id: popupTypes.antConflict.shrouded.faceGear }))
    }
    // no optical gear
    if (opticalId !== 0) {
        dispatch(removeAntFile({ layerIndex: 3 }))
        dispatch(addPopup({ id: popupTypes.antConflict.shrouded.optical }))
    }
    // no face accessory
    if (faceAccId !== 0) {
        dispatch(removeAntFile({ layerIndex: 4 }))
        dispatch(addPopup({ id: popupTypes.antConflict.shrouded.faceAcc }))
    }
    // no mouth accessory
    if (mouthId !== 0) {
        dispatch(removeAntFile({ layerIndex: 5 }))
        dispatch(addPopup({ id: popupTypes.antConflict.shrouded.mouth }))
    }
    // no tied antenna
    if (antennaId === tiedAntennaId) {
        dispatch(removeAntFile({ layerIndex: 0 }))
        dispatch(addPopup({ id: popupTypes.antConflict.shrouded.tiedAntenna }))
    }
    // no dog-tags
    if (neckId > 1 && staticLayerInfo[6].elements[neckId].name.includes('-tags')) {
        dispatch(removeAntFile({ layerIndex: 6 }))
        dispatch(addPopup({ id: popupTypes.antConflict.shrouded.tags }))
    }
}