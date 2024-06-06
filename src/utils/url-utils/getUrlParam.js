export const getUrlParam = (paramName, isInt) => {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has(paramName)) {
        if (isInt) return parseInt(urlParams.get(paramName))
        else return urlParams.get(paramName)
    } else return null
}