import { createSlice } from '@reduxjs/toolkit'

import { connect, idleConnect } from '../thunks/connectThunk'

// isConnected must start as null
const initialState = {
  status: 'idle',
  account: null,
  netId: null,
  viewLevel: null,
  popupIds: [],
  errMsg: ""
}

export const connectSlice = createSlice({
  name: 'connectSlice',
  initialState,
  reducers: {
    updateStatus: (state, action) => {
      state.status = action.payload.status
    },
    updateAccount: (state, action) => {
      state.account = action.payload.account
    },
    updateNetId: (state, action) => {
      state.netId = action.payload.netId
    },
    updateViewLevel: (state, action) => {
      state.viewLevel = action.payload.viewLevel
    },
    addPopup: (state, action) => {
      const isPresent = state.popupIds.includes(action.payload.id)
      if (!isPresent) state.popupIds.push(action.payload.id)
      else {
        const index = state.popupIds.indexOf(action.payload.id)
        if (index !== -1) {
          state.popupIds.splice(index, 1)
          state.popupIds.push(action.payload.id)
        }
      }
    },
    removePopup: (state, action) => {
      const index = state.popupIds.indexOf(action.payload.id)
      if (index !== -1) state.popupIds.splice(index, 1)
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
        if (state.status !== 'failed') state.status = 'succeeded'
      })
      .addCase(idleConnect.pending, state => {
        state.status = 'loading connection...'
      })
      .addCase(idleConnect.fulfilled, (state, action) => {
        if (state.status === 'loading connection...') state.status = 'succeeded'
      })
  },
})

export const { updateStatus, updateAccount, updateNetId, updateViewLevel, addPopup, removePopup, error } = connectSlice.actions
export default connectSlice.reducer

export const selectStatus = state => state.connectSlice.status
export const selectAccount = state => state.connectSlice.account
export const selectNetId = state => state.connectSlice.netId
export const selectViewLevel = state => state.connectSlice.viewLevel
export const selectPopupIds = state => state.connectSlice.popupIds
export const selectErr = state => state.connectSlice.errMsg