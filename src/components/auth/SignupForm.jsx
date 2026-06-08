import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Button, Logo, Input } from '../index'
import toast from "react-hot-toast"
import { currentUser, loginUser, signupUser,loginWithGitHub,loginWithGoogle } from '../../redux/thunks/authThunks'
import googleLogo from "../../assets/google-icon.svg";
import githubLogo from "../../assets/github-icon.svg";

function SignUpForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [error, setError] = useState("")
  const { register, handleSubmit } = useForm()

    const googleSignup= async()=>{
      setError("")
        try {
          const session= await dispatch(loginWithGoogle()).unwrap()
          if(!session){
            toast.error("Signup failed")
            return
          }
        } catch (error) {
          setError(error.message)
  
          toast.error(error.message)
          
        }
    }
    const githubSignup= async()=>{
      setError("")
        try {
          const session= await dispatch(loginWithGitHub()).unwrap()
          if(!session){
            toast.error("Signup failed")
            return
          }
        } catch (error) {
          setError(error.message)
  
          toast.error(error.message)
          
        }
    }

const signup = async (data) => {

  setError("")

  try {

    await dispatch(signupUser(data)).unwrap()

    toast.success(
      "Account Created Successfully",
      { duration: 2000 }
    )

    navigate("/")

  } catch (error) {

    setError(error)
    toast.error(error)

  }
}

  return (
    <div className="flex items-center justify-center gap-6 max-h-screen">
      <div className={`mx-auto w-full max-w-md bg-gray-100 rounded-2xl p-10  shadow-xl  bg-white border border-slate-200`}>
        <div className="mb-2 flex justify-center">
          <span className="flex justify-center w-full">
            <Logo />
          </span>
        </div>
        <h2 className={` text-center text-2xl font-bold leading-tight text-black `}>Sign up to create account</h2>
        <p className={`mt-2 mb-2 text-center text-base  text-black/60}`}>
          Start tracking jobs smarter with CareerSync &nbsp;
        </p>
        <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    className="
            w-full
            flex
            items-center
            justify-center
            gap-3
            py-3
            px-5
            border
            border-gray-300
            rounded-full
            bg-white
            text-gray-700
            font-medium
            hover:border-emerald-500
            hover:text-emerald-600
            transition
            duration-200
          "
                  onClick={googleSignup}>
                    <img
                      src={googleLogo}
                      alt="Google"
                      className="w-5 h-5"
                    />
                    Continue with Google
                  </button>
                  <button
                    type="button"
                    className="
            w-full
            flex
            items-center
            justify-center
            gap-3
            py-3
            px-5
            border
            border-gray-300
            rounded-full
            bg-white
            text-gray-700
            font-medium
            hover:border-emerald-500
            hover:text-emerald-600
            transition
            duration-200
          "
                  onClick={githubSignup}>
                    <img
                      src={githubLogo}
                      alt="Github"
                      className="w-5 h-5"
                    />
        
                    Continue with Github
                  </button>
                </div>
        {error && (<p className="text-red-600 mt-8 text-center">
          {error} </p>)}
          <div className="flex items-center my-6">
          <div className="flex-1 border-t"></div>

          <span className="px-4 text-sm text-gray-500">
            OR
          </span>

          <div className="flex-1 border-t"></div>
        </div>

        <form onSubmit={handleSubmit(signup)}>
          <div className='space-y-5'>
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                }
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type='submit' className='w-full' >
              Create Account
            </Button>
            <p className={`text-center text-base  my-4 text-black/60 `}>
              Already have an account?&nbsp;
              <Link
                to="/login"
                className={` text-black/60  font-medium text-primary transition-all duration-200 hover:underline`}
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>

    </div>
  )
}

export default SignUpForm 