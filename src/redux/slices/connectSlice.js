import { createSlice } from '@reduxjs/toolkit'

import { connect } from '../thunks/connectThunk'

// isConnected must start as null
const initialState = {
  status: 'idle',
  isConnected: null,
  isWrongNet: null,
  account: null,
  netId: null,
  viewLevel: null,
  errMsg: ""
}

export const connectSlice = createSlice({
  name: 'connectSlice',
  initialState,
  reducers: {
    updateStatus: (state, action) => {
      state.status = action.payload.status
    },
    updateViewLevel: (state, action) => {
      state.viewLevel = action.payload.viewLevel
    },
    error: (state, action) => {
      state.status = 'failed'
      state.errMsg = "Error: " + action.payload.error
    }
  },
  extraReducers(builder) {
    builder
      .addCase(connect.pending, state => {
        state.status = 'loading connection...'
      })
      .addCase(connect.fulfilled, (state, action) => {
        if (action.payload) {
          if (action.payload.status === 'failed') {
            if (action.payload.error === "Check Network") {
              state.status = 'succeeded'
              state.isConnected = false
              state.isWrongNet = true
            } else if (action.payload.error === "User rejected the request.") {
              state.status = "succeeded"
              state.isConnected = false
            } else {
              state.status = 'failed'
              state.errMsg = "Error: " + action.payload.error
            }
          } else if (action.payload.account) {
            state.status = 'succeeded'
            state.isConnected = true
            state.account = action.payload.account
            state.netId = action.payload.netId
          } 
        } else {
          // wait for connect button
          state.status = "succeeded"
          state.isConnected = false
        }
      })
  },
})

export const { updateStatus, updateViewLevel, error } = connectSlice.actions
export default connectSlice.reducer

export const selectStatus = state => state.connectSlice.status
export const selectIsConnected = state => state.connectSlice.isConnected
export const selectIsWrongNet = state => state.connectSlice.isWrongNet
export const selectAccount = state => state.connectSlice.account
export const selectNetId = state => state.connectSlice.netId
export const selectViewLevel = state => state.connectSlice.viewLevel
export const selectErr = state => state.connectSlice.errMsg