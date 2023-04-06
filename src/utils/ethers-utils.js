import { ethers } from "ethers"
import Coins from "../contracts/Coins.json"
import Ants from "../contracts/Ants.json"
import ERC721 from "../contracts/ERC721.json"

export const getProvider = () => {
    return new ethers.providers.Web3Provider(window.ethereum)
}

export const getAntContractAddress = async () => {
    const netId = (await getNetAndProvider())[0]
    return Ants.address[netId]
}

export const getCoinContractAddress = async () => {
    const netId = (await getNetAndProvider())[0]
    return Coins.address[netId]
}

// !!! network ids !!!
// 0 sepolia
// 1 goerli

const expectedChainId = [11155111, 5]

export const getNetAndProvider = async () => {
    const provider = getProvider()
    const network = await provider.getNetwork()
    const netId = network.chainId === expectedChainId[0] ? 0 : network.chainId === expectedChainId[1] ? 1 : null
    return [netId, provider]
}

export const getCoinContract = async () => {
    const [netId, provider] = await getNetAndProvider()
    return new ethers.Contract(Coins.address[netId], Coins.abi, provider.getSigner())
}

export const getAntContract = async () => {
    const [netId, provider] = await getNetAndProvider()
    return new ethers.Contract(Ants.address[netId], Ants.abi, provider.getSigner())
}

export const getERC721Contract = (address) => {
    const provider = getProvider()
    return new ethers.Contract(address, ERC721.abi, provider.getSigner())
}
