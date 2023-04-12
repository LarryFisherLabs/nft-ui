import { getUrlParam } from "./url-utils/getUrlParam"

export const getCurrentUrlParam = (paramName) => {
    const param = getUrlParam(paramName, true)
    if (param !== 5 && param !== 11155111) return null
    else return '?netId=' + param
}

export const getHref = (fullPath) => {
    const paramExt = getCurrentUrlParam('netId')
    if (paramExt === null) return fullPath
    else return fullPath + paramExt
}

export const goTo = (fullPath) => {
    const paramExt = getCurrentUrlParam('netId')
    if (paramExt === null) window.location = fullPath
    else window.location = fullPath + paramExt
}

// pathName should be 'coin' or 'ant'
export const goToNftView = (pathName, nftIndex) => {
    const fullPath = '/' + pathName + '/' + nftIndex
    goTo(fullPath)
}

export const goToProfile = () => {
    if (window.location.pathname !== '/') goTo('/')
}

// pathName should be 'coins' or 'ants'
export const goToCollectionView = (pathName, pageNumber) => {
    const fullPath = '/' + pathName + '/' + pageNumber
    if (!window.location.pathname.includes(fullPath)) goTo(fullPath)
}