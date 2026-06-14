import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateJob } from "../../redux/thunks/jobThunks.js"
import { Button, Input, Textarea } from "../index.js"
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form"

function EditJob() {
    const { jobId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const jobs = useSelector((state) => state.job.jobs)
    const job = jobs.find((job) => job.id === jobId)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    useEffect(() => {
        if (job) {
            reset({
                companyName: job.companyName,
                position: job.position,
                jobLink: job.jobLink,
                notes: job.notes,
                dateApplied: job.dateApplied,
                location: job.location,
                status: job.status,
            })
        }
    }, [job, reset])

    const update = async (data) => {
        try {
            await dispatch(
                updateJob({
                    jobId,
                    updatedData: data,
                })
            )

            toast.success("Job updated successfully")
            navigate("/jobs")

        } catch (error) {
            toast.error(error.message)
        }
    }

    if (!job) {
        return (
            <div className="text-center mt-10 text-slate-500">
                Loading job...
            </div>
        )
    }

    return (
    <div className="min-h-screen w-full px-6 py-8">

        {/* HEADER */}
        <div className="mb-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-800">
                Edit Job
            </h1>
            <p className="text-sm text-slate-500">
                Update job details and tracking information
            </p>
        </div>

        {/* MAIN GRID */}
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">

            {/* FORM (WIDER) */}
            <form
                onSubmit={handleSubmit(update)}
                className="
                    flex-1
                    bg-white
                    border border-slate-200
                    rounded-2xl
                    p-6
                    shadow-sm
                    flex flex-col gap-5
                "
            >

                {/* HEADER */}
                <div>
                    <h2 className="text-lg font-semibold text-slate-800">
                        Job Details
                    </h2>
                    <p className="text-xs text-slate-500">
                        Modify application information
                    </p>
                </div>

                {/* Company */}
                <Input
                    className="p-2 px-3 border rounded-lg"
                    placeholder="Company Name"
                    {...register("companyName", {
                        required: "Company name is required",
                    })}
                />

                {/* Position */}
                <Input
                    className="p-2 px-3 border rounded-lg"
                    placeholder="Position"
                    {...register("position", {
                        required: "Position is required",
                    })}
                />

                {/* STATUS */}
                <select
                    {...register("status")}
                    className="
                        p-2
                        border border-slate-200
                        rounded-lg
                        text-sm
                    "
                >
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                </select>

                {/* Job Link */}
                <Input
                    className="p-2 px-3 border rounded-lg"
                    placeholder="Job Link"
                    {...register("jobLink")}
                />

                {/* Notes */}
                <Textarea
                    className="p-2 px-3 min-h-32 border rounded-lg"
                    placeholder="Notes"
                    {...register("notes")}
                />

                {/* DATE + LOCATION GRID */}
                <div className="grid grid-cols-2 gap-4">

                    <Input
                        type="date"
                        className="p-2 px-3 border rounded-lg"
                        {...register("dateApplied")}
                    />

                    <Input
                        className="p-2 px-3 border rounded-lg"
                        placeholder="Location"
                        {...register("location")}
                    />
                </div>

                {/* BUTTON */}
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
                    "
                >
                    Save Changes
                </Button>

            </form>

        </div>
    </div>
)
}

export default EditJob