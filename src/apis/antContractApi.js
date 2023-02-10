import { ethers } from "ethers"
import { getAntContract } from "../utils/ethers-utils"

export const getPartInventory = async (sectionIndex, partIndex) => {
    const antContract = getAntContract()
    const stock = await antContract.getPartInventory(sectionIndex, partIndex)
    return parseInt(stock)
}

export const getRarityPrices = async (discountIndex) => {
    const antContract = getAntContract()
    const rawPrices = await antContract.getRarityPrices(discountIndex)
    const prices = rawPrices.map((price) => {
        return ethers.utils.formatEther(price)
    })
    return prices
}

export const antWithdraw = async () => {
    const antContract = getAntContract()
    return await antContract.withdraw()
}

export const isDiscountUsed = async (coinId) => {
    const antContract = getAntContract()
    return await antContract.isDiscountUsed(coinId)
}

export const createAnt = async (dna, value) => {
    const antContract = getAntContract()
    return await antContract.createAnt(dna, { value: ethers.utils.parseEther(value.toString()) })
}

export const createDiscountAnt = async (coinId, rawDna, value) => {
    const antContract = getAntContract()
    return await antContract.createDiscountAnt(coinId, rawDna, { value: value })
}

export const getDnaPrice = async (dna, discountIndex) => {
    const antContract = getAntContract()
    const price = await antContract.getDnaPrice(dna, discountIndex)
    return ethers.utils.formatEther(price)
}

export const getAnt = async (id) => {
    const antContract = getAntContract()
    return await antContract.getAnt(id)
}

export const getCount = async () => {
    const antContract = getAntContract()
    return await antContract.COUNTER()
}

export const antBalanceOf = async (address) => {
    const antContract = getAntContract()
    return await antContract.balanceOf(address)
}

export const antOwnerOf = async (id) => {
    const antContract = getAntContract()
    return await antContract.ownerOf(id)
}