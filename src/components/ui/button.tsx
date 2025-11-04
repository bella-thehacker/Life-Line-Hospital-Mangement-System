import React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
}

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "default",
  className = "",
  children,
  ...props
}) => {
  const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
    default: "bg-blue-600 hover:bg-blue-700 text-white",
    outline: "border border-gray-400 text-gray-800 hover:bg-gray-100",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-800", // 👈 new ghost style
  }

  const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
    default: "px-4 py-2 text-sm",
    sm: "px-3 py-1.5 text-sm",
    lg: "px-6 py-3 text-base",
    icon: "p-2 h-10 w-10 flex items-center justify-center", // 👈 supports icon-only buttons
  }

  return (
    <button
      className={`rounded-lg font-medium transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
