"use client"

import { useState } from "react"
import { DashboardLayout } from "./DashboardLayout"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Plus, Search, Phone, Mail, MapPin } from "lucide-react"
import { AddPatientDialog } from "./PatientDialogue"

interface Patient {
  id: string
  name: string
  age: number
  gender: string
  phone: string
  email: string
  address: string
  bloodType: string
  lastVisit: string
  status: "active" | "inactive"
}

const mockPatients: Patient[] = [
  {
    id: "P001",
    name: "Wanjiku Kamau",
    age: 34,
    gender: "Female",
    phone: "+254 712 345 678",
    email: "wanjiku.k@email.com",
    address: "Kilimani, Nairobi",
    bloodType: "A+",
    lastVisit: "2024-01-15",
    status: "active",
  },
  {
    id: "P002",
    name: "Omondi Otieno",
    age: 45,
    gender: "Male",
    phone: "+254 723 456 789",
    email: "omondi.o@email.com",
    address: "Westlands, Nairobi",
    bloodType: "O-",
    lastVisit: "2024-01-10",
    status: "active",
  },
  {
    id: "P003",
    name: "Akinyi Odhiambo",
    age: 28,
    gender: "Female",
    phone: "+254 734 567 890",
    email: "akinyi.o@email.com",
    address: "Karen, Nairobi",
    bloodType: "B+",
    lastVisit: "2023-12-20",
    status: "inactive",
  },
  {
    id: "P004",
    name: "Kipchoge Rotich",
    age: 52,
    gender: "Male",
    phone: "+254 745 678 901",
    email: "kipchoge.r@email.com",
    address: "Lavington, Nairobi",
    bloodType: "AB+",
    lastVisit: "2024-01-12",
    status: "active",
  },
]

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [patients] = useState<Patient[]>(mockPatients)

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Patients</h2>
            <p className="text-muted-foreground">Manage and view all patient records</p>
          </div>
          <Button
            onClick={() => setDialogOpen(true)}
            className="bg-primary hover:bg-secondary transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Patient
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search patients by name, ID, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 border-2 border-border focus:border-primary transition-colors"
          />
        </div>

        {/* Patients Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPatients.map((patient) => (
            <Card
              key={patient.id}
              className="border-2 border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-foreground mb-1">{patient.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">ID: {patient.id}</p>
                  </div>
                  <Badge
                    variant={patient.status === "active" ? "default" : "secondary"}
                    className={
                      patient.status === "active"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }
                  >
                    {patient.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Age:</span>
                    <p className="font-medium text-foreground">{patient.age} years</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Gender:</span>
                    <p className="font-medium text-foreground">{patient.gender}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Blood Type:</span>
                    <p className="font-medium text-foreground">{patient.bloodType}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Last Visit:</span>
                    <p className="font-medium text-foreground">{patient.lastVisit}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-border space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{patient.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{patient.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{patient.address}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No patients found matching your search.</p>
          </div>
        )}
      </div>

      <AddPatientDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </DashboardLayout>
  )
}
