"use client"

import React, { useState, useEffect } from "react"
import { DashboardLayout } from "./DashboardLayout"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Plus, Phone, Mail, Calendar } from "lucide-react"
import { AddDoctorDialog } from "./DoctorDialogue"
import { API_URLS, apiGet } from "../lib/api"

export interface Doctor {
  id: string
  name: string
  specialization: string
  experience: number
  phone: string
  email: string
  availability: "available" | "busy" | "off-duty"
  rating?: number | null
  patients: number
}

const availabilityColors: Record<string, { badge: string; dot: string }> = {
  available: { badge: "bg-primary text-white", dot: "bg-primary" },
  busy: { badge: "bg-yellow-500 text-white", dot: "bg-yellow-500" },
  "off-duty": { badge: "bg-gray-400 text-white", dot: "bg-gray-400" },
}

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  const fetchDoctors = async () => {
    try {
      setLoading(true)
      const data = await apiGet<Doctor[]>(API_URLS.doctors)
      setDoctors(data)
    } catch {
      setError("Failed to load doctors")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDoctors()
  }, [])

  const filteredDoctors = doctors.filter((d) => {
    return (
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.id.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">Doctors</h2>
            <p className="text-muted-foreground">Manage medical staff</p>
          </div>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" /> Add Doctor
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Input
            placeholder="Search doctors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {loading && <p>Loading doctors...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.map((doctor) => {
            const initials = doctor.name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)

            const badgeColor =
              availabilityColors[doctor.availability]?.badge || "bg-gray-400 text-white"
            const dotColor =
              availabilityColors[doctor.availability]?.dot || "bg-gray-400"

            return (
              <Card key={doctor.id} className="p-4">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <Avatar className="h-16 w-16 border-2 border-primary">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${dotColor}`}
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-bold">{doctor.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {doctor.specialization}
                      </p>
                      <Badge className={badgeColor}>{doctor.availability}</Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{doctor.experience} years experience</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{doctor.phone}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{doctor.email}</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredDoctors.length === 0 && !loading && (
          <p className="text-center text-muted-foreground">No doctors found.</p>
        )}
      </div>

      <AddDoctorDialog
        open={dialogOpen}
        onOpenChange={(open) => setDialogOpen(open)}
        onDoctorAdded={fetchDoctors}
      />
    </DashboardLayout>
  )
}
