import { createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { getProvider } from "../../utils/ethers-utils";
import { error } from "../slices/connectSlice";

const expectedChainId = 11155111;

export const connect = createAsyncThunk(
  "connectSlice/connect",
  async (_, { getState }) => {
    try {
      const provider = getProvider()
      const isConnected = getState().connectSlice.isConnected
      const accs = await window.ethereum.request({ method: "eth_accounts" });
      const network = await provider.getNetwork();
      if (network.chainId !== expectedChainId) throw new Error("Check Network");
      if (accs[0]) return { account: accs[0] }
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
  async (_, { dispatch }) => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: ethers.utils.hexlify(expectedChainId) }]
      });
    } catch (err) {
      if (err.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainName: 'Sepolia Testnet',
              chainId: ethers.utils.hexlify(expectedChainId),
              nativeCurrency: { name: 'SepoliaETH', decimals: 18, symbol: 'SEP' },
              rpcUrls: ['https://rpc.sepolia.dev']
            }
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
