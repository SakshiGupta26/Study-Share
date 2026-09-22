import React from 'react'

const Badge = ({status}) => {
  const style = {
    pending : "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    reject : "bg-red-100 text-red-700"
  }
  return (
    <span
    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}>
      {status}
    </span>
  )
}

export default Badge
