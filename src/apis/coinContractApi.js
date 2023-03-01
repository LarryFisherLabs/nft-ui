import { ethers } from 'ethers'
import { getCoinContract } from '../utils/ethers-utils'

// owner functions
export const addFounder = async (_address, _value) => {
    const coinContract = await getCoinContract()
    const value = ethers.utils.parseEther(`${_value}`)
    return await coinContract.addFounder(_address, value)
}

export const renounceOwnership = async () => {
    const coinContract = await getCoinContract()
    return await coinContract.renounceOwnership()
}

export const updateBaseCoinURI = async (newURI) => {
    const coinContract = await getCoinContract()
    return await coinContract.updateBaseURI(newURI)
}

export const updateFee = async (newFee) => {
    const coinContract = await getCoinContract()
    return await coinContract.updateFee(newFee)
}

export const withdraw = async () => {
    const coinContract = await getCoinContract()
    return await coinContract.withdraw()
}

// buy functions

export const createExactCoin = async (value, color) => {
    const coinContract = await getCoinContract()
    return await coinContract.createExactCoin(color, { value: ethers.utils.parseEther(`${value}`) })
}

export const createFounderCoin = async (value) => {
    const coinContract = await getCoinContract()
    return await coinContract.createFounderCoin({ value: ethers.utils.parseEther(`${value}`) })
}

export const createCoin = async (value) => {
    const coinContract = await getCoinContract()
    return await coinContract.createCoin({ value: ethers.utils.parseEther(`${value}`) })
}

// general view functions

export const owner = async () => {
    try {
        const coinContract = await getCoinContract()
        const owner = await coinContract.owner()
        return owner
    } catch (err) {
        return err
    }
}

export const balanceOf = async (address) => {
    const coinContract = await getCoinContract()
    return parseInt(await coinContract.balanceOf(address), 16)
}

export const getCoin = async (id) => {
    const coinContract = await getCoinContract()
    const coin = await coinContract.getCoin(id)
    const value = ethers.utils.formatEther(coin[0])
    return [value, parseInt(coin[1], 16)]
}

export const getCounters = async () => {
    const coinContract = await getCoinContract()
    const counters = await coinContract.getCounters()
    let finalCounts = []
    for (let i = 0; i < 5; i++) {
        finalCounts.push(parseInt(counters[i], 10))
    }
    return finalCounts
}

export const getFounder = async (address) => {
    const coinContract = await getCoinContract()
    const founder = await coinContract.getFounder(address)
    const value = parseFloat(ethers.utils.formatEther(founder[0]))
    return [value, founder[1], founder[2]]
}

export const getTierPrices = async (isDiscounted) => {
    const coinContract = await getCoinContract()
    const prices = await coinContract.getTierPrices(isDiscounted)
    const ethPrices = prices.map(price => {
        return ethers.utils.formatEther(price)
    })
    return ethPrices 
}

export const isOnFounderList = async (address) => {
    const coinContract = await getCoinContract()
    return await coinContract.isOnFounderList(address)
}

export const ownerOf = async (id) => {
    const coinContract = await getCoinContract()
    return await coinContract.ownerOf(id)
}

export const coinTokenURI = async (id) => {
    const coinContract = await getCoinContract()
    return await coinContract.tokenURI(id)
}

export const coinBaseURI = async () => {
    const coinContract = await getCoinContract()
    return await coinContract.baseURI()
}