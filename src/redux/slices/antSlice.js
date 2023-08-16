import { createSlice } from '@reduxjs/toolkit'
import { layerInfo } from '../../utils/ant-utils/antInfo'
import { buyAntThunk, getAntIds, getAntPrices, getPartInventories, loadAntIdsOffline } from '../thunks/antThunks'

const initialState = {
  antStatus: 'idle',
  antIds: [],
  rarityPrices: [null, null, null, null, null, null],
  antPartsInfo: [...layerInfo],
  discountIndex: 0,
  coinId: null,
  antErrMsg: "",
}

export const antSlice = createSlice({
  name: 'antSlice',
  initialState,
  reducers: {
    updateAntStatus: (state, action) => {
      state.antStatus = action.payload.status
    },
    updateAntIds: (state, action) => {
      for (let i = 0; i < action.payload.antIds.length; i++) {
        state.antIds.push(action.payload.antIds[i])
      }
    },
    updateRarityPrices: (state, action) => {
      for (let i = 0; i < 6; i++) {
        state.rarityPrices[i] = action.payload.prices[i]
      }
    },
    updatePartAvailability: (state, action) => {
      state.antPartsInfo[action.payload.layerIndex].partStocks[action.payload.elementIndex] = action.payload.available
    },
    selectAntFile: (state, action) => {
      state.antPartsInfo[action.payload.layerIndex].selectedIndex = action.payload.elementIndex
    },
    removeAntFile: (state, action) => {
      state.antPartsInfo[action.payload.layerIndex].selectedIndex = 0
    },
    updateCoinInfo: (state, action) => {
      state.discountIndex = action.payload.discountIndex
      state.coinId = action.payload.coinId
    },
    antError: (state, action) => {
      state.antStatus = 'failed'
      state.antErrMsg = "Error: " + action.payload.error
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPartInventories.pending, state => {
        state.antStatus = 'Loading part inventories...'
      })
      .addCase(getPartInventories.fulfilled, state => {
        if (state.antStatus === 'Loading part inventories...') state.antStatus = 'succeeded'
      })
      .addCase(getAntIds.pending, state => {
        state.antStatus = 'Loading ants...'
      })
      .addCase(getAntIds.fulfilled, state => {
        if (state.antStatus === 'Loading ants...') state.antStatus = 'succeeded'
      })
      .addCase(getAntPrices.pending, state => {
        if (state.antStatus === 'succeeded') state.antStatus = 'Loading prices...'
      })
      .addCase(getAntPrices.fulfilled, state => {
        if (state.antStatus === 'Loading prices...') state.antStatus = 'succeeded'
      })
      .addCase(buyAntThunk.pending, state => {
        state.antStatus = 'Buying ant...'
      })
      .addCase(buyAntThunk.fulfilled, state => {
        if (state.antStatus === 'Buying ant...') state.antStatus = 'succeeded'
      })
      .addCase(loadAntIdsOffline.pending, state => {
        state.antStatus = 'Loading ants...'
      })
      .addCase(loadAntIdsOffline.fulfilled, state => {
        if (state.antStatus === 'Loading ants...') state.antStatus = 'succeeded'
      })
  }
})

export const { updateAntIds, updateAntStatus, updateRarityPrices, updatePartAvailability, selectAntFile, removeAntFile, updateCoinInfo, antError } = antSlice.actions
export default antSlice.reducer

export const selectAntStatus = state => state.antSlice.antStatus
export const selectAntIds = state => state.antSlice.antIds
export const selectRarityPrices = state => state.antSlice.rarityPrices
export const selectDiscountInfo = state => [state.antSlice.discountIndex, state.antSlice.coinId]
export const selectAntErrMsg = state => state.antSlice.antErrMsg
export const selectSelectedIndexes = state => state.antSlice.antPartsInfo.map(layer => layer.selectedIndex)
export const selectPartStocks = state => state.antSlice.antPartsInfo.map(layer => layer.partStocks)
