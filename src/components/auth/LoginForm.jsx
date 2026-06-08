import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { currentUser, loginUser, loginWithGitHub, loginWithGoogle } from '../../redux/thunks/authThunks'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Logo } from '../index'
import toast from 'react-hot-toast'
import googleLogo from "../../assets/google-icon.svg";
import githubLogo from "../../assets/github-icon.svg";

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")

  const googleLogin = async () => {
    setError("")
    try {
      const session = await dispatch(loginWithGoogle()).unwrap()
      if (!session) {
        toast.error("Login failed")
        console.log("SUCCESS", session)
        return
      }
    } catch (error) {
      setError(error.message)
      console.error("GOOGLE ERROR:", error)

      toast.error(error.message)

    }
  }
  const githubLogin = async () => {
    setError("")
    try {
      const session = await dispatch(loginWithGitHub()).unwrap()
      if (!session) {
        toast.error("Login failed")
        return
      }
    } catch (error) {
      setError(error.message)

      toast.error(error.message)

    }
  }

const login = async (data) => {
  setError("")

  try {

    await dispatch(loginUser(data)).unwrap()

    toast.success("Welcome back")

    navigate("/")

  } catch (error) {

    setError(error)

    toast.error(error)
  }
}
  return (
    <div
      className='flex items-center justify-center w-full gap-6 max-h-screen'
    >
      <div className={`mx-auto w-full max-w-md bg-gray-100 rounded-2xl p-10   shadow-xl bg-white border border-slate-200`}>
        <div className="mb-2 flex justify-center">
          <span className="flex justify-center w-full">
            <Logo />
          </span>
        </div>
        <h2 className={`text-center text-2xl font-bold leading-tight text-black}`}>Welcome Back</h2>
        <p className={`mt-2 mb-2 text-center text-base  text-black/60}`}>
          Sign in to continue using CareerSync &nbsp;
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
            onClick={googleLogin}>
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
            onClick={githubLogin}>
            <img
              src={githubLogo}
              alt="Github"
              className="w-5 h-5"
            />

            Continue with Github
          </button>
        </div>
        {error && (<p className="text-red-600 mt-8 text-center">{error}</p>)}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t"></div>

          <span className="px-4 text-sm text-gray-500">
            OR
          </span>

          <div className="flex-1 border-t"></div>
        </div>
        <form onSubmit={handleSubmit(login)} className='mt-8'>
          <div className='space-y-5'>
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
            <Button
              type="submit"
              className="w-full"
            >Sign in</Button>
            <p className={`mt-2 text-center text-base  "text-black/60 `}>
              Don&apos;t have any account?&nbsp;
              <Link
                to="/signup"
                className={`font-medium text-primary transition-all duration-200 hover:underline text-black/60 `}
              >
                Create one
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm