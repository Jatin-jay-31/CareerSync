import React from 'react'


function Textarea({label,id,className='',...props}) {

  return (
    <div className='w-full'>
      {label && (
        <label
          htmlFor={id}
          className={`mb-2 block text-sm 
              text-slate-600 `}
        >
          {label}
        </label>
      )}

      <textarea
        {...props}
        id={id}
        className={`
          w-full
          resize-none
          rounded-2xl
          outline-none
          transition-all
          duration-200
          focus:ring-2
          focus:ring-blue-300
         text-slate-700 placeholder:text-slate-500
          ${className}
        `}
      />
    </div>
  )
}

export default Textarea