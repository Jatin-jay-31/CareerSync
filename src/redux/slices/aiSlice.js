import { createSlice } from '@reduxjs/toolkit';
import {analyzeResume,analyzeResumeMatch} from '../thunks/aiThunk'
const initialState = {
    loading: false,
    error: null,
    analysis: null,
    matchAnalysis:null
}

const aiSlice = createSlice({
    name: 'ai',
    initialState,
    reducers: {
    clearAnalysis: (state) => {
        state.analysis = null
    },

    clearMatchAnalysis: (state) => {
        state.matchAnalysis = null
    }
},
    extraReducers: (builder) => {
        builder
            .addCase(analyzeResume.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(analyzeResume.fulfilled, (state, action) => {
                state.loading = false
                state.analysis = action.payload
                state.error = null
            })
            .addCase(analyzeResume.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
            .addCase(analyzeResumeMatch.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(analyzeResumeMatch.fulfilled, (state, action) => {
                state.loading = false
                state.matchAnalysis = action.payload
                state.error = null
            })
            .addCase(analyzeResumeMatch.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
            
    }

})
export const { clearAnalysis,clearMatchAnalysis} = aiSlice.actions

export default aiSlice.reducer