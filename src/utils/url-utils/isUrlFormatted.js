import { isAddress } from "ethers/lib/utils"

// 0 <= inRangeCoinId <= 2999 where inRangeCoinId is integer
// /coin/inRangeCoinId || /coin/inRangeCoinId/
// 0 <= inRangeAntId <= 9999 where inRangeAntId is integer
// /ant/inRangeAntId || /ant/inRangeAntId/
export const isFormattedNftViewUrl = () => {
    const splitPath = window.location.pathname.split('/')
    const isCoinUrl = splitPath[1] === 'coin'
    if (splitPath.length === 3 || (splitPath.length === 4 && splitPath[3] === '')) {
        const nftId = parseFloat(splitPath[2])
        const isIdInt = Number.isInteger(nftId)
        const isFormatted = (isCoinUrl || splitPath[1] === 'ant')
        const isInRange = isCoinUrl ? 0 <= nftId && nftId <= 2999 : 0 <= nftId && nftId <= 9999
        if (isFormatted && isInRange && isIdInt) return !isNaN(splitPath[2]) && splitPath[2] !== ''
    }
    return false
}

// /validEthAddress || /validEthAddress/
export const isFormattedRemoteProfile = () => {
    const splitPath = window.location.pathname.split('/')
    if (splitPath.length === 2 || (splitPath.length === 3 && splitPath[2] === '')) return isAddress(splitPath[1])
    return false
}

// assuming 8 nfts per page 3000coins / 8 = 375pages 10000ants / 8 = 1250pages
// 1 <= validPageNumber4Coins <= 375 where validPageNumber4Coins is integer
// /coins/validPageNumber4Coins || /coins/validPageNumber4Coins/
// 1 <= validPageNumber4Ants <= 1250 where validPageNumber4Ants is integer
// /ants/validPageNumber4Ants || /ants/validPageNumber4Ants/
export const isFormattedCollectionView = () => {
    const splitPath = window.location.pathname.split('/')
    const isCoinUrl = splitPath[1] === 'coins'
    if (splitPath.length === 3 || (splitPath.length === 4 && splitPath[3] === '')) {
        const pageId = parseFloat(splitPath[2])
        const isPageIdInt = Number.isInteger(pageId)
        const isFormatted = (isCoinUrl || splitPath[1] === 'ants')
        const isInRange = isCoinUrl ? 1 <= pageId && pageId <= 375 : 1 <= pageId && pageId <= 1000
        if (isFormatted && isInRange && isPageIdInt) return !isNaN(splitPath[2]) && splitPath[2] !== ''
    }
    return false
}

// /coin-builder || /coin-builder/ for isForCoinBuilder === true
// /ant-builder || /ant-builder/ for isForCoinBuilder === false
export const isFormattedBuilder = (isForCoinBuilder) => {
    const splitPath = window.location.pathname.split('/')
    if (splitPath.length === 2 || (splitPath.length === 3 && splitPath[2] === '')) {
        return isForCoinBuilder ? splitPath[1] === 'coin-builder' : splitPath[1] === 'ant-builder'
    }
    return false
}