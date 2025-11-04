import React from "react"

export const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = "", children }) => (
  <div className={`rounded-xl border bg-white shadow-sm ${className}`}>{children}</div>
)

export const CardHeader: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = "",
  children,
}) => <div className={`border-b px-4 py-3 ${className}`}>{children}</div>

export const CardTitle: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = "",
  children,
}) => <h2 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h2>

export const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = "",
  children,
}) => <div className={`p-4 ${className}`}>{children}</div>
