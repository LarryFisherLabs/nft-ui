import { createSlice } from '@reduxjs/toolkit'
import { buyCoin, coinsConnect, loadBuilder, loadCoinIds } from '../thunks/coinThunk'

const initialState = {
  coinStatus: 'idle',
  coinBuilderStatus: 'idle',
  coins: [],
  isCoinAdmin: null,
  founder: {
    value: 0,
    isFCMinted: false,
    isFCDiscountUsed: false,
  },
  prices: {
    bronze: null,
    silver: null,
    gold: null,
    diamond: null,
  },
  coinCounters: {
    total: null,
    bronze: null,
    silver: null,
    gold: null,
    diamond: null,
  },
  userBalance: null,
  coinErrMsg: "",
}

export const coinSlice = createSlice({
  name: 'coinSlice',
  initialState,
  reducers: {
    updateIsCoinAdmin: (state, action) => {
      state.isCoinAdmin = action.payload.isAdmin
    },
    updateCoins: (state, action) => {
      for (let i = 0; i < action.payload.coins.length; i++) {
        state.coins.push(action.payload.coins[i])
      }
    },
    coinError: (state, action) => {
      state.coinStatus = 'failed'
      state.coinErrMsg = "Error: " + action.payload.error
    },
  },
  extraReducers(builder) {
    builder
      .addCase(coinsConnect.pending, state => {
        state.coinStatus = 'connecting to coins contract...'
      })
      .addCase(coinsConnect.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.coinStatus = action.payload.status
          if (action.payload.status === 'failed') {
            state.coinErrMsg = "Error: " + action.payload.err
          }
        } else {
          state.coinStatus = "succeeded"
          for (let i = 0; i < action.payload.coins.length; i++) {
            state.coins.push(action.payload.coins[i])
          }
          state.founder.value = action.payload.founder.value
          state.founder.isFCMinted = action.payload.founder.isFCMinted
          state.founder.isFCDiscountUsed = action.payload.founder.isFCDiscountUsed
        }
      })
      .addCase(loadBuilder.pending, state => {
        state.coinBuilderStatus = 'loading builder...'
      })
      .addCase(loadBuilder.fulfilled, (state, action) => {
        if (action.payload.coinBuilderStatus === 'failed') {
          state.coinBuilderStatus = 'failed'
          state.coinErrMsg = action.payload.err
        } else {
          state.coinBuilderStatus = 'succeeded'
          state.founder.value = action.payload.founder.value
          state.founder.isFCMinted = action.payload.founder.isFCMinted
          state.founder.isFCDiscountUsed = action.payload.founder.isFCDiscountUsed
          state.prices.bronze = action.payload.prices[0]
          state.prices.silver = action.payload.prices[1]
          state.prices.gold = action.payload.prices[2]
          state.prices.diamond = action.payload.prices[3]
          state.coinCounters.total = action.payload.counters[0]
          state.coinCounters.bronze = action.payload.counters[1]
          state.coinCounters.silver = action.payload.counters[2]
          state.coinCounters.gold = action.payload.counters[3]
          state.coinCounters.diamond = action.payload.counters[4]
          state.userBalance = action.payload.userBalance
        }
      })
      .addCase(buyCoin.pending, state => {
        state.coinBuilderStatus = 'buying coin'
      })
      .addCase(buyCoin.fulfilled, (state, action) => {
        if (action.payload.builderStatus === 'failed') {
          state.coinBuilderStatus = 'failed'
          state.coinErrMsg = action.payload.err
        } else if (action.payload.builderStatus === 'bad pricing' || action.payload.builderStatus === 'bad value') {
          state.coinBuilderStatus = action.payload.builderStatus
          state.prices = action.payload.prices
        }
      })
      .addCase(loadCoinIds.pending, state => {
        state.coinStatus = 'Loading coins...'
      })
      .addCase(loadCoinIds.fulfilled, (state, action) => {
        if (state.coinStatus !== 'failed') {
          state.coinStatus = 'succeeded'
        }
      })
  },
})

export const { updateIsCoinAdmin, updateCoins, coinError } = coinSlice.actions
export default coinSlice.reducer

export const selectCoinStatus = state => state.coinSlice.coinStatus
export const selectCoinBuilderStatus = state => state.coinSlice.coinBuilderStatus
export const selectCoins = state => state.coinSlice.coins
export const selectIsCoinAdmin = state => state.coinSlice.isCoinAdmin
export const selectFounder = state => state.coinSlice.founder
export const selectPrices = state => state.coinSlice.prices
export const selectTotalCount = state => state.coinSlice.coinCounters.total
export const selectCoinCounters = state => state.coinSlice.coinCounters
export const selectUserBalance = state => state.coinSlice.userBalance
export const selectCoinErr = state => state.coinSlice.coinErrMsg
