import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Button, Textarea } from '../index'

function JobDetails() {
    const { jobId } = useParams()
    const jobs = useSelector((state) => state.job.jobs)
    const job = jobs.find(
        (job) => job.id === jobId
    )
    const dispatch = useDispatch()

    if (!job) return null
    const navigate = useNavigate()

    return (
        <div className="max-w-4xl mx-auto p-6">

            {/* Back Button */}
            <button
                onClick={() => navigate("/jobs")}
                className="mb-6 text-slate-600 hover:text-slate-900 font-medium"
            >
                ← Back to Jobs
            </button>

            {/* Main Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">

                {/* Header */}
                <div className="border-b border-slate-200 pb-6">
                    <h1 className="text-3xl font-bold text-slate-800">
                        {job.companyName}
                    </h1>

                    <p className="text-lg text-slate-600 mt-2">
                        {job.position}
                    </p>

                    <span
                        className="
          inline-block
          mt-4
          px-3
          py-1
          rounded-full
          bg-blue-100
          text-blue-700
          text-sm
          font-medium
        "
                    >
                        {job.status}
                    </span>
                </div>

                {/* Details Grid */}
                <div className="grid md:grid-cols-2 gap-6 mt-8">

                    <div>
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                            Location
                        </p>

                        <p className="mt-1 text-slate-800 font-medium">
                            {job.location || "Not specified"}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                            Applied On
                        </p>

                        <p className="mt-1 text-slate-800 font-medium">
                            {job.dateApplied || "Not specified"}
                        </p>
                    </div>

                </div>

                {/* Job Link */}
                <div className="mt-8">

                    <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">
                        Job Posting
                    </p>

                    {job.jobLink ? (
                        <a
                            href={job.jobLink}
                            target="_blank"
                            rel="noreferrer"
                            className="
            text-blue-600
            hover:text-blue-800
            underline
            break-all
          "
                        >
                            Open Job Posting
                        </a>
                    ) : (
                        <p className="text-slate-500">
                            No link provided
                        </p>
                    )}

                </div>

                {/* Notes */}
                <div className="mt-8">

                    <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">
                        Notes
                    </p>

                    <div
                        className="
          bg-slate-50
          border
          border-slate-200
          rounded-xl
          p-4
          min-h-[120px]
          text-slate-700
          whitespace-pre-wrap
        "
                    >
                        {job.notes || "No notes added."}
                    </div>

                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 flex justify-center border-t border-slate-200">
                    <Button
                        className="border border-slate-300"
                        onClick={() => navigate("/jobs")}
                    >
                        Back
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default JobDetails