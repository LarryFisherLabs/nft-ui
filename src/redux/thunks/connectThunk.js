import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProvider } from "../../utils/ethers-utils";

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
