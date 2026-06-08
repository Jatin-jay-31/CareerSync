import { createSlice } from '@reduxjs/toolkit';
import { loginUser, signupUser, logoutUser, loginWithGoogle, loginWithGitHub, currentUser } from '../thunks/authThunks'
const initialState = {
    status: false,
    userData: null,
    loading: false,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.userData = action.payload
                state.status = true
                state.error = null
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
                state.status = false
            })
            .addCase(loginWithGoogle.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginWithGoogle.fulfilled, (state, action) => {
                state.loading = false
                state.userData = action.payload
                state.status = true
                state.error = null
            })
            .addCase(loginWithGoogle.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
                state.status = false
            })
            .addCase(loginWithGitHub.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginWithGitHub.fulfilled, (state, action) => {
                state.loading = false
                state.userData = action.payload
                state.status = true
                state.error = null
            })
            .addCase(loginWithGitHub.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
                state.status = false
            })
            .addCase(signupUser.pending, (state) => {
                state.loading = true
                state.error = null

            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false
                state.userData = action.payload
                state.status = true
                state.error = null
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
                state.status = false
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.loading = false
                state.userData = null
                state.status = false
                state.error = null
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
                state.status = true
            })
            .addCase(currentUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(currentUser.fulfilled, (state, action) => {
                state.loading = false
                state.userData = action.payload
                state.status = true
                state.error = null
            })
            .addCase(currentUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
                state.status = false
                state.userData = null
            })
    }

})

export default authSlice.reducer