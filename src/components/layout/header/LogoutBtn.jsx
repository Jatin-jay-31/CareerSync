import React, { use } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { logoutUser } from '../../../redux/thunks/authThunks'
import authService from '../../../services/auth'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function LogoutBtn({className=""}) {
    const dispatch= useDispatch()
    const navigate=useNavigate()
    const loading = useSelector((state) => state.job.loading)
    const error = useSelector((state) => state.job.error)
    const logoutHandler= async()=>{ 
      try {
        await authService.logout()
        dispatch(logoutUser())
        dispatch(clearJobs())
        dispatch(setError(null))
        toast.success("Logged out Successfully",{duration:2000})
      } catch (error) {
        setError(error.message)
        toast.error(error.message)
      }
        
    }
  return (
    <button
            onClick={logoutHandler}
            className={`${className} inline-block duration-200`}
        >
            Logout
        </button>
  )
}

export default LogoutBtn