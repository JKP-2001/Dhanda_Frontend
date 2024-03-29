import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    upComing:[],
    past:[],
    totalResult:0,
    error:null,
    loading:false
}

const bookingSlice = createSlice({
    name:"booking",
    initialState,
    reducers:{
        bookingRequest:(state) => {
            state.loading = true
        },
        upbookingSuccess:(state,action) => {
            state.upComing = action.payload
            state.loading = false
        },
        pastbookingSuccess:(state,action) => {
            state.past = action.payload
            state.loading = false  
        },
        setTotalBookingPage:(state,action) => {
            state.totalResult = action.payload
        },
        bookingFailure:(state,action) => {
            state.error = action.payload
            state.loading = false
        }
    },
})

export const {bookingRequest,upbookingSuccess,pastbookingSuccess,bookingFailure, setTotalBookingPage} = bookingSlice.actions

export default bookingSlice.reducer