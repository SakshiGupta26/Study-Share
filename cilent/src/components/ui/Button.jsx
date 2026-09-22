import React from 'react'

const Button = ({
  children,
  varient = "primary",
  type = "button",
  className = "",
  ...props
}) => {

  const baseStyles = "px-5 py-2.5 rounded-lg font-medium transition duration-200"

  const variants = {
    primary : "bg-peach text-black hover:opacity-90",
    secondary : "bg-white text-black hover:bg-gray-100"
  }
  return (
    <button
    type={type}
    className = {`${baseStyles} ${variants[varient]} ${className}`}
    {...props}
    >
     {children}
    </button>
  )
}

export default Button
