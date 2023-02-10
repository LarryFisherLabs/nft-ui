import { configureStore } from '@reduxjs/toolkit'
import connectReducer from './slices/connectSlice'
import coinReducer from './slices/coinSlice'
import antReducer from './slices/antSlice'

export default configureStore({
  reducer: {
    connectSlice: connectReducer,
    coinSlice: coinReducer,
    antSlice: antReducer
  }
})