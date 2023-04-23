import { createAsyncThunk } from "@reduxjs/toolkit";
import { antOwnerOf, changeName, getAnt, getCount, isDiscountUsed } from "../../apis/antContractApi";
import { getCounters, ownerOf } from "../../apis/coinContractApi";
import { getNftCount, getNftInfo } from "../../apis/coinDbApi";
import { updateAntDiscountString, updateAntName, updateIsOwnedByUser, updateNftViewErr, updateTotalNftCount } from "../slices/nftViewSlice";

// nftType:
// 0 - coins
// 1 - ants

export const loadNftCount = createAsyncThunk(
  "nftViewSlice/loadNftCount",
  async (nftType, { dispatch, getState }) => {
    try {
      const address = getState().connectSlice.account
      const netId = getState().connectSlice.netId
      const counter = (address === null || netId === 0 || netId === 1) ? await getNftCount(getState().connectSlice.netId, nftType) : nftType === 0 ? (await getCounters())[0] : await getCount()
      dispatch(updateTotalNftCount({ totalNftCount: counter }))
    } catch (err) {
      dispatch(updateNftViewErr({ nftViewErr: err.message }))
    }
  }
);

export const loadNftInfo = createAsyncThunk(
  "nftViewSlice/loadNftInfo",
  async ({ nftType, nftIndex }, { dispatch, getState }) => {
    try {
      const user = getState().connectSlice.account;
      const netId = getState().connectSlice.netId
      if (user === null || netId === 0 || netId === 1) {
        const nftInfo = await getNftInfo(getState().connectSlice.netId, nftIndex, nftType)
        const owner = nftInfo.owner
        dispatch(updateIsOwnedByUser({ isOwnedByUser: false, owner: owner }))
        if (nftType === 0) {
          const antDiscountString = nftInfo.attributes[2].value
          dispatch(updateAntDiscountString({ antDiscountString: antDiscountString }))
        } else {
          const name = nftInfo.name
          dispatch(updateAntName({ antName: name }))
        }
      }
      else {
        const owner = nftType === 0 ? await ownerOf(nftIndex) : await antOwnerOf(nftIndex);
        dispatch(updateIsOwnedByUser({ isOwnedByUser: user === owner.toLowerCase(), owner: owner.toLowerCase() }))
        if (nftType === 0) {
          const isAntDiscountUsed = await isDiscountUsed(nftIndex)
          const antDiscountString = isAntDiscountUsed ? 'Used' : 'Available'
          dispatch(updateAntDiscountString({ antDiscountString: antDiscountString }))
        } else {
          const ant = await getAnt(nftIndex)
          const name = ant[2] === "" ? "Larry" : ant[2]
          dispatch(updateAntName({ antName: name }))
        }
      }
    } catch (err) {
      dispatch(updateNftViewErr({ nftViewErr: err.message }))
    }
  }
);

export const changeAntName = createAsyncThunk(
  "nftViewSlice/changeAntName",
  async ({ id, newName }, { dispatch }) => {
    try {
      const tx = await changeName(id, newName)
      const receipt = await tx.wait()
      if (receipt.status === 1) {
        window.location.reload()
      } else {
        dispatch(updateNftViewErr({ nftViewErr: 'Bad tx. Logs: ' + receipt.logs }))
      }
    } catch (err) {
      dispatch(updateNftViewErr({ nftViewErr: err.message }))
    }
  }
);
