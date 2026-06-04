import jobService from "../../services/jobService";
import {createAsyncThunk} from '@reduxjs/toolkit'

export const fetchJobs= createAsyncThunk(
    "jobs/fetchJobs",
    async (userId,thunkAPI)=>{
        try{
            const jobEntries= await jobService.getUserJobEntries(userId)
            return jobEntries
        } catch(error){
            return thunkAPI.rejectWithValue(error.message)
        }
        }
)
export const createJob= createAsyncThunk(
    "jobs/createJob",
    async ({userId,companyName,position,jobLink,status,notes},thunkAPI)=>{
        try{
            const jobData= await jobService.createJobEntry({
                userId,
                companyName,
                position,
                jobLink,
                status,
                notes
            })
            return jobData
        } catch(error){
            return thunkAPI.rejectWithValue(error.message)
        }
        }
)
export const deleteJob= createAsyncThunk(
    "jobs/deleteJob",
    async (jobId,thunkAPI)=>{
        try{
            const jobRef= await jobService.deleteJob(jobId)
            return jobRef
        } catch(error){
            return thunkAPI.rejectWithValue(error.message)
        }
        }
)
export const updateJob= createAsyncThunk(
    "jobs/updateJob",
    async ({jobId,updatedData},thunkAPI)=>{
        try{
            const jobRef= await jobService.updateJob(jobId, updatedData)
            return jobRef
        } catch(error){
            return thunkAPI.rejectWithValue(error.message)
        }
        }
)
