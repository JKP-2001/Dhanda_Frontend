import { createSlice } from "@reduxjs/toolkit";

const postSlice=createSlice({
    name:"posts",
    initialState:{
        posts:[],
        status:null,
        isLoading:false,
        error:""
    },
    reducers:{
        fetchPostsLoading:(state)=>{
            state.isLoading=true;
        },
        fetchPostsSuccess:(state,{payload})=>{
            state.isLoading=false;
            state.posts=payload;
        },
        fetchPostFail:(state,{payload})=>{
            state.isLoading=false;
            state.error=payload;
        }
    }
})

const {actions,reducer}= postSlice;

export const {fetchPostsLoading,fetchPostsSuccess,fetchPostFail} = actions;

export default reducer;