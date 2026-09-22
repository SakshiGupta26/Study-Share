import React from 'react'

const Input = ({label,error,className="",...props}) => {
  return (
    <div className='flex flex-col gap-2'>
      {label && (
        <label className="text-sm font-medium text-white">
          {label}
        </label>
      )}

      <input className={`w-full rounded-lg border-gray-300 px-4 py-2.5 bg-white text-black outline-none focus:border-peach focus:ring-2 focus:ring-peach/30 ${className}`}
      {...props} />
      {error && (
        <p className='text-sm text-red-400'>
          {error}
        </p>
      )}
    </div>
  )
}

export default Input
