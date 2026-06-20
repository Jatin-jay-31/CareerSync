import React, { useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { analyzeResume } from '../../redux/thunks/aiThunk'
import { EmptyState, Loader } from '../index'

function Analysis() {

    const { resumeId } = useParams()
    const dispatch = useDispatch()
    const navigate= useNavigate()

    const resumes =
        useSelector(state => state.resume.resumes)

    const {
        loading,
        error,
        analysis } =
        useSelector(state => state.ai)

    const resume =
        resumes.find(
            resume => resume.id === resumeId
        )

    useEffect(() => {

        if (!resume) return

        dispatch(
            analyzeResume({
                resumeId,
                resumeText: resume.resumeText,
                targetRole: resume.targetRole
            })
        )

    }, [resume, dispatch])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader />
            </div>
        )
    }

    if (error) {
        return (
            <EmptyState
                icon="⚠️"
                title="Analysis Failed"
                message={error}
            />
        )
    }

    if (!analysis) return null

    return (
        <div className="min-h-screen w-11/12 mx-auto py-8">

            {/* HEADER */}

            <div className="mb-8">

                <div className="flex items-center justify-between mb-4">

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

                    <button
                        onClick={() =>
                            dispatch(
                                analyzeResume({
                                    resumeId,
                                    resumeText: resume.resumeText,
                                    targetRole: resume.targetRole
                                })
                            )
                        }
                        className="
            px-4
            py-2
            rounded-lg
            bg-slate-800
            text-white
            hover:bg-slate-900
            transition
            "
                    >
                        🔄 Re-analyze
                    </button>

                </div>

                <h1 className="text-3xl font-bold text-slate-800">
                    Resume Analysis
                </h1>

                <p className="text-slate-500 mt-2">
                    {resume.resumeTitle}
                </p>

                <span
                    className="
        inline-block
        mt-3
        px-3
        py-1
        rounded-full
        bg-slate-100
        text-slate-700
        text-sm
        font-medium
        "
                >
                    {resume.targetRole}
                </span>

            </div>

            {/* SCORE CARDS */}

            <div className="grid md:grid-cols-3 gap-4 mb-8">

                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <p className="text-sm text-slate-500">
                        ATS Score
                    </p>

                    <p className="text-4xl font-bold mt-2">
                        {analysis.atsScore}%
                    </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <p className="text-sm text-slate-500">
                        Role Fit
                    </p>

                    <p className="text-4xl font-bold mt-2">
                        {analysis.roleFit}%
                    </p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <p className="text-sm text-slate-500">
                        Verdict
                    </p>

                    <p className="text-xl font-semibold mt-3">
                        {analysis.verdict}
                    </p>
                </div>

            </div>

            {/* KEYWORDS + SKILLS */}

            <div className="grid md:grid-cols-2 gap-6 mb-8">

                <div className="bg-white rounded-2xl border border-slate-200 p-6">

                    <h2 className="font-semibold text-lg mb-4">
                        Keywords Found
                    </h2>

                    <div className="flex flex-wrap gap-2">

                        {analysis.keywordsFound?.map((item, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm"
                            >
                                {item}
                            </span>
                        ))}

                    </div>

                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-6">

                    <h2 className="font-semibold text-lg mb-4">
                        Missing Skills
                    </h2>

                    <div className="flex flex-wrap gap-2">

                        {analysis.missingSkills?.map((item, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm"
                            >
                                {item}
                            </span>
                        ))}

                    </div>

                </div>

            </div>

            {/* STRENGTHS */}

            <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">

                <h2 className="font-semibold text-lg mb-4">
                    Strengths
                </h2>

                <ul className="space-y-3">

                    {analysis.strengths?.map((item, index) => (
                        <li key={index}>
                            ✅ {item}
                        </li>
                    ))}

                </ul>

            </div>

            {/* IMPROVEMENTS */}

            <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">

                <h2 className="font-semibold text-lg mb-4">
                    Improvements
                </h2>

                <ul className="space-y-3">

                    {analysis.improvements?.map((item, index) => (
                        <li key={index}>
                            ⚠️ {item}
                        </li>
                    ))}

                </ul>

            </div>

            {/* ACTION PLAN */}

            <div className="bg-white rounded-2xl border border-slate-200 p-6">

                <h2 className="font-semibold text-lg mb-4">
                    Action Plan
                </h2>

                <ol className="space-y-3 list-decimal list-inside">

                    {analysis.actionPlan?.map((item, index) => (
                        <li key={index}>
                            {item}
                        </li>
                    ))}

                </ol>

            </div>

        </div>
    )
}

export default Analysis