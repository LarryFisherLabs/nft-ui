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
      if (netId === null) return { isWrongNet: true }
      else if (accs[0]) return { account: accs[0], netId: netId }
      else if (isConnected === false) {
        const accounts = await provider.send("eth_requestAccounts", []);
        return { account: accounts[0], netId: netId }
      } else return { netId: netId }
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
  async (netId, { dispatch, getState }) => {
    try {
      const status = getState().connectSlice.status
      if (status === 'offline') window.location = window.location.pathname + '?netId=' + netId
      else {
        // 0x5 must be hardcoded as hexlify leaves padding zeros for expectedChainId[1]
        const chainId = netId === 0 ? ethers.utils.hexlify(expectedChainId[netId]) : '0x5'
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainId }]
        });
      }
    } catch (err) {
      if (err.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            chainParams[netId]
          ]
        });
      } else if (!err.contains('User rejected')) {
        dispatch(error({ error: err }))
      }
    }
  }
);
