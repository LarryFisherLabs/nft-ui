import { createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { getProvider } from "../../utils/ethers-utils";
import { error } from "../slices/connectSlice";

// !!! network ids !!!
// 0 sepolia
// 1 goerli

const expectedChainId = [11155111, 5]
const chainParams = [
  {
    chainName: 'Sepolia Testnet',
    chainId: ethers.utils.hexlify(expectedChainId[0]),
    nativeCurrency: { name: 'SepoliaETH', decimals: 18, symbol: 'SEP' },
    rpcUrls: ['https://sepolia.infura.io/v3/']
  },
  {
    chainName: 'Goerli Testnet',
    chainId: '0x5',
    nativeCurrency: { name: 'GoerliETH', decimals: 18, symbol: 'GOE' },
    rpcUrls: ['https://goerli.infura.io/v3/']
  }
]

export const connect = createAsyncThunk(
  "connectSlice/connect",
  async (_, { getState }) => {
    try {
      const provider = getProvider()
      const isConnected = getState().connectSlice.isConnected
      const accs = await window.ethereum.request({ method: "eth_accounts" })
      const network = await provider.getNetwork()
      const netId = network.chainId === expectedChainId[0] ? 0 : network.chainId === expectedChainId[1] ? 1 : null
      if (network.chainId !== expectedChainId[0] && network.chainId !== expectedChainId[1]) throw new Error("Check Network")
      if (accs[0]) return { account: accs[0], netId: netId }
      if (isConnected === false) {
        const accounts = await provider.send("eth_requestAccounts", []);
        return { account: accounts[0] }
      }
    } catch (err) {
      return {
        status: "failed",
        error: err.message
      };
    }
  }
);

export const changeNet = createAsyncThunk(
  "connectSlice/changeNet",
  async (netId, { dispatch }) => {
    try {
      const chainId = netId === 0 ? ethers.utils.hexlify(expectedChainId[netId]) : '0x5'
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainId }]
      });
    } catch (err) {
      if (err.code === 4902) {
        console.log("Too far")

        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            chainParams[netId]
          ]
        });
      } else {
        dispatch(error({ error: err }))
      }
      return {
        status: "failed",
        error: err.message
      };
    }
  }
);
