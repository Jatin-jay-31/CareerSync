import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import jobReducer from './slices/jobSlice'
import uiRedicer from './slices/uiSlice'
import resumeReducer from './slices/resumeSlice'

const store=configureStore({
    reducer:{
        auth: authReducer,
        job : jobReducer,
        ui : uiRedicer,
        resume: resumeReducer
    }
})

export default store