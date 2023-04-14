import { ethers } from "ethers"
import { getAntContract } from "../utils/ethers-utils"

export const getPartInventory = async (sectionIndex, partIndex) => {
    const antContract = await getAntContract()
    const stock = await antContract.getPartInventory(sectionIndex, partIndex)
    return parseInt(stock)
}

export const getRarityPrices = async (discountIndex) => {
    const antContract = await getAntContract()
    const rawPrices = await antContract.getRarityPrices(discountIndex)
    const prices = rawPrices.map((price) => {
        return ethers.utils.formatEther(price)
    })
    return prices
}

export const antWithdraw = async () => {
    const antContract = await getAntContract()
    return await antContract.withdraw()
}

export const isDiscountUsed = async (coinId) => {
    const antContract = await getAntContract()
    return await antContract.isDiscountUsed(coinId)
}

export const createAnt = async (dna, value) => {
    const antContract = await getAntContract()
    return await antContract.createAnt(dna, { value: ethers.utils.parseEther(value.toString()) })
}

export const createDiscountAnt = async (coinId, dna, value) => {
    const antContract = await getAntContract()
    return await antContract.createDiscountAnt(coinId, dna, { value: ethers.utils.parseEther(value.toString()) })
}

export const getDnaPrice = async (dna, discountIndex) => {
    const antContract = await getAntContract()
    const price = await antContract.getDnaPrice(dna, discountIndex)
    return parseFloat(ethers.utils.formatEther(price))
}

export const getAnt = async (id) => {
    const antContract = await getAntContract()
    return await antContract.getAnt(id)
}

export const getCount = async () => {
    const antContract = await getAntContract()
    return await antContract.COUNTER()
}

export const antBalanceOf = async (address) => {
    const antContract = await getAntContract()
    return await antContract.balanceOf(address)
}

export const antOwnerOf = async (id) => {
    const antContract = await getAntContract()
    return await antContract.ownerOf(id)
}

export const updateBaseAntURI = async (newURI) => {
    const antContract = await getAntContract()
    return await antContract.updateBaseURI(newURI)
}

export const antTokenURI = async (id) => {
    const antContract = await getAntContract()
    return await antContract.tokenURI(id)
}

export const antBaseURI = async () => {
    const antContract = await getAntContract()
    return await antContract.baseURI()
}

export const changeName = async (id, newName) => {
    const antContract = await getAntContract()
    return await antContract.changeName(id, newName)
}