import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { uploadResume } from "../../redux/thunks/resumeThunks.js"
import { Button, Input,Textarea } from "../index.js"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form"

function ResumeUpload({ setShowModal }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const userId = useSelector((state) => state.auth.userData?.uid)
    const dispatch = useDispatch()

    const upload = async (data) => {
        try {
            await dispatch(uploadResume({ ...data, userId }))
            toast.success("Resume uploaded successfully")

            reset()

            if (setShowModal) {
                setShowModal(false)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <form
            onSubmit={handleSubmit(upload)}
            className="
        w-full max-w-md
        bg-white
        rounded-2xl
        p-6
        flex flex-col
        gap-5
      "
        >
            {/* TITLE */}
            <div className="text-center">
                <h2 className="text-xl font-semibold text-slate-800">
                    Upload Resume
                </h2>
                <p className="text-sm text-slate-500">
                    Add your resume for AI analysis
                </p>
            </div>

            {/* FILE INPUT */}
            <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-500">
                    Resume File (PDF)
                </label>

                <input
                    type="file"
                    accept=".pdf"
                    className="
            w-full
            border border-slate-200
            rounded-lg
            p-2
            text-sm
            file:mr-3 file:px-3 file:py-1
            file:border-0
            file:bg-slate-800
            file:text-white
            file:rounded-md
            file:cursor-pointer
          "
                    {...register("resumeFile", {
                        required: "Resume PDF is required",
                    })}
                />

                {errors.resumeFile && (
                    <p className="text-red-500 text-xs">
                        Resume PDF is required
                    </p>
                )}
            </div>

            {/* RESUME TITLE */}
            <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-500">
                    Resume Name
                </label>

                <Input
                    className="p-2 px-3 border border-slate-200 rounded-lg"
                    type="text"
                    placeholder="e.g. Frontend Developer Resume"
                    {...register("resumeTitle", {
                        required: "Resume name is required",
                    })}
                />

                {errors.resumeTitle && (
                    <p className="text-red-500 text-xs">
                        Resume name is required
                    </p>
                )}
            </div>

            {/* TARGET ROLE */}
            <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-500">
                    Target Role
                </label>

                <Input
                    className="p-2 px-3 border border-slate-200 rounded-lg"
                    placeholder="e.g. Frontend Developer"
                    {...register("targetRole", {
                        required: "Role is required",
                    })}
                />

                {errors.targetRole && (
                    <p className="text-red-500 text-xs">
                        Role is required
                    </p>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-500">
                    Notes
                </label>

                <Textarea
                    className="p-2 px-3 min-h-24 border border-slate-200 rounded-lg"
                    placeholder="Add resume notes or extracted text..."
                    {...register("resumeText")}
                />

                {errors.targetRole && (
                    <p className="text-red-500 text-xs">
                        Role is required
                    </p>
                )}
            </div>

            {/* BUTTON */}
            <div className="flex justify-center pt-2">
                <Button
                    type="submit"
                    className="
            w-full
            bg-slate-800
            text-white
            py-2.5
            rounded-lg
            hover:bg-slate-900
            transition
            active:scale-95
          "
                >
                    Upload Resume
                </Button>
            </div>
        </form>
    )
}

export default ResumeUpload