import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteJob } from '../../redux/thunks/jobThunks'
import toast from 'react-hot-toast'
import { Button } from '../index'

function JobCard({ job }) {
  const dispatch = useDispatch()

  if (!job) return null
  const navigate = useNavigate()

  const handleDeleteJob = async () => {
    try {

      await dispatch(deleteJob(job.id));
      toast.success("Job deleted successfully");

    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <div className="
w-72
bg-white
rounded-2xl
border border-slate-200
p-5
shadow-sm
hover:shadow-lg
hover:-translate-y-1
transition-all
duration-200
">
        <p className="text-xs uppercase tracking-wide text-slate-500">
            Company Name:
          </p>
        <p className="text-lg font-semibold text-slate-800 mb-4 truncate"
        >{job.companyName}</p>
        <div className="mb-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Position:
          </p>
          <p className="font-medium text-slate-800">
            {job.position}
          </p>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Status:
          </p>
          <p className="text-lg font-semibold text-slate-800 mb-4 truncate"
          >{job.status}</p>
        </div>
        <div className="mb-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Location:
          </p>
          <span className="font-medium text-slate-800">
            {job.location}
          </span>
        </div>
        <div className="border-t border-slate-100 pt-3">
          <label htmlFor="date" className="text-xs text-slate-500"> Applied On: </label><br />
          <p className="font-medium text-slate-800" id="date"> {job.dateApplied}
          </p>
          <div className="flex gap-2 mt-4">
            <Button className="flex-1 bg-slate-800 text-white" onClick={() => navigate(`/jobs/${job.id}`)}>
              View
            </Button>
            <Button className="flex-1 border border-slate-300" onClick={() => navigate(`/jobs/edit/${job.id}`)}>
              Edit
            </Button>
            <Button className="flex-1 border border-red-300 text-red-600" onClick={() => handleDeleteJob()}>
              Delete
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default React.memo(JobCard)