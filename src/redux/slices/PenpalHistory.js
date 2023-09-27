import { createSlice } from "@reduxjs/toolkit";
import {userPenpalHistory} from "../thunks/Thunks";

const initialState = {
    history: null,
    loading: false,
    error: "",
    success: false,
}

const GetPenpalHistory = createSlice({
    name: "Get Penpal History",
    initialState,
    // reducers: {

    // }
    extraReducers: (builder) => {
        builder.addCase(userPenpalHistory.pending, (state) => {
            state.loading = true
        })
        builder.addCase(userPenpalHistory.fulfilled, (state, action) => {
            state.loading = false
            state.history = action.payload
            state.success = true
        })
        builder.addCase(userPenpalHistory.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = action.payload.error.message
        })
    }
})

export default GetPenpalHistory.reducer