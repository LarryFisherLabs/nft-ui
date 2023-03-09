export const viewLevelMaxWidth = [1183, 1034, 937, 847, 647]

export const getViewLevel = (viewLevelIndex) => {
    return `(max-width: ${viewLevelMaxWidth[viewLevelIndex]}px)`
}