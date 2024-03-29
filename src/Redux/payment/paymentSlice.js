import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data:[],
    totalResult:0,
    error:null,
    loading:false
}

const paymentSlice = createSlice({
    name:"payment",
    initialState,
    reducers:{
        paymentRequest:(state) => {
            state.loading = true
        },
        paymentSuccess:(state,action) => {
            state.data = action.payload
            state.loading = false
        },
        setTotalResultPage:(state,action) => {
            state.totalResult = action.payload
        },
        paymentFailure:(state,action) => {
            state.error = action.payload
            state.loading = false
        }
    },
})

export const {paymentRequest,paymentSuccess,paymentFailure, setTotalResultPage} = paymentSlice.actions

export default paymentSlice.reducer