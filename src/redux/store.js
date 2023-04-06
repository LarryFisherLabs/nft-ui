import { configureStore } from '@reduxjs/toolkit'
import connectReducer from './slices/connectSlice'
import coinReducer from './slices/coinSlice'
import antReducer from './slices/antSlice'
import nftViewReducer from './slices/nftViewSlice'
import toolReducer from './slices/toolSlice'

export default configureStore({
  reducer: {
    connectSlice: connectReducer,
    coinSlice: coinReducer,
    antSlice: antReducer,
    nftViewSlice: nftViewReducer,
    toolSlice: toolReducer
  }
})