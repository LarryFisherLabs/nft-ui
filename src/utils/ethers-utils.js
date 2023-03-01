import { ethers } from "ethers"
import Coins from "../contracts/Coins.json"
import Ants from "../contracts/Ants.json"

export const getProvider = () => {
    return new ethers.providers.Web3Provider(window.ethereum)
}

// !!! network ids !!!
// 0 sepolia
// 1 goerli

const expectedChainId = [11155111, 5]

export const getCoinContract = async () => {
    const provider = getProvider()
    const network = await provider.getNetwork()
    const netId = network.chainId === expectedChainId[0] ? 0 : network.chainId === expectedChainId[1] ? 1 : null
    return new ethers.Contract(Coins.address[netId], Coins.abi, provider.getSigner())
}

export const getAntContract = async () => {
    const provider = getProvider()
    const network = await provider.getNetwork()
    const netId = network.chainId === expectedChainId[0] ? 0 : network.chainId === expectedChainId[1] ? 1 : null
    return new ethers.Contract(Ants.address[netId], Ants.abi, getProvider().getSigner())
}