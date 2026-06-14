import React, { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import EmptyState from '../ui/EmptyState'
import JobCard from './JobCard'
import { setJobFilter, setSearchTerm, setSortBy } from '../../redux/slices/uiSlice'

function JobList({ selectedJob, setSelectedJob, setShowModal, handleCreateJob }) {
    const search = useSelector((state) => state.ui.searchTerm)
    const sortBy = useSelector((state) => state.ui.sortBy)
    const jobFilter = useSelector((state) => state.ui.jobFilter)
    const jobs = useSelector((state) => state.job.jobs)
    const dispatch = useDispatch()
    const clearFilters = () => {
        dispatch(setJobFilter("All"))
        dispatch(setSearchTerm(""))
        dispatch(setSortBy("Latest"))
    }

    function getJobsList() {

        const filteredJobs = jobs.filter((job) => {
            if (!job) return false
            const matchesSearch =
                search === "" ||
                job.companyName
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                job.position
                    .toLowerCase()
                    .includes(search.toLowerCase())

            const matchesStatus =
                jobFilter === "All" ||
                job.status?.trim().toLowerCase() === jobFilter.trim().toLowerCase()

            return matchesSearch && matchesStatus
        })

        const sortedJobs = [...filteredJobs].sort((a, b) => {

            if (sortBy === 'Latest') {
                return new Date(b.createdAt) - new Date(a.createdAt)
            }

            else if (sortBy === 'Oldest') {
                return new Date(a.createdAt) - new Date(b.createdAt)
            }

            else if (sortBy === 'A-Z') {
                return a.companyName.localeCompare(b.companyName)
            }

            else if (sortBy === 'Z-A') {
                return b.companyName.localeCompare(a.companyName)
            }

            return 0
        })

        return sortedJobs
    }

    const finalJobs = getJobsList()

    return (
        <>
            {jobs.length === 0 ? (
                <EmptyState
                    icon="📝"
                    title="No Jobs Yet"
                    message="Start tracking your job applications."
                    buttonText="Create First Job"
                    onButtonClick={handleCreateJob}
                />
            ) : finalJobs.length === 0 ? (
                <EmptyState
                    icon="🔍"
                    title="No Matches Found"
                    message="Try changing your search or filter."
                    buttonText="Clear Filters"
                    onButtonClick={clearFilters}
                />
            ) : (
                finalJobs.map((job) => (
                    <JobCard
                        key={job.id}
                        job={job}
                        selectedJob={selectedJob}
                        setSelectedJob={setSelectedJob}
                    />
                ))
            )}
        </>
    )
}

export default JobList