import { createSlice } from "@reduxjs/toolkit";


const postSlice = createSlice({
    name:"post",
    initialState:{
        data:[],
        error:null,
        loading:false
    },
    reducers:{
        getPostRequest:(state,action)=>{
            state.loading = true
        },
        getPostSuccess:(state,action)=>{
            state.data = action.payload
            state.loading = false
        },
        getPostFailure:(state,action)=>{
            state.error = action.payload
            state.loading = false
        }
    }
});

export const {getPostRequest,getPostSuccess,getPostFailure} = postSlice.actions;

export default postSlice.reducer;

