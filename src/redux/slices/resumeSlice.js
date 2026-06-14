import { createSlice } from "@reduxjs/toolkit";
import { fetchResumes, updateResume, uploadResume, deleteResume } from "../thunks/resumeThunks";

const initialState = {
    resumes: [],
    uploading: false,
    loading: false,
    uploadProgress: 0,
    error: null,
    aiAnalysis: {
        matchScore: 0,
        missingSkills: [],
        suggestions: ""
    }
}

const resumeSlice = createSlice({
    name: 'resume',
    initialState,
    reducers: {
        setAiAnalysis: (state, action) => {
            state.aiAnalysis = { ...state.aiAnalysis, ...action.payload }
        },
        resetResume: (state) => {
            state.uploading = false
            state.uploadProgress = 0
            state.error = null
            state.aiAnalysis = {
                matchScore: 0,
                missingSkills: [],
                suggestions: ""
            }
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchResumes.pending, (state) => {
                state.error = null
                state.loading = true
            })
            .addCase(fetchResumes.fulfilled, (state, action) => {
                state.error = null
                state.loading = false
                state.resumes = action.payload
            })
            .addCase(fetchResumes.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(deleteResume.pending, (state) => {
                state.error = null
                state.loading = true
            })
            .addCase(deleteResume.fulfilled, (state, action) => {
                state.error = null
                state.loading = false
                state.resumes = state.resumes.filter((resume) => resume.id !== action.payload)
            })
            .addCase(deleteResume.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(updateResume.pending, (state) => {
                state.error = null
                state.loading = true
            })
            .addCase(updateResume.fulfilled, (state, action) => {
                state.error = null
                state.loading = false

                if (!action.payload) return

                state.resumes = state.resumes.map((resume) =>
                    resume.id === action.payload.id
                        ? { ...resume, ...action.payload }
                        : resume
                )
            })
            .addCase(updateResume.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(uploadResume.pending, (state) => {
                state.error = null
                state.uploading = true
                state.uploadProgress = 0
            })
            .addCase(uploadResume.fulfilled, (state, action) => {
                state.error = null
                state.uploading = false
                if (!Array.isArray(state.resumes)) {
                    state.resumes = []
                }
                state.resumes.push(action.payload)
            })
            .addCase(uploadResume.rejected, (state, action) => {
                state.error = action.payload
                state.uploading = false
            })
    }

})

export const { setAiAnalysis, resetResume } = resumeSlice.actions
export default resumeSlice.reducer