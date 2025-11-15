"use client"

import React, { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { API_URLS, apiGet, apiPost } from "../lib/api"

interface AddAppointmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAppointmentAdded?: () => void
}

interface Patient {
  id: number
  // your backend may return different shape; adjust if needed
  name: string
}

interface Doctor {
  id: number
  name: string
  specialty?: string
}

interface AppointmentFormData {
  patient: string
  doctor: string
  date: string
  time: string
  type: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  notes: string
}

export const AddAppointmentDialog: React.FC<AddAppointmentDialogProps> = ({
  open,
  onOpenChange,
  onAppointmentAdded,
}) => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    patient: "",
    doctor: "",
    date: "",
    time: "",
    type: "",
    status: "pending",
    notes: "",
  })

  const [patients, setPatients] = useState<Patient[]>([])
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // load lists when dialog opens
  useEffect(() => {
    if (!open) return

    const fetchLists = async () => {
      try {
        const p = (await apiGet(API_URLS.patients)) as unknown
        const d = (await apiGet(API_URLS.doctors)) as unknown

        // Defensive casts: try to map to expected shape
        const patientsList: Patient[] =
          Array.isArray(p) && (p as any[]).length
            ? (p as any[]).map((x) =>
                typeof x.name === "string" ? { id: x.id, name: x.name } : { id: x.id, name: `${x.first_name || ""} ${x.last_name || ""}`.trim() }
              )
            : []

        const doctorsList: Doctor[] =
          Array.isArray(d) && (d as any[]).length
            ? (d as any[]).map((x) =>
                typeof x.name === "string" ? { id: x.id, name: x.name, specialty: (x as any).specialization } : { id: x.id, name: ((x.user && `${x.user.first_name} ${x.user.last_name}`) || `Doctor ${x.id}`), specialty: (x as any).specialization }
              )
            : []

        setPatients(patientsList)
        setDoctors(doctorsList)
      } catch (err) {
        console.error("Failed to fetch patients/doctors:", err)
      }
    }

    fetchLists()
  }, [open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (!formData.patient) {
      setError("Please select a patient.")
      setLoading(false)
      return
    }
    if (!formData.date || !formData.time) {
      setError("Please choose date and time.")
      setLoading(false)
      return
    }

    try {
      await apiPost(API_URLS.appointments, {
        patient: Number(formData.patient), // backend expects ID
        doctor: formData.doctor ? Number(formData.doctor) : null,
        scheduled_at: `${formData.date}T${formData.time}`,
        type: formData.type,
        status: formData.status,
        reason: formData.notes,
      })

      onAppointmentAdded?.()
      onOpenChange(false)
      setFormData({ patient: "", doctor: "", date: "", time: "", type: "", status: "pending", notes: "" })
    } catch (err) {
      console.error("Failed to create appointment:", err)
      setError("Failed to create appointment.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto z-50 p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">Schedule New Appointment</DialogTitle>
          <DialogDescription className="text-muted-foreground">Fill in the details to create a new appointment.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">

          {/* Patient select (native) */}
          <div className="space-y-2">
            <Label>Patient *</Label>
            <select
              value={formData.patient}
              onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
              className="w-full border-2 border-border rounded-md px-3 py-2 focus:border-primary"
              required
            >
              <option value="">-- Select patient --</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Doctor select (native) */}
          <div className="space-y-2">
            <Label>Doctor</Label>
            <select
              value={formData.doctor}
              onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
              className="w-full border-2 border-border rounded-md px-3 py-2 focus:border-primary"
            >
              <option value="">-- Select doctor (optional) --</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}{d.specialty ? ` — ${d.specialty}` : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date *</Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Time *</Label>
              <Input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Type & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Type</Label>
              <Input
                placeholder="e.g., Checkup, Follow-up"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Status *</Label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as AppointmentFormData["status"] })}
                className="w-full border-2 border-border rounded-md px-3 py-2 focus:border-primary"
                required
              >
                <option value="pending">pending</option>
                <option value="confirmed">confirmed</option>
                <option value="completed">completed</option>
                <option value="cancelled">cancelled</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label>Notes</Label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="min-h-[100px] border-2 border-border focus:border-primary"
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Scheduling..." : "Schedule Appointment"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
