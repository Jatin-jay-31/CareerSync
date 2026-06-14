import React from "react"
import { setSortBy } from "../../redux/slices/uiSlice"
import { useSelector, useDispatch } from "react-redux"

function SortDropdown() {
  const dispatch = useDispatch()
  const sortBy = useSelector((state) => state.ui.sortBy)

  const sortJob = (e) => {
    dispatch(setSortBy(e.target.value))
  }

  return (
    <div className="flex items-center gap-3">
      
      {/* Label */}
      <span className="text-sm font-medium text-slate-600">
        Sort:
      </span>

      {/* Styled select (same design system as filter) */}
      <div className="relative">
        <select
          name="sortType"
          id="sortType"
          value={sortBy}
          onChange={sortJob}
          className="
            appearance-none
            w-full sm:w-auto
            bg-white
            border border-slate-200
            text-slate-700
            text-sm font-medium
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
          <option value="Latest">Latest</option>
          <option value="Oldest">Oldest</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
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

export default SortDropdown