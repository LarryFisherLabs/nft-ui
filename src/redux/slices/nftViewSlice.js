import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  antName: null,
  isOwnedByUser: null,
  isAntDiscountAvailable: null,
  owner: null,
  totalNftCount: null,
  nftViewErr: null
}

export const nftViewSlice = createSlice({
  name: 'nftViewSlice',
  initialState,
  reducers: {
    updateAntName: (state, action) => {
      state.antName = action.payload.antName
    },
    updateIsOwnedByUser: (state, action) => {
      state.isOwnedByUser = action.payload.isOwnedByUser
      if (!action.payload.isOwnedByUser) state.owner = action.payload.owner
    },
    updateIsAntDiscountAvailable: (state, action) => {
      state.isAntDiscountAvailable = action.payload.isAntDiscountAvailable
    },
    updateTotalNftCount: (state, action) => {
      state.totalNftCount = action.payload.totalNftCount
    },
    updateNftViewErr: (state, action) => {
      state.nftViewErr = action.payload.nftViewErr
    },
  }
})

export const { updateAntName, updateIsOwnedByUser, updateIsAntDiscountAvailable, updateTotalNftCount, updateNftViewErr } = nftViewSlice.actions
export default nftViewSlice.reducer

export const selectAntName = state => state.nftViewSlice.antName
export const selectIsOwnedByUser = state => state.nftViewSlice.isOwnedByUser
export const selectIsAntDiscountAvailable = state => state.nftViewSlice.isAntDiscountAvailable
export const selectNftOwner = state => state.nftViewSlice.owner
export const selectTotalNftCount = state => state.nftViewSlice.totalNftCount
export const selectNftViewErr = state => state.nftViewSlice.nftViewErr