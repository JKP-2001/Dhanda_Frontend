import { createSlice } from "@reduxjs/toolkit";

const companyWiseInstructorSlice = createSlice({
  name: "companyWiseInstructorSlice",
  initialState: {
    instructor: {},
    isLoading: false,
    status: null,
    error: "",
  },
  reducers: {
    fetchInstructorsLoading: (state) => {
      state.isLoading = true;
    },
    fetchInstructorsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.instructor = payload;
    },
    fetchInstructorsFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

const {actions,reducer}=companyWiseInstructorSlice;

export const {fetchInstructorsLoading,fetchInstructorsSuccess,fetchInstructorsFail}=actions;

export default reducer;
