import { createSlice } from "@reduxjs/toolkit";
import {myPenpals} from "../thunks/Thunks";

const initialState = {
    penpals: [],
    loading: false,
    error: "",
    success: false,
}

const GetMyPenpals = createSlice({
    name: "Get All Students",
    initialState,
    // reducers: {

    // }
    extraReducers: (builder) => {
        builder.addCase(myPenpals.pending, (state) => {
            state.loading = true
        })
        builder.addCase(myPenpals.fulfilled, (state, action) => {
            state.loading = false
            state.penpals = action.payload
            state.success = true
        })
        builder.addCase(myPenpals.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = action?.payload?.error.message
        })
    }
})

export default GetMyPenpals.reducer