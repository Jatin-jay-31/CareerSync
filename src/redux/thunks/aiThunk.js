import geminiService from "../../services/geminiService"
import resumeService from "../../services/resumeService"
import {createAsyncThunk} from '@reduxjs/toolkit'


export const analyzeResume =
createAsyncThunk(
    "ai/analyzeResume",
    async (
        {
            resumeText,
            targetRole,
            resumeId
        },
        thunkAPI
    ) => {

        try {

            const result =
                await geminiService.analyzeResume({
                    resumeText,
                    targetRole
                })
                await resumeService.updateResume(resumeId,{
                    aiAnalysis: result
                })

            return result

        }

        catch(error){
            console.log("GEMINI ERROR:", error)
            console.log("GEMINI RESPONSE:", error?.message)
            return thunkAPI.rejectWithValue(
                error.message
            )
        }
    }
)
export const analyzeResumeMatch =
createAsyncThunk(
    "ai/analyzeResumeMatch",
    async (
        {
            resumeText,
            jobDescription,
            resumeId
        },
        thunkAPI
    ) => {

        try {

            const result =
                await geminiService.analyzeResumeMatch({
                    resumeText,
                    jobDescription
                })
                await resumeService.updateResume(resumeId,
                    {aiAnalysis: result}
                )

            return result

        }

        catch(error){
            console.log("GEMINI ERROR:", error)
            console.log("GEMINI RESPONSE:", error?.message)

            return thunkAPI.rejectWithValue(
                error.message
            )
        }
    }
)