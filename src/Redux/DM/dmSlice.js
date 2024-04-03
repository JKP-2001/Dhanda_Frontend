import { createSlice } from "@reduxjs/toolkit"


const initalState = {
    data:[],
    totalResult:0,
    error:null,
    loading:false
}

const dmSlice = createSlice({
    name:"dm",
    initialState:initalState,
    reducers:{
        dmRequest:(state)=>{
            state.loading = true
        },

        dmSuccess:(state,action)=>{
            state.data = action.payload
            state.loading = false
        },

        setTotalDMPage:(state,action)=>{
            state.totalResult = action.payload
        },

        dmFailure:(state,action)=>{
            state.error = action.payload
            state.loading = false
        }
    }
})

const {actions,reducer} = dmSlice;

export const {dmRequest,dmSuccess,dmFailure,setTotalDMPage} = actions;

export default reducer