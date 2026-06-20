import React from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Button } from "../components"

function Dashboard() {

    const navigate = useNavigate()

    const jobs =
        useSelector(state => state.job.jobs)

    const resumes =
        useSelector(state => state.resume.resumes)

    const analyzedResumes =
        resumes.filter(
            resume => resume.aiAnalysis
        )

    const appliedJobs =
        jobs.filter(job => job.status === "Applied")

    const interviewJobs =
        jobs.filter(job => job.status === "Interview")

    const offerJobs =
        jobs.filter(job => job.status === "Offer")

    const rejectedJobs =
        jobs.filter(job => job.status === "Rejected")

    const latestJob =
        jobs.length > 0
            ? jobs[jobs.length - 1]
            : null

    const latestResume =
        resumes.length > 0
            ? resumes[resumes.length - 1]
            : null

    const averageATS =
        analyzedResumes.length > 0
            ? Math.round(
                analyzedResumes.reduce(
                    (acc, resume) =>
                        acc + (resume.aiAnalysis?.atsScore || 0),
                    0
                ) / analyzedResumes.length
            )
            : 0

    return (
        <div className="min-h-screen w-11/12 mx-auto py-8">

            {/* Header */}

            <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">

                <div>
                    <h1 className="text-3xl font-bold text-slate-800">
                        Dashboard
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Track jobs, resumes and AI insights in one place.
                    </p>
                </div>

                <div className="flex gap-3">

                    <Button
                        onClick={() => navigate("/jobs")}
                        className="bg-slate-800 text-white"
                    >
                        Jobs
                    </Button>

                    <Button
                        onClick={() => navigate("/resumes")}
                        className="bg-slate-800 text-white"
                    >
                        Resumes
                    </Button>

                </div>

            </div>

            {/* Stats */}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

                <div className="bg-white border rounded-2xl p-5 shadow-sm">
                    <p className="text-slate-500 text-sm">
                        Total Jobs
                    </p>

                    <p className="text-4xl font-bold mt-2">
                        {jobs.length}
                    </p>
                </div>

                <div className="bg-white border rounded-2xl p-5 shadow-sm">
                    <p className="text-slate-500 text-sm">
                        Resumes
                    </p>

                    <p className="text-4xl font-bold mt-2">
                        {resumes.length}
                    </p>
                </div>

                <div className="bg-white border rounded-2xl p-5 shadow-sm">
                    <p className="text-slate-500 text-sm">
                        AI Analyses
                    </p>

                    <p className="text-4xl font-bold mt-2">
                        {analyzedResumes.length}
                    </p>
                </div>

                <div className="bg-white border rounded-2xl p-5 shadow-sm">
                    <p className="text-slate-500 text-sm">
                        Avg ATS
                    </p>

                    <p className="text-4xl font-bold mt-2 text-green-600">
                        {averageATS}%
                    </p>
                </div>

            </div>

            {/* Job Pipeline */}

            <div className="mb-8">

                <h2 className="text-xl font-semibold mb-4">
                    Job Pipeline
                </h2>

                <div className="grid md:grid-cols-4 gap-4">

                    <div className="bg-blue-50 border rounded-2xl p-5">
                        <p>Applied</p>
                        <p className="text-3xl font-bold">
                            {appliedJobs.length}
                        </p>
                    </div>

                    <div className="bg-amber-50 border rounded-2xl p-5">
                        <p>Interview</p>
                        <p className="text-3xl font-bold">
                            {interviewJobs.length}
                        </p>
                    </div>

                    <div className="bg-green-50 border rounded-2xl p-5">
                        <p>Offer</p>
                        <p className="text-3xl font-bold">
                            {offerJobs.length}
                        </p>
                    </div>

                    <div className="bg-red-50 border rounded-2xl p-5">
                        <p>Rejected</p>
                        <p className="text-3xl font-bold">
                            {rejectedJobs.length}
                        </p>
                    </div>

                </div>

            </div>

            {/* Recent Activity */}

            <div className="grid lg:grid-cols-2 gap-6">

                <div className="bg-white border rounded-2xl p-6 shadow-sm">

                    <h2 className="text-lg font-semibold mb-4">
                        Latest Job
                    </h2>

                    {latestJob ? (
                        <>
                            <p className="font-semibold">
                                {latestJob.companyName}
                            </p>

                            <p className="text-slate-500">
                                {latestJob.position}
                            </p>

                            <p className="mt-3">
                                Status:
                                <span className="font-medium ml-2">
                                    {latestJob.status}
                                </span>
                            </p>

                            <Button
                                className="mt-4 bg-slate-800 text-white"
                                onClick={() => navigate("/jobs")}
                            >
                                View Jobs
                            </Button>
                        </>
                    ) : (
                        <p className="text-slate-500">
                            No jobs added yet.
                        </p>
                    )}

                </div>

                <div className="bg-white border rounded-2xl p-6 shadow-sm">

                    <h2 className="text-lg font-semibold mb-4">
                        Latest Resume
                    </h2>

                    {latestResume ? (
                        <>
                            <p className="font-semibold">
                                {latestResume.resumeTitle}
                            </p>

                            <p className="text-slate-500">
                                {latestResume.targetRole}
                            </p>

                            {latestResume.aiAnalysis && (
                                <p className="mt-3">
                                    ATS:
                                    <span className="font-medium ml-2">
                                        {latestResume.aiAnalysis.atsScore}%
                                    </span>
                                </p>
                            )}

                            <Button
                                className="mt-4 bg-slate-800 text-white"
                                onClick={() => navigate("/resumes")}
                            >
                                View Resumes
                            </Button>
                        </>
                    ) : (
                        <p className="text-slate-500">
                            No resumes uploaded yet.
                        </p>
                    )}

                </div>

            </div>

            {/* Action Center */}

            <div className="mt-8 bg-white border rounded-2xl p-6 shadow-sm">

                <h2 className="text-lg font-semibold mb-4">
                    Action Center
                </h2>

                <ul className="space-y-3 text-slate-700">

                    {jobs.length === 0 && (
                        <li>
                            ➜ Add your first job application.
                        </li>
                    )}

                    {resumes.length === 0 && (
                        <li>
                            ➜ Upload your first resume.
                        </li>
                    )}

                    {resumes.length > 0 &&
                        analyzedResumes.length === 0 && (
                            <li>
                                ➜ Analyze a resume to unlock AI insights.
                            </li>
                        )}

                    {analyzedResumes.some(
                        resume =>
                            resume.aiAnalysis?.atsScore < 70
                    ) && (
                            <li>
                                ➜ Some resumes have ATS score below 70%.
                            </li>
                        )}

                </ul>

            </div>

        </div>
    )
}

export default Dashboard