
import { createSlice } from "@reduxjs/toolkit";
import {getPenpalRequests} from "../thunks/Thunks";

const initialState = {
    requests: [],
    loading: false,
    error: "",
    success: false,
}

const GetPenpalRequests = createSlice({
    name: "Get Penpal Requests",
    initialState,
    // reducers: {

    // }
    extraReducers: (builder) => {
        builder.addCase(getPenpalRequests.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getPenpalRequests.fulfilled, (state, action) => {
            state.loading = false
            state.requests = action.payload
            state.success = true
        })
        builder.addCase(getPenpalRequests.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = action?.payload?.error.message
        })
    }
})

export default GetPenpalRequests.reducer