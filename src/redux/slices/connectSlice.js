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
    updateNetId: (state, action) => {
      state.netId = action.payload.netId
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
        if (action.payload.status === 'failed') {
          if (action.payload.error === "User rejected the request.") {
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
        } else if (action.payload.isWrongNet) {
          state.status = 'succeeded'
          state.isWrongNet = true
          state.netId = 1
        } else {
          state.status = 'succeeded'
          state.netId = action.payload.netId
          state.isConnected = false
        }
      })
  },
})

export const { updateStatus, updateViewLevel, updateNetId, error } = connectSlice.actions
export default connectSlice.reducer

export const selectStatus = state => state.connectSlice.status
export const selectIsConnected = state => state.connectSlice.isConnected
export const selectIsWrongNet = state => state.connectSlice.isWrongNet
export const selectAccount = state => state.connectSlice.account
export const selectNetId = state => state.connectSlice.netId
export const selectViewLevel = state => state.connectSlice.viewLevel
export const selectErr = state => state.connectSlice.errMsg