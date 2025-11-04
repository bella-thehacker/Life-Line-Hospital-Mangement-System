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

// ✅ Props interface
interface AddDoctorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// ✅ Form data interface
interface DoctorFormData {
  name: string
  specialization: string
  experience: string
  phone: string
  email: string
  availability: "available" | "busy" | "off-duty" | ""
}

export const AddDoctorDialog: React.FC<AddDoctorDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const [formData, setFormData] = useState<DoctorFormData>({
    name: "",
    specialization: "",
    experience: "",
    phone: "",
    email: "",
    availability: "",
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("New doctor:", formData)
    onOpenChange(false)
    // Reset form
    setFormData({
      name: "",
      specialization: "",
      experience: "",
      phone: "",
      email: "",
      availability: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-secondary">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Add New Doctor
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter the doctor's information to add them to the system.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="doctor-name" className="text-foreground font-medium">
                Full Name *
              </Label>
              <Input
                id="doctor-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="border-2 border-border focus:border-primary"
                placeholder="Dr. John Smith"
                required
              />
            </div>

            {/* Specialization */}
            <div className="space-y-2">
              <Label htmlFor="specialization" className="text-foreground font-medium">
                Specialization *
              </Label>
              <Select
                value={formData.specialization}
                onValueChange={(value) =>
                  setFormData({ ...formData, specialization: value })
                }
              >
                <SelectTrigger className="border-2 border-border focus:border-primary">
                  <SelectValue>{formData.availability || "Select status"}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cardiology">Cardiology</SelectItem>
                  <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                  <SelectItem value="Neurology">Neurology</SelectItem>
                  <SelectItem value="General Surgery">General Surgery</SelectItem>
                  <SelectItem value="Dermatology">Dermatology</SelectItem>
                  <SelectItem value="Psychiatry">Psychiatry</SelectItem>
                  <SelectItem value="Radiology">Radiology</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Experience */}
            <div className="space-y-2">
              <Label htmlFor="experience" className="text-foreground font-medium">
                Years of Experience *
              </Label>
              <Input
                id="experience"
                type="number"
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
                className="border-2 border-border focus:border-primary"
                min="0"
                required
              />
            </div>

            {/* Availability */}
            <div className="space-y-2">
              <Label htmlFor="availability" className="text-foreground font-medium">
                Availability Status *
              </Label>
              <Select
                value={formData.availability}
                onValueChange={(value: DoctorFormData["availability"]) =>
                  setFormData({ ...formData, availability: value })
                }
              >
                <SelectTrigger className="border-2 border-border focus:border-primary">
             <SelectValue>{formData.availability || "Select status"}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="busy">Busy</SelectItem>
                  <SelectItem value="off-duty">Off Duty</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="doctor-phone" className="text-foreground font-medium">
                Phone Number *
              </Label>
              <Input
                id="doctor-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="border-2 border-border focus:border-primary"
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="doctor-email" className="text-foreground font-medium">
                Email Address *
              </Label>
              <Input
                id="doctor-email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="border-2 border-border focus:border-primary"
                placeholder="doctor@lifeline.com"
                required
              />
            </div>
          </div>

          {/* Footer Buttons */}
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
              Add Doctor
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
