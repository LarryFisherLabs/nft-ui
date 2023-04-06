import { createSlice } from '@reduxjs/toolkit'
import { getApprovals, getApprovalsForAll, removeApproval, removeApprovalForAll } from '../thunks/toolThunks'

const initialState = {
  approvals: [],
  approvalsForAll:[],
  isLoading: null,
  isLoadingForAll: null,
  toolErr: null
}

export const toolSlice = createSlice({
    name: 'toolSlice',
    initialState,
    reducers: {
        updateApprovals: (state, action) => {
            const approvalDetails = action.payload.approvalDetails
            state.approvals = []
            for (let i = 0; i < approvalDetails.length; i++) {
                state.approvals.push(approvalDetails[i])
            }
        },
        updateApprovalsForAll: (state, action) => {
            const approvalForAllDeets = action.payload.approvalForAllDeets
            state.approvalsForAll = []
            for (let i = 0; i < approvalForAllDeets.length; i++) {
                state.approvalsForAll.push(approvalForAllDeets[i])
            }
        },
        updateIsLoading: (state, action) => {
            state.isLoading = action.payload.isLoading
        },
        updateIsLoadingForAll: (state, action) => {
            state.isLoadingForAll = action.payload.isLoadingForAll
        },
        toolErr: (state, action) => {
            state.toolErr = action.payload.error
            state.isLoading = false
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getApprovals.pending, state => {
                state.isLoading = true
            })
            .addCase(getApprovals.fulfilled, state => {
                state.isLoading = false
            })
            .addCase(removeApproval.pending, state => {
                state.isLoading = true
            })
            .addCase(removeApproval.fulfilled, state => {
                state.isLoading = false
            })
            .addCase(getApprovalsForAll.pending, state => {
                state.isLoadingForAll = true
            })
            .addCase(getApprovalsForAll.fulfilled, state => {
                state.isLoadingForAll = false
            })
            .addCase(removeApprovalForAll.pending, state => {
                state.isLoadingForAll = true
            })
            .addCase(removeApprovalForAll.fulfilled, state => {
                state.isLoadingForAll = false
            })
    }
})

export const { updateApprovals, updateApprovalsForAll, updateIsLoading, updateIsLoadingForAll, toolErr } = toolSlice.actions
export default toolSlice.reducer

export const selectApprovals = state => state.toolSlice.approvals
export const selectApprovalsForAll = state => state.toolSlice.approvalsForAll
export const selectIsLoading = state => state.toolSlice.isLoading
export const selectIsLoadingForAll = state => state.toolSlice.isLoadingForAll
export const selectToolErr = state => state.toolSlice.toolErr