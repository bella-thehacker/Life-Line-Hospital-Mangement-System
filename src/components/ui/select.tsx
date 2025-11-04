"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

// 👇 Make Select generic to support any value type (like AppointmentFormData["status"])
interface SelectProps<T> {
  value?: T
  onValueChange?: (value: T) => void
  placeholder?: string
  children: React.ReactNode
}

export function Select<T extends string | number>({
  value,
  onValueChange,
  placeholder,
  children,
}: SelectProps<T>) {
  const [open, setOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState<T | undefined>(value)

  const handleSelect = (newValue: T) => {
    setSelectedValue(newValue)
    if (onValueChange) onValueChange(newValue)
    setOpen(false)
  }

  return (
    <div className="relative inline-block text-left">
      <SelectTrigger onClick={() => setOpen(!open)}>
      <SelectValue>{selectedValue ? String(selectedValue) : placeholder || "Select..."}</SelectValue>

      </SelectTrigger>

      {open && (
        <SelectContent>
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              const typedChild = child as React.ReactElement<{
                value: T
                onClick?: () => void
              }>
              return React.cloneElement(typedChild, {
                onClick: () => handleSelect(typedChild.props.value),
              })
            }
            return child
          })}
        </SelectContent>
      )}
    </div>
  )
}


// ✅ Trigger Button
interface SelectTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}
export const SelectTrigger: React.FC<SelectTriggerProps> = ({
  children,
  className,
  ...props
}) => (
  <button
    {...props}
    type="button"
    className={cn(
      "w-full flex items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary",
      className
    )}
  >
    {children}
  </button>
)

// ✅ FIXED SelectValue — supports placeholder
interface SelectValueProps {
  placeholder?: string
  children?: React.ReactNode
}

export const SelectValue: React.FC<SelectValueProps> = ({ children }) => {
  return <span className="truncate">{children}</span>
}


// ✅ Dropdown container
export const SelectContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
    <div className="py-1">{children}</div>
  </div>
)

// ✅ Individual Select item
interface SelectItemProps {
  value: string
  children: React.ReactNode
  onClick?: () => void
}
export const SelectItem: React.FC<SelectItemProps> = ({
  value,
  children,
  onClick,
}) => (
  <div
    onClick={onClick}
    className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
  >
    {children}
  </div>
)
