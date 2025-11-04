"use client"

import { useState } from "react"
import { DashboardLayout } from "./DashboardLayout"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Plus, User, UserCog, CalendarIcon } from "lucide-react"
import { AddAppointmentDialog } from "./AppointmentDialogue"
import { cn } from "../lib/utils"

interface Appointment {
  id: string
  patientName: string
  doctorName: string
  date: string
  time: string
  status: "confirmed" | "pending" | "completed" | "cancelled"
  type: string
  notes?: string
}

const mockAppointments: Appointment[] = [
  {
    id: "A001",
    patientName: "Wanjiku Kamau",
    doctorName: "Dr. Njoroge Mwangi",
    date: "2024-01-20",
    time: "09:00 AM",
    status: "confirmed",
    type: "Cardiology Checkup",
  },
  {
    id: "A002",
    patientName: "Kipchoge Rotich",
    doctorName: "Dr. Amina Hassan",
    date: "2024-01-20",
    time: "10:30 AM",
    status: "pending",
    type: "Pediatric Consultation",
  },
  {
    id: "A003",
    patientName: "Akinyi Odhiambo",
    doctorName: "Dr. Kimani Kariuki",
    date: "2024-01-20",
    time: "11:00 AM",
    status: "confirmed",
    type: "Orthopedic Follow-up",
  },
  {
    id: "A004",
    patientName: "Omondi Otieno",
    doctorName: "Dr. Fatuma Mohamed",
    date: "2024-01-20",
    time: "02:00 PM",
    status: "pending",
    type: "Neurology Consultation",
  },
  {
    id: "A005",
    patientName: "Chebet Koech",
    doctorName: "Dr. Mutua Musyoka",
    date: "2024-01-21",
    time: "09:30 AM",
    status: "confirmed",
    type: "Pre-Surgery Consultation",
  },
  {
    id: "A006",
    patientName: "Kamau Njuguna",
    doctorName: "Dr. Chebet Koech",
    date: "2024-01-21",
    time: "11:00 AM",
    status: "completed",
    type: "Dermatology Checkup",
  },
]

const statusColors = {
  confirmed: { bg: "bg-primary", text: "text-primary-foreground", border: "border-primary" },
  pending: { bg: "bg-secondary", text: "text-secondary-foreground", border: "border-secondary" },
  completed: { bg: "bg-muted", text: "text-muted-foreground", border: "border-muted" },
  cancelled: { bg: "bg-destructive", text: "text-destructive-foreground", border: "border-destructive" },
}

export default function AppointmentsPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [appointments] = useState<Appointment[]>(mockAppointments)
  const [activeTab, setActiveTab] = useState("all")

  const filteredAppointments = appointments.filter((apt) => {
    if (activeTab === "all") return true
    return apt.status === activeTab
  })

  const groupedByDate = filteredAppointments.reduce(
    (acc, apt) => {
      if (!acc[apt.date]) {
        acc[apt.date] = []
      }
      acc[apt.date].push(apt)
      return acc
    },
    {} as Record<string, Appointment[]>,
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Appointments</h2>
            <p className="text-muted-foreground">Schedule and manage patient appointments</p>
          </div>
          <Button
            onClick={() => setDialogOpen(true)}
            className="bg-primary hover:bg-secondary transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 h-12 bg-muted/50 border-2 border-border">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="confirmed"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Confirmed
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
            >
              Pending
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-muted data-[state=active]:text-muted-foreground"
            >
              Completed
            </TabsTrigger>
            <TabsTrigger
              value="cancelled"
              className="data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground"
            >
              Cancelled
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6 space-y-6">
            {Object.keys(groupedByDate).length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No appointments found for this filter.</p>
              </div>
            ) : (
              Object.entries(groupedByDate).map(([date, dateAppointments]) => (
                <div key={date} className="space-y-4">
                  {/* Date Header */}
                  <div className="flex items-center gap-3 pb-2 border-b-2 border-border">
                    <CalendarIcon className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-bold text-foreground uppercase tracking-wide">{formatDate(date)}</h3>
                    <Badge variant="secondary" className="ml-auto">
                      {dateAppointments.length} {dateAppointments.length === 1 ? "appointment" : "appointments"}
                    </Badge>
                  </div>

                  {/* Timeline View */}
                  <div className="space-y-3">
                    {dateAppointments
                      .sort((a, b) => a.time.localeCompare(b.time))
                      .map((appointment, index) => (
                        <Card
                          key={appointment.id}
                          className={cn(
                            "border-l-4 hover:shadow-lg transition-all duration-300",
                            statusColors[appointment.status].border,
                          )}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-muted">
                                  <div className="text-center">
                                    <div className="text-xs text-muted-foreground font-medium">
                                      {appointment.time.split(" ")[1]}
                                    </div>
                                    <div className="text-lg font-bold text-foreground">
                                      {appointment.time.split(":")[0]}:{appointment.time.split(":")[1].split(" ")[0]}
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <CardTitle className="text-lg font-bold text-foreground mb-1">
                                    {appointment.type}
                                  </CardTitle>
                                  <p className="text-sm text-muted-foreground">ID: {appointment.id}</p>
                                </div>
                              </div>
                              <Badge
                                className={cn(
                                  statusColors[appointment.status].bg,
                                  statusColors[appointment.status].text,
                                )}
                              >
                                {appointment.status}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/10">
                                  <User className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Patient</p>
                                  <p className="text-sm font-medium text-foreground">{appointment.patientName}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-secondary/10">
                                  <UserCog className="h-4 w-4 text-secondary" />
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Doctor</p>
                                  <p className="text-sm font-medium text-foreground">{appointment.doctorName}</p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>

      <AddAppointmentDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </DashboardLayout>
  )
}
