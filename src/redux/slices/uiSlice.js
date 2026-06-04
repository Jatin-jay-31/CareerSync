import { createSlice } from "@reduxjs/toolkit";

const initialState={
    globalLoading: false,
    globalError: null,
    toast: {
        message: "",
        type: "info",
        visible: false
    },
    jobFilter: 'All',
    isModalOpen: false,
    isSidebarOpen: false
}

const uiSlice=createSlice({
    name: 'ui',
    initialState,
    reducers:{
        setGlobalLoading: (state,action)=>{
            state.globalLoading = action.payload
        },
        setGlobalError: (state,action)=>{
            state.globalError = action.payload
        },
        setToast: (state,action)=>{
            state.toast = action.payload
        },
        setJobFilter: (state,action)=>{
            state.jobFilter = action.payload
        },
        setIsModalOpen: (state,action)=>{
            state.isModalOpen = action.payload
        },
        setIsSidebarOpen: (state,action)=>{
            state.isSidebarOpen = action.payload
        }
    }

})

export const {setGlobalLoading, setGlobalError, setToast, setJobFilter, setIsModalOpen, setIsSidebarOpen} = uiSlice.actions
export default uiSlice.reducer