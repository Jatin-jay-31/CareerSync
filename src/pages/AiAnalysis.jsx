import React from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { EmptyState, Button } from "../components/index"

function AiAnalysis() {

    const navigate = useNavigate()

    const resumes =
        useSelector(state => state.resume.resumes)


    const analyzedResumes =
        resumes.filter(
            resume => resume.aiAnalysis
        )


    if (analyzedResumes.length === 0) {
        return (
            <div className="min-h-screen w-11/12 mx-auto py-8">

                <EmptyState
                    icon="🧠"
                    title="No Analysis Yet"
                    message="Analyze a resume to get ATS scores and AI insights."
                    buttonText="Go To Resumes"
                    onButtonClick={() =>
                        navigate("/resumes")
                    }
                />

            </div>
        )
    }

    const totalAnalyses =
        analyzedResumes.length

    const avgATS =
        Math.round(
            analyzedResumes.reduce(
                (sum, resume) =>
                    sum + resume.aiAnalysis.atsScore,
                0
            ) / totalAnalyses
        )

    const bestResume =
        analyzedResumes.reduce(
            (best, current) =>
                !best ||
                current.aiAnalysis.atsScore >
                best.aiAnalysis.atsScore
                    ? current
                    : best,
            null
        )

    const latestAnalysis =
        [...analyzedResumes]
            .sort(
                (a, b) =>
                    new Date(
                        b.aiAnalysis.analyzedAt || 0
                    ) -
                    new Date(
                        a.aiAnalysis.analyzedAt || 0
                    )
            )[0]

    return (
        <div className="min-h-screen w-11/12 mx-auto py-8">

            {/* HEADER */}

            <div className="mb-8">

                <h1 className="text-3xl font-bold text-slate-800">
                    AI Analysis Dashboard
                </h1>

                <p className="text-slate-500 mt-2">
                    Resume intelligence overview
                </p>

            </div>

            {/* STATS */}

            <div className="grid md:grid-cols-3 gap-4 mb-8">

                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

                    <p className="text-slate-500">
                        Analyses Completed
                    </p>

                    <p className="text-4xl font-bold mt-2">
                        {totalAnalyses}
                    </p>

                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

                    <p className="text-slate-500">
                        Average ATS Score
                    </p>

                    <p className="text-4xl font-bold mt-2">
                        {avgATS}%
                    </p>

                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

                    <p className="text-slate-500">
                        Best ATS Score
                    </p>

                    <p className="text-4xl font-bold mt-2">
                        {bestResume?.aiAnalysis?.atsScore || 0}%
                    </p>

                </div>

            </div>

            {/* BEST RESUME */}

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">

                <h2 className="text-xl font-semibold mb-4">
                    🏆 Best Performing Resume
                </h2>

                <p className="font-medium text-slate-800">
                    {bestResume.resumeTitle}
                </p>

                <p className="text-slate-500 mt-2">
                    ATS Score: {bestResume.aiAnalysis.atsScore}%
                </p>

                <p className="text-slate-500">
                    Role Fit: {bestResume.aiAnalysis.roleFit}%
                </p>

                <Button
                    onClick={() =>
                        navigate(
                            `/resumes/ai-analysis/${bestResume.id}`
                        )
                    }
                    className="mt-4 bg-slate-800 text-white"
                >
                    View Analysis
                </Button>

            </div>

            {/* LATEST ANALYSIS */}

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">

                <h2 className="text-xl font-semibold mb-4">
                    📌 Latest Analysis
                </h2>

                <p className="font-medium text-slate-800">
                    {latestAnalysis.resumeTitle}
                </p>

                <p className="text-slate-500 mt-2">
                    Verdict: {latestAnalysis.aiAnalysis.verdict}
                </p>

                <Button
                    onClick={() =>
                        navigate(
                            `/resumes/ai-analysis/${latestAnalysis.id}`
                        )
                    }
                    className="mt-4 bg-slate-800 text-white"
                >
                    Open Analysis
                </Button>

            </div>

            {/* HISTORY */}

            <div>

                <h2 className="text-xl font-semibold mb-4">
                    Recent Analyses
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

                    {analyzedResumes.map((resume) => (

                        <div
                            key={resume.id}
                            className="
                            bg-white
                            rounded-2xl
                            border
                            border-slate-200
                            p-5
                            shadow-sm
                            "
                        >

                            <p className="font-semibold text-slate-800">
                                {resume.resumeTitle}
                            </p>

                            <p className="text-sm text-slate-500 mt-2">
                                ATS Score:
                                {" "}
                                {resume.aiAnalysis.atsScore}%
                            </p>

                            <p className="text-sm text-slate-500">
                                Role Fit:
                                {" "}
                                {resume.aiAnalysis.roleFit}%
                            </p>

                            <p className="text-sm mt-2 font-medium">
                                {resume.aiAnalysis.verdict}
                            </p>

                            <Button
                                onClick={() =>
                                    navigate(
                                        `/resumes/ai-analysis/${resume.id}`
                                    )
                                }
                                className="mt-4 w-full bg-slate-800 text-white"
                            >
                                View Analysis
                            </Button>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    )
}

export default AiAnalysis