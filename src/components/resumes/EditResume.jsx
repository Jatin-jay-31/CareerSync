import React, { useEffect } from "react"
import { useParams,useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { Button, Input, Textarea } from "../index"
import { updateResume } from "../../redux/thunks/resumeThunks"
import toast from "react-hot-toast"

function ResumeEditPage() {
    const { resumeId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const resumes = useSelector((state) => state.resume.resumes)
    const resume = resumes.find((r) => r.id === resumeId)

    const {
        register,
        handleSubmit,
        reset,
    } = useForm()

    useEffect(() => {
        if (resume) {
            reset({
                resumeTitle: resume.resumeTitle,
                targetRole: resume.targetRole,
                resumeText: resume.resumeText || "",
            })
        }
    }, [resume, reset])

    const onSave = async (data) => {
        try {
            await dispatch(
                updateResume({
                    resumeId,
                    updatedData: data,
                })
            )

            toast.success("Resume updated successfully")
            navigate('/resumes')
        } catch (err) {
            toast.error(err.message)
        }
    }

    if (!resume) {
        return (
            <div className="text-center mt-10 text-slate-500">
                Loading resume...
            </div>
        )
    }

    return (
        <div className="min-h-screen w-11/12 mx-auto py-8">

            {/* HEADER */}
            <div className="mb-6">
                <button
                        onClick={() => navigate("/resumes")}
                        className="
            flex
            items-center
            gap-2
            text-slate-500
            hover:text-slate-900
            transition
            font-medium
            "
                    >
                        ← Back to Resumes
                    </button>
                <h1 className="text-2xl font-bold text-slate-800">
                    Resume Editor
                </h1>
                <p className="text-sm text-slate-500">
                    Edit and preview your resume in real-time
                </p>
            </div>

            {/* MAIN LAYOUT */}
            <div className="flex flex-col md:flex-row gap-6">

                {/* LEFT → PREVIEW (PDF + TEXT) */}
                <div className="md:w-1/2 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">

                    <h2 className="text-sm text-slate-500 mb-3">
                        Resume Preview
                    </h2>

                    {/* PDF PREVIEW (IMPORTANT FIX) */}
                    {resume.resumeFileUrl ? (
                        <iframe
                            src={resume.resumeFileUrl}
                            className="w-full h-[500px] rounded-lg border mb-4"
                        />
                    ) : (
                        <p className="text-slate-400 mb-4">
                            No PDF uploaded
                        </p>
                    )}

                    {/* TEXT PREVIEW */}
                    <div className="space-y-3">
                        <p className="text-lg font-semibold text-slate-800">
                            {resume.resumeTitle}
                        </p>

                        <p className="text-slate-600">
                            <span className="font-medium">Target Role:</span>{" "}
                            {resume.targetRole}
                        </p>

                        <div className="text-sm text-slate-500 whitespace-pre-wrap mt-4">
                            {resume.resumeText || "No text available"}
                        </div>
                    </div>
                </div>

                {/* RIGHT → EDIT FORM */}
                <div className="md:w-1/2">

                    <form
                        onSubmit={handleSubmit(onSave)}
                        className="
                            bg-white
                            border border-slate-200
                            rounded-xl
                            p-6
                            shadow-sm
                            flex flex-col gap-5
                        "
                    >

                        <h2 className="text-sm text-slate-500">
                            Edit Resume Details
                        </h2>

                        {/* TITLE */}
                        <Input
                            placeholder="Resume Title"
                            className="p-2 px-3 border rounded-lg"
                            {...register("resumeTitle")}
                        />

                        {/* ROLE */}
                        <Input
                            placeholder="Target Role"
                            className="p-2 px-3 border rounded-lg"
                            {...register("targetRole")}
                        />

                        {/* TEXT */}
                        <Textarea
                            placeholder="Resume Notes / Content"
                            className="p-2 px-3 min-h-32 border rounded-lg"
                            {...register("resumeText")}
                        />

                        {/* SAVE */}
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
                            Save Changes
                        </Button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResumeEditPage