import {createSlice} from '@reduxjs/toolkit';
import {loginUser, signupUser, logoutUser} from '../thunks/authThunks'
const initialState={
    status: false,
    userData: null,
    loading: false,
    error: null
}

const authSlice=createSlice({
    name: 'auth',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{builder
        .addCase(loginUser.pending,(state) =>{
            state.loading=true
            state.error=null
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading=false
            state.userData= action.payload
            state.status=true
            state.error=null
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading= false
            state.error= action.error.message
            state.status=false
        })
        .addCase(signupUser.pending,(state)=>{
            state.loading=true
            state.error=null
            
        })
        .addCase(signupUser.fulfilled,(state,action)=>{
            state.loading=false
            state.userData= action.payload
            state.status=true
            state.error=null
        })
        .addCase(signupUser.rejected,(state,action)=>{
            state.loading= false
            state.error= action.error.message
            state.status=false
        })
        .addCase(logoutUser.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(logoutUser.fulfilled,(state,action)=>{
            state.loading=false
            state.userData= null
            state.status=false
            state.error=null
        })
        .addCase(logoutUser.rejected,(state,action)=>{
            state.loading= false
            state.error= action.error.message
            state.status=true
        })
    }

})

export default authSlice.reducer