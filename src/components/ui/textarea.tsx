import React from "react"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

export const Textarea: React.FC<TextareaProps> = ({ label, className = "", ...props }) => (
  <div className="space-y-1">
    {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
    <textarea
      className={`w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  </div>
)
