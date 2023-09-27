import { createSlice } from "@reduxjs/toolkit";
import {getElderDetails} from "../thunks/Thunks";

const initialState = {
    details: [],
    loading: false,
    error: "",
    success: false,
}

const ElderDetails = createSlice({
    name: "Get Elder Details",
    initialState,
    // reducers: {

    // }
    extraReducers: (builder) => {
        builder.addCase(getElderDetails.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getElderDetails.fulfilled, (state, action) => {
            state.loading = false
            state.details = action.payload
            state.success = true
        })
        builder.addCase(getElderDetails.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = action?.payload?.error.message
        })
    }
})

export default ElderDetails.reducer