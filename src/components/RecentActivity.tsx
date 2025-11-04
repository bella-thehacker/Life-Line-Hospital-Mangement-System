"use client"

import React from "react"
import { UserPlus, Calendar, FileText, AlertCircle, LucideIcon } from "lucide-react"

interface Activity {
  id: number
  type: "patient" | "appointment" | "report" | "alert"
  message: string
  name: string
  time: string
  icon: LucideIcon
  color: string
  bgColor: string
}

const activities: Activity[] = [
  {
    id: 1,
    type: "patient",
    message: "New patient registered",
    name: "Wanjiku Kamau",
    time: "5 minutes ago",
    icon: UserPlus,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: 2,
    type: "appointment",
    message: "Appointment scheduled",
    name: "Dr. Njoroge Mwangi",
    time: "12 minutes ago",
    icon: Calendar,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    id: 3,
    type: "report",
    message: "Lab report uploaded",
    name: "Kamau Njuguna",
    time: "1 hour ago",
    icon: FileText,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    id: 4,
    type: "alert",
    message: "Inventory low alert",
    name: "Medical Supplies",
    time: "2 hours ago",
    icon: AlertCircle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
]

export const RecentActivity: React.FC = () => {
  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        const Icon = activity.icon
        return (
          <div
            key={activity.id}
            className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className={`p-2 rounded-lg ${activity.bgColor} shrink-0`}>
              <Icon className={`h-4 w-4 ${activity.color}`} strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{activity.message}</p>
              <p className="text-sm text-muted-foreground truncate">{activity.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
