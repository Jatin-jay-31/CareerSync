import authService from "../../services/authService";
import {createAsyncThunk} from '@reduxjs/toolkit'

export const loginUser= createAsyncThunk(
    "auth/loginUser",
    async({email,password},thunkAPI)=>{
        try{
            const userData= await authService.signIn({email, password})
            return userData
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message)
        }
    }
        
)
export const signupUser= createAsyncThunk(
    "auth/signUpUser",
    async({email,password},thunkAPI)=>{
        try{
            const userData= await authService.createAccount({email, password})
            return userData
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message)
        }
    }
        
)
export const logoutUser= createAsyncThunk(
    "auth/logoutUser",
    async(_,thunkAPI)=>{
        try{
            const userData= await authService.logout()
            return userData
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message)
        }
    }
        
)
