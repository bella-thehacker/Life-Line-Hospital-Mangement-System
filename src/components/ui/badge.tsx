import React from "react"

export interface BadgeProps {
  variant?: "default" | "secondary" | "success" | "danger"
  children: React.ReactNode
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({ variant = "default", children, className = "" }) => {
  const variants = {
    default: "bg-blue-600 text-white",
    secondary: "bg-gray-200 text-gray-800",
    success: "bg-green-500 text-white",
    danger: "bg-red-500 text-white",
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
