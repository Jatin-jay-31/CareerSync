import React, { useState, useEffect } from "react"
import {
  Button,
  SearchBar,
  ResumeUpload,
  ResumesList,
  Modal,
  EmptyState,
} from "../components/index.js"

import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { fetchResumes } from "../redux/thunks/resumeThunks.js"

function Resumes() {
  const userId = useSelector((state) => state.auth.userData?.uid)
  const resumes = useSelector((state) => state.resume.resumes)
  const loading = useSelector((state) => state.resume.loading)
  const authStatus = useSelector((state) => state.auth.status)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const [showModal, setShowModal] = useState(false)

  const handleUploadResume = () => {
    if (authStatus) {
      setShowModal(true)
    } else {
      navigate("/signup")
    }
  }

  useEffect(() => {
    if (location.state?.openCreate) {
      setShowModal(true)
      window.history.replaceState({}, document.title)
    }
  }, [location.state])

  useEffect(() => {
    if (!userId) return
    dispatch(fetchResumes(userId))
  }, [userId, dispatch])

  return (
    <div className="min-h-screen py-8 w-11/12 mx-auto">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 mb-6">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            My Resumes
          </h1>

          <p className="text-slate-500 mt-1">
            Manage, track and improve your resumes
          </p>

          {!loading && resumes.length > 0 && (
            <p className="text-sm text-slate-400 mt-2">
              {resumes.length} Resume{resumes.length !== 1 ? "s" : ""} uploaded
            </p>
          )}
        </div>

        {/* CTA always visible */}
        <Button
          onClick={handleUploadResume}
          className="
            bg-slate-800 text-white px-5 py-2.5 rounded-lg
            hover:bg-slate-700 transition
          "
        >
          + Add Resume
        </Button>
      </div>

      {/* SEARCH BAR ALWAYS VISIBLE */}
      {!loading && resumes.length > 0 && (
        <div className="px-4 mb-6">
          <SearchBar />
        </div>
      )}

      {/* LOADING STATE */}
      {loading && (
        <div className="px-4 text-slate-500 animate-pulse">
          Loading resumes...
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && resumes.length === 0 && (
        <EmptyState
          icon="📄"
          title="No Resumes Yet"
          message="Upload your first resume to start tracking applications."
          buttonText="Upload Resume"
          onButtonClick={handleUploadResume}
        />
      )}

      {/* LIST */}
      {!loading && resumes.length > 0 && (
        <div className="flex flex-wrap gap-4 px-4">
          <ResumesList
            setShowModal={setShowModal}
            handleUploadResume={handleUploadResume}
          />
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ResumeUpload setShowModal={setShowModal} />
        </Modal>
      )}

    </div>
  )
}

export default Resumes