import { createSlice } from "@reduxjs/toolkit";
import { getAllStudents } from "../thunks/Thunks";

const initialState = {
  students: [],
  loading: false,
  error: "",
  success: false,
};

const GetAllStudents = createSlice({
  name: "Get All Students",
  initialState,
  // reducers: {

  // }
  extraReducers: (builder) => {
    builder.addCase(getAllStudents.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllStudents.fulfilled, (state, action) => {
      state.loading = false;
      state.students = action.payload;
      state.success = true;
    });
    builder.addCase(getAllStudents.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action?.payload?.error.message;
    });
  },
});

export default GetAllStudents.reducer;
