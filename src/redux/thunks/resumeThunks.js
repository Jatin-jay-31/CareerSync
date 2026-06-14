import resumeService from "../../services/resumeService";
import {createAsyncThunk} from '@reduxjs/toolkit'

export const fetchResumes= createAsyncThunk(
    'resumes/fetchResumes',
    async (userId,thunkAPI) => {
        try{
            const resumesData= await resumeService.getResumes(userId)
            return resumesData
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message)
        }
        
    }
)
export const updateResume = createAsyncThunk(
    "resumes/updateResume",
    async ({ resumeId, updatedData }, thunkAPI) => {
        try {
            const updatedResume = await resumeService.updateResume(
                resumeId,
                updatedData
            )

            return updatedResume
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)
export const deleteResume= createAsyncThunk(
    'resumes/deleteResume',
    async (resumeId,thunkAPI) => {
        try{
            await resumeService.deleteResume(resumeId)
            return resumeId
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message)
        }
        
    }
)
export const uploadResume = createAsyncThunk(
  "resumes/uploadResume",
  async (data, thunkAPI) => {
    try {
      const file = data.resumeFile?.[0]
      if (!file) throw new Error("No file selected")

      const userId = data.userId

      const resumeFileUrl = await resumeService.uploadResumeFile(file, userId)

      const resume = await resumeService.createResume({
        userId,
        resumeFileUrl,
        resumeTitle: data.resumeTitle,
        resumeText: data.resumeText || "",
        targetRole: data.targetRole,
      })

      return resume 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)