import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { ResumeCard, EmptyState } from "../index"
import { setSearchTerm, setSortBy } from "../../redux/slices/uiSlice"

function ResumesList({ setShowModal, handleUploadResume }) {
    const dispatch = useDispatch()

    const search = useSelector((state) => state.ui.searchTerm)
    const sortBy = useSelector((state) => state.ui.sortBy)
    const resumes = useSelector((state) => state.resume.resumes)

    const clearFilters = () => {
        dispatch(setSearchTerm(""))
        dispatch(setSortBy("Latest"))
    }

    const getResumeList = () => {
        const filtered = resumes.filter((resume) => {
            if (!resume) return false

            const matchesSearch =
                search === "" ||
                resume.resumeTitle?.toLowerCase().includes(search.toLowerCase()) ||
                resume.targetRole?.toLowerCase().includes(search.toLowerCase())

            return matchesSearch
        })

        const sorted = [...filtered].sort((a, b) => {
            if (sortBy === "Latest") {
                return new Date(b.createdAt) - new Date(a.createdAt)
            }

            if (sortBy === "Oldest") {
                return new Date(a.createdAt) - new Date(b.createdAt)
            }

            if (sortBy === "A-Z") {
                return a.resumeTitle.localeCompare(b.resumeTitle)
            }

            if (sortBy === "Z-A") {
                return b.resumeTitle.localeCompare(a.resumeTitle)
            }

            return 0
        })

        return sorted
    }

    const finalResumes = getResumeList()

    const isSearching = search.trim() !== ""

    return (
        <div className="w-full flex flex-col gap-4">
            {/* EMPTY: NO RESUMES */}
            {resumes.length === 0 ? (
                <EmptyState
                    icon="📄"
                    title="No Resumes Yet"
                    message="Upload your first resume to start tracking applications."
                    buttonText="Upload Resume"
                    onButtonClick={handleUploadResume}
                />
            ) : /* EMPTY: SEARCH / FILTER RESULT */
                finalResumes.length === 0 ? (
                    <EmptyState
                        icon="🔍"
                        title={isSearching ? "No Results Found" : "No Matches Found"}
                        message={
                            isSearching
                                ? "Try different keywords."
                                : "Try changing filters or sorting."
                        }
                        buttonText="Clear Filters"
                        onButtonClick={clearFilters}
                    />
                ) : (
                    /* RESUME LIST */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {finalResumes.map((resume) => (
                            <ResumeCard key={resume.id} resume={resume} />
                        ))}
                    </div>
                )}
        </div>
    )
}

export default ResumesList