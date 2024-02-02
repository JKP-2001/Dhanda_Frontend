import { createSlice } from "@reduxjs/toolkit";

export const instructerSlice=createSlice({
    name:"instructers",
    initialState:{
        instructers:[],
        isLoading:false,
        error:"",
        status:null,
        currPage:1,
        totalResults:0
    },
    reducers:{
        fetchInstructersLoading:(state)=>{
            state.isLoading=true;
        },
        fetchInstructerSuccess:(state,{payload})=>{
            state.isLoading=false;
            state.instructers=payload;
        },
        fetchInstructersFail:(state,{payload})=>{
            state.isLoading=false;
            state.error=payload;
        },
     
        setCurrentPage:(state,{payload})=>{
            state.currPage=payload;
        },
        
        setTotalResults:(state,{payload})=>{
            state.totalResults=payload;
        }

    }
})

const {actions,reducer}=instructerSlice;

export const {fetchInstructerSuccess,fetchInstructersLoading,fetchInstructersFail,setCurrentPage,setTotalResults}=actions;

export default reducer;