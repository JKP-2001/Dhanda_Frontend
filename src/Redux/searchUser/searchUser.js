import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data:null,
    posts:null,
    bookMarkedPosts:null,
    error:null,
    loading:false
}

const userSlice = createSlice({
    name:"searchUser",
    initialState,
    reducers:{

        getSearchUserStart:(state)=>{
            state.loading = true
        },
        getSearchUserSuccess:(state,action)=>{
            state.data = action.payload
            state.loading = false
        },

        setSearchUserPosts:(state,action)=>{
            state.posts = action.payload
            state.loading = false
        },

        setSearchUserBookMarkedPosts:(state,action)=>{
            state.bookMarkedPosts = action.payload
            state.loading = false
        },
        getSearchUserFailure:(state,action)=>{
            state.error = action.payload
            state.loading = false
        }
    }
});


const {reducer,actions}=userSlice;

export const {getSearchUserStart,getSearchUserSuccess,getSearchUserFailure, setSearchUserPosts, setSearchUserBookMarkedPosts} = actions;

export default reducer;