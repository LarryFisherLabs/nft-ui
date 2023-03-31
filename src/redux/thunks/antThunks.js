import { createAsyncThunk } from "@reduxjs/toolkit";
import { antBalanceOf, antOwnerOf, createAnt, createDiscountAnt, getDnaPrice, getPartInventory, getRarityPrices } from "../../apis/antContractApi";
import { getOwnersNfts } from "../../apis/coinDbApi";
import { staticLayerInfo } from "../../utils/ant-utils/staticAntInfo";
import { getAntContract } from "../../utils/ethers-utils";
import { popupTypes } from "../../utils/json-constants/popupInfo";
import { antError, updateAntIds, updatePartAvailability, updateRarityPrices } from "../slices/antSlice";
import { addPopup } from "../slices/connectSlice";

// loadAntBuilder
export const getPartInventories = createAsyncThunk(
  "antSlice/getPartInventory",
  async (_, { dispatch }) => {
    try {
      const prices = await getRarityPrices(0)
      dispatch(updateRarityPrices({ prices: prices }))
      for (let layerIndex = 0; layerIndex < staticLayerInfo.length; layerIndex++) {
        const parts = staticLayerInfo[layerIndex].elements
        for (let partIndex = 0; partIndex < parts.length; partIndex++) {
          const part = parts[partIndex]
          const available = (part.rarity > 2) ? await getPartInventory(layerIndex, partIndex) : 10000
          dispatch(updatePartAvailability({
            layerIndex: layerIndex,
            elementIndex: partIndex,
            available: available
          }))
        }
      }
    } catch (err) {
      dispatch(antError({error: err}))
    }
  }
)

export const getAntPrices = createAsyncThunk(
  "antSlice/getAntPrices",
  async ({ discountIndex }, { dispatch }) => {
    try {
      const prices = await getRarityPrices(discountIndex)
      dispatch(updateRarityPrices({ prices: prices }))
    } catch (err) {
      dispatch(antError({error: err}))
    }
  }
)

export const loadAntIdsOffline = createAsyncThunk(
  "antSlice/loadAntIdsOffline",
  async (remoteAddress, { dispatch, getState }) => {
    try {
      const antIds = await getOwnersNfts(getState().connectSlice.netId, remoteAddress, 1)
      dispatch(updateAntIds({ antIds: antIds }))
    } catch (err) {
      dispatch(antError({ error: err.message }))
    }
  }
)

export const getAntIds = createAsyncThunk(
  "antSlice/getAntIds",
  async (remoteAddress, { dispatch, getState }) => {
    try {
      const antContract = await getAntContract()
      const account = remoteAddress || getState().connectSlice.account
      const antBalance = await antBalanceOf(account)
      let ants = []
      if (antBalance > 0) {
        const transferLogs = await antContract.queryFilter(antContract.filters.Transfer(null, account))
        for (let i = 0; i < transferLogs.length; i++) {
          // get the indexed id 
          const id = parseInt(transferLogs[i].args[2])
          if (!ants.includes(id)) {
            ants.push(id)
          }
        }
        if (ants.length > antBalance) {
          for (let i = 0; i < ants.length; i++) {
            const owner = await antOwnerOf(ants[i])
            if (owner !== account) {
              ants.splice(i, 1)
            }
            if (ants.length === antBalance) {
              i = ants.length
            }
          }
        }
        dispatch(updateAntIds({ antIds: ants }))
      }
    } catch (err) {
      dispatch(antError({error: err}))
    }
  }
)

export const buyAntThunk = createAsyncThunk(
  "antSlice/buyAntThunk",
  async ({ selectedIndexes, totalPrice }, { dispatch, getState }) => {
    try {
      const discountIndex = getState().antSlice.discountIndex
      const coinId = getState().antSlice.coinId
      const dnaPrice = await getDnaPrice(selectedIndexes, discountIndex)
      if (dnaPrice.toString() !== totalPrice.toString()) throw new Error("Price does not match!" + dnaPrice.toString() + " " + totalPrice.toString())
      const tx = discountIndex === 0 ? await createAnt(selectedIndexes, totalPrice) : await createDiscountAnt(coinId, selectedIndexes, totalPrice)
      dispatch(addPopup({ id: popupTypes.buyingAnt }))
      dispatch(addPopup({ id: popupTypes.profileRedirect }))
      const receipt = await tx.wait()
      if (receipt.status === 1) {
        window.location.href = '/'
      } else {
        throw new Error('Bad tx. Logs: ' + receipt.logs)
      }
    } catch (err) {
      let legalErr = false
      if (err.message.includes("User denied")) {
        legalErr = true
        dispatch(addPopup({ id: popupTypes.txDenied }))
      }
      else if (err.message.includes("insufficient funds")) legalErr = true
      if (!legalErr) {
        dispatch(antError({error: err.message}))
      }
    }
  }
)
