import { createSlice } from '@reduxjs/toolkit'
import { getApprovals, getApprovalsForAll, removeApproval, removeApprovalForAll, removeERC20Approval } from '../thunks/toolThunks'

const initialState = {
  approvals: [],
  approvalsForAll:[],
  erc20Approvals: [],
  isLoadingERC20: null,
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
        updateERC20Approvals: (state, action) => {
            const approvalDetails = action.payload.approvalDetails
            state.erc20Approvals = []
            for (let i = 0; i < approvalDetails.length; i++) {
                state.erc20Approvals.push(approvalDetails[i])
            }
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
                state.isLoadingERC20 = true
            })
            .addCase(getApprovals.fulfilled, state => {
                state.isLoading = false
                state.isLoadingERC20 = false
            })
            .addCase(removeERC20Approval.pending, state => {
                state.isLoadingERC20 = true
            })
            .addCase(removeERC20Approval.fulfilled, state => {
                state.isLoadingERC20 = false
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

export const { updateApprovals, updateApprovalsForAll, updateERC20Approvals, toolErr } = toolSlice.actions
export default toolSlice.reducer

export const selectApprovals = state => state.toolSlice.approvals
export const selectApprovalsForAll = state => state.toolSlice.approvalsForAll
export const selectERC20Approvals = state => state.toolSlice.erc20Approvals
export const selectIsLoadingERC20 = state => state.toolSlice.isLoadingERC20
export const selectIsLoading = state => state.toolSlice.isLoading
export const selectIsLoadingForAll = state => state.toolSlice.isLoadingForAll
export const selectToolErr = state => state.toolSlice.toolErr