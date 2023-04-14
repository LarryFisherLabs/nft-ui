import { ethers } from "ethers"
import Coins from "../contracts/Coins.json"
import Ants from "../contracts/Ants.json"
import ERC721 from "../contracts/ERC721.json"
import TestBitDao from "../contracts/TestBitDao.json"
import ERC20 from "../contracts/ERC20.json"
import { netInfo } from "./json-constants/networkInfo"

export const getProvider = () => {
    return new ethers.providers.Web3Provider(window.ethereum)
}

// returns 0 for an unsupported network
export const getNetAndProvider = async () => {
    const provider = getProvider()
    const network = await provider.getNetwork()
    const netId = netInfo.hasOwnProperty(network.chainId) ? network.chainId : network.hasOwnProperty('chainId') ? 0 : null
    return [netId, provider]
}

// returns 0 for an unsupported network
export const getNetId = async () => {
    return (await getNetAndProvider())[0]
}

export const getAntContractAddress = async () => {
    const netId = await getNetId()
    return netInfo[netId].antContract
}

export const getCoinContractAddress = async () => {
    const netId = await getNetId()
    return netInfo[netId].coinContract
}

export const getBitDaoContractAddress = async () => {
    const netId = await getNetId()
    return netInfo[netId].testBitDaoContract
}

export const getCoinContract = async () => {
    const [netId, provider] = await getNetAndProvider()
    return new ethers.Contract(netInfo[netId].coinContract, Coins.abi, provider.getSigner())
}

export const getAntContract = async () => {
    const [netId, provider] = await getNetAndProvider()
    return new ethers.Contract(netInfo[netId].antContract, Ants.abi, provider.getSigner())
}

export const getBitDaoContract = async () => {
    const [netId, provider] = await getNetAndProvider()
    return new ethers.Contract(netInfo[netId].testBitDaoContract, TestBitDao.abi, provider.getSigner())
}

export const getBitDaoContract2 = async () => {
    const [netId, provider] = await getNetAndProvider()
    return new ethers.Contract(netInfo[netId].testBitDaoContract2, TestBitDao.abi, provider.getSigner())
}

export const getERC721Contract = (address) => {
    const provider = getProvider()
    return new ethers.Contract(address, ERC721.abi, provider.getSigner())
}

export const getERC20Contract = (address) => {
    const provider = getProvider()
    return new ethers.Contract(address, ERC20.abi, provider.getSigner())
}