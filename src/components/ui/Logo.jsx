import React from 'react'
import { useNavigate } from 'react-router-dom'
import notesIcon from '../../assets/job-portal.png'

function Logo() {
  const navigate=useNavigate()
  const navItem={
            name: 'Home',
            path: '/',
            active: true
        }
  return (
    <>
    <div className='flex items-center'>
        <div className='w-10 mx-2 '>
      <span> <img src={notesIcon} alt="img" onClick={()=> navigate(navItem.path)} /> </span>
    </div>
    </div>
    </>
  )
}

export default Logo