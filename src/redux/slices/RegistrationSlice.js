import {createSlice} from "@reduxjs/toolkit";
import {registerUser} from "../thunks/Thunks";

const initialState = {
    user: {},
    loading: false,
    error: "",
}

const RegistrationSlice = createSlice({
    name: "Signup Slice",
    initialState,
    // reducers: {

    // },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(registerUser.fulfilled, (state, payload) => {
            state.user = payload
            state.loading = false
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default RegistrationSlice.reducer