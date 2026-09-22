import React from 'react'

const SectionHeading = () => {
  return (
    <div className="mb-8">
      <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-peach">
        {label}
      </p>
      <h2 className="text-3xl font-bold text-white md:text-4xl">
        {title}
      </h2>
    </div>
  )
}

export default SectionHeading
