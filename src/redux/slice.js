import { createSlice } from '@reduxjs/toolkit'

import { layers } from "../utils/ant-utils/antItems"

const initialState = {
  status: 'idle',
  account: null,
  isAdmin: false,
  coin: {
    coinStatus: 'idle',
    isBuilderAvailable: false,
    founder: {
      value: 0,
      isCoinMinted: true,
      isDiscountUsed: true
    },
    prices: [null, null, null, null],
    coins: [],
    count: null,
    msg: null
  },
  ant: {
    antStatus: 'idle',
    allFiles: [...layers]
  },
  errorMsg: ""
}

export const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    updateStatus: (state, action) => {
      state.status = action.payload.status
    },
    updateAccount: (state, action) => {
      state.account = action.payload.account
    },
    updateIsAdmin: (state, action) => {
      state.isAdmin = action.payload.isAdmin
    },


    updateCoinStatus: (state, action) => {
      state.coin.coinStatus = action.payload.status
    },
    updateIsBuilderAvailable: (state, action) => {
      state.coin.isBuilderAvailable = action.payload.isBuilderAvailable
    },

    updateFounder: (state, action) => {
      state.coin.founder.value = action.payload.value
      state.coin.founder.isCoinMinted = action.payload.isCoinMinted
      state.coin.founder.isDiscountUsed = action.payload.isDiscountUsed
    },

    updateCoinPrices: (state, action) => {
      state.coin.prices = action.payload.prices
    },
    updateCoins: (state, action) => {
      state.coin.coins = action.payload.coins
    },
    updateCount: (state, action) => {
      state.coin.count = action.payload.count
    },
    updateMsg: (state, action) => {
      state.coin.msg = action.payload.msg
    },


    updateAntStatus: (state, action) => {
      state.ant.antStatus = action.payload.status
    },
    selectAntFile: (state, action) => {
      state.ant.allFiles[action.payload.layerIndex].elements[action.payload.elementIndex].isDisabled = true
      state.ant.allFiles[action.payload.layerIndex].selected = {...action.payload.selected, isDisabled: true}
    },
    removeAntFile: (state, action) => {
      state.ant.allFiles[action.payload.layerIndex].selected = null
      state.ant.allFiles[action.payload.layerIndex].elements[action.payload.elementIndex].isDisabled = false
    },


    error: (state, action) => {
      state.status = 'failed'
      state.errorMsg = action.payload.error
    }
  },
  // extraReducers(builder) {
  //   builder
  //     // .addMatcher(isAnyOf(connect.fulfilled, loadProfile.fulfilled), (state, action) => {
  //     //   if (state.status !== 'failed') {
  //     //     state.status = action.payload.status
  //     //   }
  //     // })
  // }
})

export const { updateStatus, updateAccount, updateIsAdmin, updateCoinStatus, updateIsBuilderAvailable, updateFounder, updateCoinPrices, updateCoins, updateCount, updateMsg, updateAntStatus, selectAntFile, removeAntFile, error } = slice.actions
export default slice.reducer

export const selectStatus = state => state.slice.status
export const selectAccount = state => state.slice.account
export const selectIsAdmin = state => state.slice.isAdmin

export const selectCoinStatus = state => state.slice.coin.coinStatus
export const selectIsBuilderAvailable = state => state.slice.coin.isBuilderAvailable

export const selectFounder = state => state.slice.coin.founder

export const selectPrices = state => state.slice.coin.prices
export const selectCoins = state => state.slice.coin.coins
export const selectCount = state => state.slice.coin.count

export const selectAntStatus = state => state.slice.ant.antStatus
export const selectFiles = state => state.slice.ant.allFiles

export const selectErr = state => state.slice.errorMsg