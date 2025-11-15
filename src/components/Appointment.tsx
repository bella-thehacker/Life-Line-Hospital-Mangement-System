"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "./DashboardLayout"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Plus, User, UserCog, CalendarIcon } from "lucide-react"
import { AddAppointmentDialog } from "./AppointmentDialogue"
import { cn } from "../lib/utils"
import { API_URLS, apiGet } from "../lib/api"

interface Appointment {
  id: string
  patient: number
  patientName: string
  doctor: number | null
  doctorName: string
  date: string
  time: string
  status: "confirmed" | "pending" | "completed" | "cancelled"
  type: string
  notes?: string
}

const statusColors = {
  confirmed: { bg: "bg-primary", text: "text-primary-foreground", border: "border-primary" },
  pending: { bg: "bg-secondary", text: "text-secondary-foreground", border: "border-secondary" },
  completed: { bg: "bg-muted", text: "text-muted-foreground", border: "border-muted" },
  cancelled: { bg: "bg-destructive", text: "text-destructive-foreground", border: "border-destructive" },
}

export default function AppointmentsPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [loading, setLoading] = useState(false)

const fetchAppointments = async () => {
  setLoading(true)
  try {
    const data = (await apiGet(API_URLS.appointments)) as Appointment[]
    setAppointments(data)
  } catch (err) {
    console.error("Failed to fetch appointments:", err)
  } finally {
    setLoading(false)
  }
}


  useEffect(() => {
    fetchAppointments()
  }, [])

  const handleAppointmentAdded = () => {
    fetchAppointments()
  }

  const filteredAppointments = appointments.filter((apt) => {
    if (activeTab === "all") return true
    return apt.status === activeTab
  })

  const groupedByDate = filteredAppointments.reduce(
    (acc, apt) => {
      if (!acc[apt.date]) acc[apt.date] = []
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Appointments</h2>
            <p className="text-muted-foreground">Schedule and manage patient appointments</p>
          </div>
          <Button onClick={() => setDialogOpen(true)} className="bg-primary hover:bg-secondary transition-all duration-300 shadow-md hover:shadow-lg">
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 h-12 bg-muted/50 border-2 border-border">
            {["all","confirmed","pending","completed","cancelled"].map((tab) => (
              <TabsTrigger key={tab} value={tab} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {tab[0].toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-6 space-y-6">
            {loading ? (
              <div className="text-center py-12 text-muted-foreground">Loading...</div>
            ) : Object.keys(groupedByDate).length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No appointments found for this filter.</div>
            ) : (
              Object.entries(groupedByDate).map(([date, dateAppointments]) => (
                <div key={date} className="space-y-4">
                  <div className="flex items-center gap-3 pb-2 border-b-2 border-border">
                    <CalendarIcon className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-bold text-foreground uppercase tracking-wide">{formatDate(date)}</h3>
                    <Badge variant="secondary" className="ml-auto">{dateAppointments.length} {dateAppointments.length === 1 ? "appointment" : "appointments"}</Badge>
                  </div>

                  <div className="space-y-3">
                    {dateAppointments.sort((a,b) => a.time.localeCompare(b.time)).map((apt) => (
                      <Card key={apt.id} className={cn("border-l-4 hover:shadow-lg transition-all duration-300", statusColors[apt.status].border)}>
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-muted">
                                <div className="text-center">
                                  <div className="text-xs text-muted-foreground font-medium">{apt.time.split(" ")[1]}</div>
                                  <div className="text-lg font-bold text-foreground">{apt.time.split(":")[0]}:{apt.time.split(":")[1].split(" ")[0]}</div>
                                </div>
                              </div>
                              <div>
                                <CardTitle className="text-lg font-bold text-foreground mb-1">{apt.type}</CardTitle>
                                <p className="text-sm text-muted-foreground">ID: {apt.id}</p>
                              </div>
                            </div>
                            <Badge className={cn(statusColors[apt.status].bg, statusColors[apt.status].text)}>{apt.status}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-primary/10"><User className="h-4 w-4 text-primary" /></div>
                              <div>
                                <p className="text-xs text-muted-foreground">Patient</p>
                                <p className="text-sm font-medium text-foreground">{apt.patientName}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-secondary/10"><UserCog className="h-4 w-4 text-secondary" /></div>
                              <div>
                                <p className="text-xs text-muted-foreground">Doctor</p>
                                <p className="text-sm font-medium text-foreground">{apt.doctorName}</p>
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

      <AddAppointmentDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onAppointmentAdded={handleAppointmentAdded}
      />
    </DashboardLayout>
  )
}
