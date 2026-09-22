import React from 'react'

const Card = ({ children ,className=""}) => {
  return (
    <div
    className={`bg-card rounded-2xl p-6 shadow-md ${className}`}
    >
      {children}
    </div>
  )
}

export default Card
