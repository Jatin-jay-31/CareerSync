import React from 'react'

function Input({label,id,type,className='',...props}) {

  return (
    <div className='w-full'>
      {label && (
        <label
          htmlFor={id}
          className={`mb-2 block text-sm`}
        >
          {label}
        </label>
      )}

      <input
        {...props}
        type={type}
        id={id}
        className={`
          w-full
          px-3
          py-2
          rounded-2xl
          outline-none
          transition-all
          duration-200
          bg-transparent
          focus:ring-2
          focus:ring-blue-300
          text-slate-700 placeholder:text-slate-500
          ${className}
        `}
      />
    </div>
  )
}

export default Input
