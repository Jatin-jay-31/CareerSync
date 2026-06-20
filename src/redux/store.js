import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import jobReducer from './slices/jobSlice'
import uiRedicer from './slices/uiSlice'
import resumeReducer from './slices/resumeSlice'
import aiReducer from './slices/aiSlice'

const store=configureStore({
    reducer:{
        auth: authReducer,
        job : jobReducer,
        ui : uiRedicer,
        resume: resumeReducer,
        ai : aiReducer
    }
})

export default store