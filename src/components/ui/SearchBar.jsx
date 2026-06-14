import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button,SortDropdown } from '../index'
import { setSearchTerm } from '../../redux/slices/uiSlice'

function SearchBar() {
    const dispatch = useDispatch()
    const searchTerm=useSelector((state)=> state.ui.searchTerm)
    const searchJob = (e) => {
        dispatch(setSearchTerm(e.target.value))
    }


    return (
        <>
            <div
                className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full overflow-hidden border border-slate-700  bg-white
       transition-all duration-200 rounded-2xl p-2`}
            >

                <input
                    type="text"
                    placeholder="Search a job.."
                    className={`p-3 outline-none flex-1 min-w-0 bg-transparent rounded-xl transition-all duration-200 focus:ring-2 focus:ring-blue-300   text-slate-700 placeholder:text-slate-500
            `}
                    value={searchTerm}
                    onChange={searchJob}
                />
                <SortDropdown/>
            </div>
        </>
    )
}

export default SearchBar