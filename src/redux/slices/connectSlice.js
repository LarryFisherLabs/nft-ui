import { createSlice } from '@reduxjs/toolkit'

import { connect } from '../thunks/connectThunk'

// isConnected must start as null
const initialState = {
  status: 'idle',
  isConnected: null,
  account: null,
  errMsg: ""
}

export const connectSlice = createSlice({
  name: 'connectSlice',
  initialState,
  reducers: {
    updateStatus: (state, action) => {
      state.status = action.payload.status
    },
    error: (state, action) => {
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
            state.status = 'failed'
            state.errMsg = "Error: " + action.payload.error
          } else if (action.payload.account) {
            state.status = "succeeded"
            state.isConnected = true
            state.account = action.payload.account
          } 
        } else {
          // wait for connect button
          state.status = "succeeded"
          state.isConnected = false
        }
      })
  },
})

export const { updateStatus, error } = connectSlice.actions
export default connectSlice.reducer

export const selectStatus = state => state.connectSlice.status
export const selectIsConnected = state => state.connectSlice.isConnected
export const selectAccount = state => state.connectSlice.account
export const selectErr = state => state.connectSlice.errMsg