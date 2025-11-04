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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Textarea } from "./ui/textarea"

// ✅ Props interface
interface AddAppointmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// ✅ Form data interface
interface AppointmentFormData {
  patientName: string
  doctorName: string
  date: string
  time: string
  type: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  notes: string
}

export const AddAppointmentDialog: React.FC<AddAppointmentDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    patientName: "",
    doctorName: "",
    date: "",
    time: "",
    type: "",
    status: "pending",
    notes: "",
  })

  // ✅ Typed event handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("New appointment:", formData)
    onOpenChange(false)
    // Reset form
    setFormData({
      patientName: "",
      doctorName: "",
      date: "",
      time: "",
      type: "",
      status: "pending",
      notes: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-secondary">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Schedule New Appointment
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Fill in the details to create a new appointment.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Patient Name */}
            <div className="space-y-2">
              <Label htmlFor="patient" className="text-foreground font-medium">
                Patient Name *
              </Label>
              <Input
                id="patient"
                value={formData.patientName}
                onChange={(e) =>
                  setFormData({ ...formData, patientName: e.target.value })
                }
                className="border-2 border-border focus:border-primary"
                placeholder="Select or enter patient name"
                required
              />
            </div>

            {/* Doctor Name */}
            <div className="space-y-2">
              <Label htmlFor="doctor" className="text-foreground font-medium">
                Doctor Name *
              </Label>
              <Input
                id="doctor"
                value={formData.doctorName}
                onChange={(e) =>
                  setFormData({ ...formData, doctorName: e.target.value })
                }
                className="border-2 border-border focus:border-primary"
                placeholder="Select or enter doctor name"
                required
              />
            </div>

            {/* Appointment Date */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-foreground font-medium">
                Appointment Date *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="border-2 border-border focus:border-primary"
                required
              />
            </div>

            {/* Appointment Time */}
            <div className="space-y-2">
              <Label htmlFor="time" className="text-foreground font-medium">
                Appointment Time *
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                className="border-2 border-border focus:border-primary"
                required
              />
            </div>

            {/* Appointment Type */}
            <div className="space-y-2">
              <Label htmlFor="type" className="text-foreground font-medium">
                Appointment Type *
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger className="border-2 border-border focus:border-primary">
                    <SelectValue>{formData.status || "Select status"}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Consultation">Consultation</SelectItem>
                  <SelectItem value="Follow-up">Follow-up</SelectItem>
                  <SelectItem value="Checkup">Checkup</SelectItem>
                  <SelectItem value="Surgery">Surgery</SelectItem>
                  <SelectItem value="Emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Appointment Status */}
            <div className="space-y-2">
              <Label htmlFor="status" className="text-foreground font-medium">
                Status *
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value: AppointmentFormData["status"]) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger className="border-2 border-border focus:border-primary">
                 
                     <SelectValue>{formData.status || "Select status"}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-foreground font-medium">
              Additional Notes
            </Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="border-2 border-border focus:border-primary min-h-[100px]"
              placeholder="Enter any additional notes or special instructions..."
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-2"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-secondary transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Schedule Appointment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
