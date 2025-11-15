"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { API_URLS, apiPost } from "../lib/api"

interface AddDoctorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onDoctorAdded?: () => void
}

interface DoctorFormData {
  id: string
  name: string
  specialization: string
  experience: string
  phone: string
  email: string
  availability: "available" | "busy" | "off-duty" | ""
  patients: string
  rating: string
}

export const AddDoctorDialog: React.FC<AddDoctorDialogProps> = ({
  open,
  onOpenChange,
  onDoctorAdded,
}) => {
  const [formData, setFormData] = useState<DoctorFormData>({
    id: "",
    name: "",
    specialization: "",
    experience: "",
    phone: "",
    email: "",
    availability: "",
    patients: "",
    rating: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const payload = {
       user_name: formData.name,      // must match serializer
  user_email: formData.email,    // must match serializer
  specialization: formData.specialization,
  experience: Number(formData.experience),
  phone: formData.phone,
  availability: formData.availability,
  patients: Number(formData.patients),
  rating: Number(formData.rating),
    }

    try {
      await apiPost(API_URLS.doctors, payload)
      onDoctorAdded?.()
      onOpenChange(false)
    } catch (err) {
      console.error(err)
      setError("Failed to add doctor.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add New Doctor</DialogTitle>
          <DialogDescription>Enter the doctor information.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <Label>ID *</Label>
              <Input
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                placeholder="D001"
                required
              />
            </div>

            <div>
              <Label>Full Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Dr. John Smith"
                required
              />
            </div>

            <div>
              <Label>Specialization *</Label>
              <Input
                value={formData.specialization}
                onChange={(e) =>
                  setFormData({ ...formData, specialization: e.target.value })
                }
                placeholder="Cardiology"
                required
              />
            </div>

            <div>
              <Label>Experience *</Label>
              <Input
                type="number"
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
                placeholder="15"
                required
              />
            </div>

            <div>
              <Label>Phone *</Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+254 711 222 333"
                required
              />
            </div>

            <div>
              <Label>Email *</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="doctor@lifeline.com"
                required
              />
            </div>

            <div>
              <Label>Availability *</Label>
              <select
                value={formData.availability}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    availability: e.target.value as any,
                  })
                }
                className="w-full border px-3 py-2 rounded"
                required
              >
                <option value="">Select status</option>
                <option value="available">Available</option>
                <option value="busy">Busy</option>
                <option value="off-duty">Off Duty</option>
              </select>
            </div>

            <div>
              <Label>Patients *</Label>
              <Input
                type="number"
                value={formData.patients}
                onChange={(e) =>
                  setFormData({ ...formData, patients: e.target.value })
                }
                placeholder="142"
                required
              />
            </div>

            <div>
              <Label>Rating *</Label>
              <Input
                type="number"
                step="0.1"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                placeholder="4.9"
                required
              />
            </div>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Doctor"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
