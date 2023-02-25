import { createAsyncThunk } from "@reduxjs/toolkit"
import { owner } from "../../apis/coinContractApi"
import { coinError, updateIsCoinAdmin } from "../slices/coinSlice"

export  const loadCoinAdmin = createAsyncThunk(
    'coinSlice/loadCoinAdmin',
    async (_, { dispatch, getState }) => {
        try {
            const account = getState().connectSlice.account
            const contractOwner = await owner()
            const isCoinAdmin = account === contractOwner.toLowerCase()
            dispatch(updateIsCoinAdmin({ isAdmin: isCoinAdmin }))
        } catch (err) {
            dispatch(coinError({error: err.message}))
        }
    }
)