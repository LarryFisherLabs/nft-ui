export const getUrlParam = (paramName, isInt) => {
    const urlParams = new URLSearchParams(window.location.search)
    if (isInt) return parseInt(urlParams.get(paramName))
    else return urlParams.get(paramName)
}