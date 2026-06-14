import {createSlice} from '@reduxjs/toolkit';
import { fetchJobs,updateJob,deleteJob,createJob } from '../thunks/jobThunks';

const initialState={
    jobs: [],
    loading: false,
    error: null,
}

const jobSlice= createSlice({
    name: 'job',
    initialState,
    reducers:{
        clearJobs:(state)=>{
            state.jobs = []
        }
    },
    extraReducers:(builder)=>{builder
        .addCase(fetchJobs.pending,(state)=>{
            state.loading = true
            state.error=null
        })
        .addCase(fetchJobs.fulfilled,(state,action)=>{
            state.loading= false
            state.error= null
            state.jobs= action.payload

        })
        .addCase(fetchJobs.rejected,(state,action)=>{
            state.loading=false
            state.error= action.payload
        })
        .addCase(deleteJob.pending,(state)=>{
            state.loading = true
            state.error=null
        })
        .addCase(deleteJob.fulfilled,(state,action)=>{
            state.loading= false
            state.error= null
            state.jobs= state.jobs.filter((job)=> job.id !== action.payload)

        })
        .addCase(deleteJob.rejected,(state,action)=>{
            state.loading=false
            state.error= action.payload
        })
        .addCase(updateJob.pending,(state)=>{
            state.loading = true
            state.error=null
        })
        .addCase(updateJob.fulfilled,(state,action)=>{
            state.loading= false
            state.error= null
            state.jobs= state.jobs.map((job)=> job.id === action.payload.id ? {...job,...action.payload}: job)

        })
        .addCase(updateJob.rejected,(state,action)=>{
            state.loading=false
            state.error= action.payload
        })
        .addCase(createJob.pending,(state)=>{
            state.loading = true
            state.error=null
        })
        .addCase(createJob.fulfilled,(state,action)=>{
            state.loading= false
            state.error= null
            state.jobs= [...state.jobs,action.payload]

        })
        .addCase(createJob.rejected,(state,action)=>{
            state.loading=false
            state.error= action.payload
        })
    }
})
export const {clearJobs}= jobSlice.actions
export default jobSlice.reducer