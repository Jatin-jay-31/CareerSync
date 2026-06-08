import React from 'react'


function Container({ children }) {
  return (
    <div
      className={` min-h-screen w-full mx-auto transition-colors duration-200  bg-white`}
    >
      {children}
    </div>
  )
}

export default Container