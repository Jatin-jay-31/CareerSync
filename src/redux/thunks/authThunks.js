import authService from "../../services/auth";
import { createAsyncThunk } from '@reduxjs/toolkit'

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, thunkAPI) => {
        try {
            return await authService.signIn({ email, password })
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }

)
export const signupUser = createAsyncThunk(
    "auth/signUpUser",
    async ({ email, password }, thunkAPI) => {
        try {
            return await authService.createAccount({ email, password })
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }

)
export const loginWithGoogle = createAsyncThunk(
    "auth/loginWithGoogle",
    async (_, thunkAPI) => {
        try {
            return await authService.signInWithGoogle()
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)
export const loginWithGitHub = createAsyncThunk(
    "auth/loginWithGitHub",
    async (_, thunkAPI) => {
        try {
            return await authService.signInWithGitHub()
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)
export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, thunkAPI) => {
        try {
            return await authService.logout()

        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }

)
export const currentUser = createAsyncThunk(
    "auth/currentUser",
    async (_, thunkAPI) => {
        try {
            return await authService.getCurrentUser()
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }

)
