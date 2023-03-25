import { createAsyncThunk } from "@reduxjs/toolkit";
import { antOwnerOf, changeName, getAnt, getCount, isDiscountUsed } from "../../apis/antContractApi";
import { getCounters, ownerOf } from "../../apis/coinContractApi";
import { getNftCount, getNftOwner } from "../../apis/coinDbApi";
import { updateAntName, updateIsAntDiscountAvailable, updateIsOwnedByUser, updateNftViewErr, updateTotalNftCount } from "../slices/nftViewSlice";

// nftType:
// 0 - coins
// 1 - ants

export const loadNftCount = createAsyncThunk(
  "nftViewSlice/loadNftCount",
  async (nftType, { dispatch, getState }) => {
    try {
      const address = getState().connectSlice.account
      const counter = address === null ? await getNftCount(getState().connectSlice.netId, nftType) : nftType === 0 ? (await getCounters())[0] : await getCount()
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
      const owner = user === null ? await getNftOwner(getState().connectSlice.netId, nftIndex, nftType) : nftType === 0 ? await ownerOf(nftIndex) : await antOwnerOf(nftIndex);
      dispatch(updateIsOwnedByUser({ isOwnedByUser: user === owner.toLowerCase(), owner: owner.toLowerCase() }))
      if (nftType === 0) {
        const isAntDiscountUsed = await isDiscountUsed(nftIndex)
        dispatch(updateIsAntDiscountAvailable({ isAntDiscountAvailable: !isAntDiscountUsed }))
      } else {
        const ant = await getAnt(nftIndex)
        const name = ant[2] === "" ? "Larry" : ant[2]
        dispatch(updateAntName({ antName: name }))
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
