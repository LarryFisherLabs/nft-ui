export const viewLevelMaxWidth = [1183, 1034, 937, 847, 647, 500]
export const viewLevelMaxHeight = [747, 632, 579, 513, 472]

export const getViewLevel = (viewLevelIndex) => {
    return `(max-width: ${viewLevelMaxWidth[viewLevelIndex]}px)`
}

export const getHeightViewLevel = (viewLevelIndex) => {
    return `(max-height: ${viewLevelMaxHeight[viewLevelIndex]}px)`
}

export const getWidthOrHeightViewLevel = (widthPixelIndex, heightPixelIndex) => {
    return `(max-width: ${viewLevelMaxWidth[widthPixelIndex]}px), (max-height: ${viewLevelMaxHeight[heightPixelIndex]}px)`
}

export const getWidthAndHeightViewLevel = (widthPixelIndex, heightPixelIndex) => {
    return `(max-width: ${viewLevelMaxWidth[widthPixelIndex]}px) and (max-height: ${viewLevelMaxHeight[heightPixelIndex]}px)`
}