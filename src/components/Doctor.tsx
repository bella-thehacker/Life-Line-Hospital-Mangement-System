"use client"

import React, { useState, ChangeEvent } from "react"
import { DashboardLayout } from "./DashboardLayout"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Plus, Search, Phone, Mail, Calendar, Award } from "lucide-react"
import { AddDoctorDialog } from "./DoctorDialogue"

// 🩺 Doctor type
export interface Doctor {
  id: string
  name: string
  specialization: string
  experience: number
  phone: string
  email: string
  availability: "available" | "busy" | "off-duty"
  patients: number
  rating: number
  image?: string
}

// 🧠 Mock Data
const mockDoctors: Doctor[] = [
  {
    id: "D001",
    name: "Dr. Njoroge Mwangi",
    specialization: "Cardiology",
    experience: 15,
    phone: "+254 711 222 333",
    email: "njoroge.m@lifeline.com",
    availability: "available",
    patients: 142,
    rating: 4.9,
  },
  {
    id: "D002",
    name: "Dr. Amina Hassan",
    specialization: "Pediatrics",
    experience: 12,
    phone: "+254 722 333 444",
    email: "amina.h@lifeline.com",
    availability: "busy",
    patients: 198,
    rating: 4.8,
  },
  {
    id: "D003",
    name: "Dr. Kimani Kariuki",
    specialization: "Orthopedics",
    experience: 18,
    phone: "+254 733 444 555",
    email: "kimani.k@lifeline.com",
    availability: "available",
    patients: 156,
    rating: 4.7,
  },
  {
    id: "D004",
    name: "Dr. Fatuma Mohamed",
    specialization: "Neurology",
    experience: 10,
    phone: "+254 744 555 666",
    email: "fatuma.m@lifeline.com",
    availability: "off-duty",
    patients: 89,
    rating: 4.9,
  },
  {
    id: "D005",
    name: "Dr. Mutua Musyoka",
    specialization: "General Surgery",
    experience: 20,
    phone: "+254 755 666 777",
    email: "mutua.m@lifeline.com",
    availability: "available",
    patients: 203,
    rating: 4.8,
  },
  {
    id: "D006",
    name: "Dr. Chebet Koech",
    specialization: "Dermatology",
    experience: 8,
    phone: "+254 766 777 888",
    email: "chebet.k@lifeline.com",
    availability: "busy",
    patients: 124,
    rating: 4.6,
  },
]

// 🎨 Availability color mapping
const availabilityColors: Record<
  Doctor["availability"],
  { badge: string; dot: string }
> = {
  available: { badge: "bg-primary text-primary-foreground", dot: "bg-primary" },
  busy: { badge: "bg-secondary text-secondary-foreground", dot: "bg-secondary" },
  "off-duty": { badge: "bg-muted text-muted-foreground", dot: "bg-muted-foreground" },
}

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = React.useState<string>("")
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false)
  const [doctors] = React.useState<Doctor[]>(mockDoctors)

  const filteredDoctors = doctors.filter((doctor) =>
    [doctor.name, doctor.specialization, doctor.id].some((field) =>
      field.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Doctors</h2>
            <p className="text-muted-foreground">
              Manage medical staff and their schedules
            </p>
          </div>
          <Button
            onClick={() => setDialogOpen(true)}
            className="bg-primary hover:bg-secondary transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Doctor
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search doctors by name, specialization, or ID..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 h-12 border-2 border-border focus:border-primary transition-colors"
          />
        </div>

        {/* Doctors Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.map((doctor) => {
            const initials = doctor.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)

            return (
              <Card
                key={doctor.id}
                className="border-2 border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <Avatar className="h-16 w-16 border-2 border-primary">
                        <AvatarImage src={doctor.image || "/placeholder.svg"} />
                        <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-card ${
                          availabilityColors[doctor.availability].dot
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-foreground mb-1">
                        {doctor.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {doctor.specialization}
                      </p>
                      <Badge className={availabilityColors[doctor.availability].badge}>
                        {doctor.availability.replace("-", " ")}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Experience</p>
                        <p className="text-sm font-medium text-foreground">
                          {doctor.experience} years
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Rating</p>
                        <p className="text-sm font-medium text-foreground">
                          {doctor.rating}/5.0
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Total Patients</span>
                      <span className="font-bold text-foreground">{doctor.patients}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{doctor.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span className="truncate">{doctor.email}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No doctors found matching your search.
            </p>
          </div>
        )}
      </div>

      {/* Add Doctor Modal */}
      <AddDoctorDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </DashboardLayout>
  )
}
