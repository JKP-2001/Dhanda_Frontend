import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    data:null,
    error:null,
    loading:false
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{

        getUserStart:(state)=>{
            state.loading = true
        },
        getUserSuccess:(state,action)=>{
            state.data = action.payload
            state.loading = false
        },
        getUserFailure:(state,action)=>{
            state.error = action.payload
            state.loading = false
        }
    }
});


const {reducer,actions}=userSlice;

export const {getUserStart,getUserSuccess,getUserFailure} = actions;

export default reducer;