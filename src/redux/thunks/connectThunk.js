import { createAsyncThunk } from "@reduxjs/toolkit";
import { getNetId, getProvider } from "../../utils/ethers-utils";
import { addPopup, error, updateAccount, updateNetId, updateStatus } from "../slices/connectSlice";
import { walletErrors } from "../../utils/json-constants/walletErr";
import { popupTypes } from "../../utils/json-constants/popupInfo";
import { netInfo } from "../../utils/json-constants/networkInfo";

export const idleConnect = createAsyncThunk(
  "connectSlice/idleConnect",
  async (_, { dispatch }) => {
    try {
      const accs = await window.ethereum.request({ method: "eth_accounts" })
      if (accs[0]) dispatch(updateAccount({ account: accs[0] }))
      const netId = await getNetId()
      if (netId !== null) dispatch(updateNetId({ netId: netId }))
    } catch (err) {
      if (err.message.includes("internal error")) {
        dispatch(updateStatus({ status: 'offline' }))
        dispatch(updateNetId({ netId: 5 }))
        dispatch(addPopup({ id: popupTypes.reconnect }))
      }
      else dispatch(error({ error: err.message }))
    }
  }
)

export const connect = createAsyncThunk(
  "connectSlice/connect",
  async (_, { dispatch, getState }) => {
    try {
      const netFromState = getState().connectSlice.netId
      if (netFromState === null) {
        const netId = await getNetId()
        if (netId !== null) dispatch(updateNetId({ netId: netId }))
      }
      const provider = getProvider()
      const accounts = await provider.send("eth_requestAccounts", []);
      dispatch(updateAccount({ account: accounts[0] }))
    } catch (err) {
      const msg = err.message
      if (msg.includes(walletErrors.braveReject) || msg.includes(walletErrors.metamaskReject)) dispatch(addPopup({ id: popupTypes.txDenied }))
      else dispatch(error({ error: msg }))
    }
  }
)

export const changeNet = createAsyncThunk(
  "connectSlice/changeNet",
  async (newNetId, { dispatch, getState }) => {
    try {
      const status = getState().connectSlice.status
      if (status === 'offline') window.location = window.location.pathname + '?netId=' + newNetId
      else {
        const netIdHex = netInfo[newNetId].chainId
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: netIdHex }]
        });
      }
    } catch (err) {
      if (err.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainName: netInfo[newNetId].chainName,
            chainId: netInfo[newNetId].chainId,
            nativeCurrency: netInfo[newNetId].nativeCurrency,
            rpcUrls: netInfo[newNetId].rpcUrls
          }]
        })
      } else if (err.message.includes(walletErrors.braveReject) || err.message.includes(walletErrors.metamaskReject)) dispatch(addPopup({ id: popupTypes.txDenied }))
        else dispatch(error({ error: err.message }))
    }
  }
);
