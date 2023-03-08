const viewLevelMinWidth = [1183, 1034, 937, 847, 647]

export const getViewLevelCount = () => {
    return viewLevelMinWidth.length
}

export const getViewLevel = (viewLevelIndex) => {
    return `(min-width: ${viewLevelMinWidth[viewLevelIndex]})`
}