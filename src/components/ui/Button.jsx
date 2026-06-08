import React from 'react'

function Button({
  children,
  className='',
  type='button',
  disabled=false,
  variant='primary',
  ...props
})
{
const styles = {
    primary:
           "bg-emerald-600 hover:bg-emerald-700 text-white",

    danger:
      "bg-red-500 hover:bg-red-600 text-white"
  }


  return (
    <button
      {...props}
      type={type}
      disabled={disabled}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        px-4
        py-2
        rounded-xl
        font-medium
        cursor-pointer
        transition-all
        duration-200
        active:scale-95
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:scale-100
        shadow-sm
        hover:shadow-md
        ${className}
        ${styles[variant]}
      `}
    >
      {children}
    </button>
  )
}

export default Button
