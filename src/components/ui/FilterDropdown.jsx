import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setJobFilter } from "../../redux/slices/uiSlice"

function FilterDropdown() {
  const dispatch = useDispatch()
  const jobFilter = useSelector((state) => state.ui.jobFilter)

  const handleChange = (e) => {
    dispatch(setJobFilter(e.target.value))
  }

  return (
    <div className="flex items-center gap-3">
      
      {/* Label */}
      <span className="text-sm font-medium text-slate-600">
        Filter:
      </span>

      {/* Modern styled select */}
      <div className="relative">
        <select
          value={jobFilter}
          onChange={handleChange}
          className="
            appearance-none
            bg-white
            border border-slate-200
            text-slate-700
            text-sm
            font-medium
            px-4 py-2
            pr-10
            rounded-xl
            shadow-sm
            hover:border-slate-300
            focus:outline-none
            focus:ring-2
            focus:ring-slate-200
            transition
            cursor-pointer
          "
        >
          <option value="All">All Jobs</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

        {/* custom arrow */}
        <div className="
          absolute right-3 top-1/2 -translate-y-1/2
          pointer-events-none text-slate-400
        ">
          ▼
        </div>
      </div>

    </div>
  )
}

export default FilterDropdown