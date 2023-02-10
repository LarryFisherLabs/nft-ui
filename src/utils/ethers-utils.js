import { ethers } from "ethers"
import Coins from "../contracts/Coins.json"
import Ants from "../contracts/Ants.json"

export const getProvider = () => {
    return new ethers.providers.Web3Provider(window.ethereum)
}

export const getCoinContract = () => {
    return new ethers.Contract(Coins.address, Coins.abi, getProvider().getSigner())
}

export const getAntContract = () => {
    return new ethers.Contract(Ants.address, Ants.abi, getProvider().getSigner())
}