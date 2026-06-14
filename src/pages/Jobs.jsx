import React, { useState, useEffect } from "react";
import {
  Button,
  SearchBar,
  JobForm,
  JobList,
  Modal,
  EmptyState,
  FilterDropdown,
} from "../components/index.js";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchJobs } from "../redux/thunks/jobThunks.js";

function Jobs() {
  const userId = useSelector((state) => state.auth.userData?.uid);
  const jobs = useSelector((state) => state.job.jobs);
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const appliedCount = jobs.filter(job => job.status === "Applied").length
  const interviewCount = jobs.filter(job => job.status === "Interview").length
  const offerCount = jobs.filter(job => job.status === "Offer").length
  const rejectedCount = jobs.filter(job => job.status === "Rejected").length

  const [showModal, setShowModal] = useState(false);

  const handleCreateJob = () => {
    if (authStatus) {
      setShowModal(true);
    } else {
      navigate("/signup", {
        state: {
          fromCreateJob: true,
        },
      });
    }
  };

  useEffect(() => {
    if (location.state?.openCreate) {
      setShowModal(true);

      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    if (!userId) return;

    dispatch(fetchJobs(userId));
  }, [userId, dispatch]);

  return (
    <div className="min-h-screen py-8 w-11/12 mx-auto">

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 mb-6">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Job Applications
          </h1>

          <p className="text-slate-500 mt-1">
            Track applications, interviews and offers.
          </p>

          {jobs.length > 0 && (
            <p className="text-sm text-slate-400 mt-2">
              {jobs.length} Job{jobs.length !== 1 ? "s" : ""} Tracked
            </p>
          )}
        </div>

        {jobs.length > 0 && (
          <Button
            onClick={handleCreateJob}
            className="
      bg-slate-800
      text-white
      px-5
      py-2.5
      rounded-lg
      hover:bg-slate-700
      transition
    "
          >
            + Add Job
          </Button>
        )}

      </div>
      {jobs.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 mb-6">

          <div className="bg-white border rounded-xl p-4 shadow-sm">
            <p className="text-sm text-slate-500">Applied</p>
            <h3 className="text-2xl font-bold">{appliedCount}</h3>
          </div>

          <div className="bg-white border rounded-xl p-4 shadow-sm">
            <p className="text-sm text-slate-500">Interview</p>
            <h3 className="text-2xl font-bold">{interviewCount}</h3>
          </div>

          <div className="bg-white border rounded-xl p-4 shadow-sm">
            <p className="text-sm text-slate-500">Offers</p>
            <h3 className="text-2xl font-bold">{offerCount}</h3>
          </div>

          <div className="bg-white border rounded-xl p-4 shadow-sm">
            <p className="text-sm text-slate-500">Rejected</p>
            <h3 className="text-2xl font-bold">{rejectedCount}</h3>
          </div>

        </div>
      )}

      {jobs.length > 0 && (
        <div className="px-4 mb-6 space-y-4">
          <SearchBar />
          <FilterDropdown />
        </div>
      )}

      {/* Empty State */}
      {jobs.length === 0 && (
        <EmptyState
          icon="📝"
          title="No Jobs Yet"
          message="Start tracking your job applications."
          buttonText="Create First Job"
          onButtonClick={handleCreateJob}
        />
      )}

      {/* Jobs Grid */}
      {jobs.length > 0 && (
        <div className="flex flex-wrap justify-center md:justify-start gap-4 px-4">
          <JobList
            setShowModal={setShowModal}
            handleCreateJob={handleCreateJob}
          />
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <JobForm setShowModal={setShowModal} />
        </Modal>
      )}

    </div>
  );
}

export default Jobs;