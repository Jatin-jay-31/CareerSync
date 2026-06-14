import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { createJob } from "../../redux/thunks/jobThunks.js"
import { Input, Textarea, Button } from "../index.js"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form"

function JobForm({ setShowModal }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const userId = useSelector((state) => state.auth.userData?.uid)
    const dispatch = useDispatch()

    const add = async (data) => {
        try {
            await dispatch(createJob({ ...data, userId }))
            toast.success("Job created successfully")

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
            onSubmit={handleSubmit(add)}
            className="
        w-full max-w-md
        bg-white
        rounded-2xl
        p-6
        flex flex-col
        gap-5
      "
        >
            {/* HEADER */}
            <div className="text-center">
                <h2 className="text-xl font-semibold text-slate-800">
                    Add Job Application
                </h2>
                <p className="text-sm text-slate-500">
                    Track your application progress
                </p>
            </div>

            {/* COMPANY NAME */}
            <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-500">
                    Company Name
                </label>

                <Input
                    className="p-2 px-3 border border-slate-200 rounded-lg"
                    type="text"
                    placeholder="e.g. Google, Amazon"
                    {...register("companyName", {
                        required: "Company name is required",
                    })}
                />

                {errors.companyName && (
                    <p className="text-red-500 text-xs">
                        Company name is required
                    </p>
                )}
            </div>

            {/* POSITION */}
            <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-500">
                    Job Position
                </label>

                <Input
                    className="p-2 px-3 border border-slate-200 rounded-lg"
                    type="text"
                    placeholder="e.g. Frontend Developer"
                    {...register("position", {
                        required: "Position is required",
                    })}
                />

                {errors.position && (
                    <p className="text-red-500 text-xs">
                        Position is required
                    </p>
                )}
            </div>

            {/* STATUS + DATE ROW */}
            <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-500">
                        Status
                    </label>

                    <select
                        {...register("status")}
                        className="
              p-2 border border-slate-200
              rounded-lg text-sm
            "
                    >
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-500">
                        Date Applied
                    </label>

                    <Input
                        type="date"
                        className="p-2 px-3 border border-slate-200 rounded-lg"
                        {...register("dateApplied", {
                            required: "Date required",
                        })}
                    />
                </div>
            </div>

            {/* JOB LINK */}
            <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-500">
                    Job Link (optional)
                </label>

                <Input
                    className="p-2 px-3 border border-slate-200 rounded-lg"
                    type="url"
                    placeholder="https://..."
                    {...register("jobLink")}
                />
            </div>

            {/* NOTES */}
            <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-500">
                    Notes
                </label>

                <Textarea
                    className="p-2 px-3 min-h-24 border border-slate-200 rounded-lg"
                    placeholder="Add interview notes, feedback, etc..."
                    {...register("notes")}
                />
            </div>

            {/* BUTTON */}
            <Button
                type="submit"
                className="
          w-full
          bg-slate-800 text-white
          py-2.5
          rounded-lg
          hover:bg-slate-900
          transition
          active:scale-95
        "
            >
                Add Job
            </Button>
        </form>
    )
}

export default JobForm