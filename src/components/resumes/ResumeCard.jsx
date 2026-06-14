import React, { useMemo } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { deleteResume } from "../../redux/thunks/resumeThunks"
import toast from "react-hot-toast"
import { Button } from "../index"

function ResumeCard({ resume }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    if (!resume) return null

    const formatDate = (timestamp) => {
        if (!timestamp) return "N/A"

        const date = timestamp?.toDate
            ? timestamp.toDate()
            : new Date(timestamp)

        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })
    }

    const isEdited = resume.updatedAt !== resume.createdAt

    const handleDeleteResume = async () => {
        try {
            await dispatch(deleteResume(resume.id))
            toast.success("Resume deleted successfully")
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div
            className="
        w-full sm:w-[320px]
        bg-white
        rounded-2xl
        border border-slate-200
        p-5
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-200
        flex flex-col
        gap-4
      "
        >
            {/* TITLE */}
            <p className="text-lg font-semibold text-slate-800 truncate">
                {resume.resumeTitle}
            </p>

            {/* TARGET ROLE */}
            <div>
                <p className="text-xs uppercase text-slate-500 tracking-wide">
                    Target Role
                </p>
                <p className="font-medium text-slate-700">
                    {resume.targetRole}
                </p>
            </div>

            {/* SCORE */}
            <div>
                <p className="text-xs uppercase text-slate-500 tracking-wide">
                    Resume Score
                </p>

                <span
                    className="
          inline-block
          mt-1
          px-3 py-1
          rounded-full
          text-sm font-medium
          bg-green-100 text-green-700
        "
                >
                    {resume.resumeScore ?? "--"}%
                </span>
            </div>

            {/* DATE */}
            <div className="border-t pt-3 border-slate-100">
                <p className="text-xs text-slate-500">
                    {isEdited ? "Updated" : "Created"}
                </p>
                <p className="text-sm font-medium text-slate-700">
                    {formatDate(
                        isEdited ? resume.updatedAt : resume.createdAt
                    )}
                </p>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2 mt-2">
                <Button
                    className="flex-1 bg-slate-800 text-white hover:bg-slate-900"
                    onClick={() =>
                        navigate(`/resumes/analysis/${resume.id}`)
                    }
                >
                    Analyze
                </Button>

                <Button
                    className="flex-1 border border-slate-300 hover:bg-slate-50"
                    onClick={() => navigate(`/resumes/edit/${resume.id}`)}
                >
                    Edit
                </Button>

                <Button
                    className="flex-1 border border-red-200 text-red-600 hover:bg-red-50"
                    onClick={handleDeleteResume}
                >
                    Delete
                </Button>
            </div>
        </div>
    )
}

export default ResumeCard