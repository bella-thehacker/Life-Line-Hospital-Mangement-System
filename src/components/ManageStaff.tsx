"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

interface ManageStaffDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface StaffFormData {
  name: string
  role: string
  specialization: string
  phone: string
  email: string
  experience: string
}

export function ManageStaffDialog({ open, onOpenChange }: ManageStaffDialogProps) {
  const [formData, setFormData] = useState<StaffFormData>({
    name: "",
    role: "",
    specialization: "",
    phone: "",
    email: "",
    experience: "",
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Adding staff:", formData)
    onOpenChange(false)
    setFormData({
      name: "",
      role: "",
      specialization: "",
      phone: "",
      email: "",
      experience: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">Add New Staff Member</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">
                Full Name *
              </Label>
              <Input
                id="name"
                placeholder="e.g., Dr. Wanjiku Kamau"
                value={formData.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="border-2 border-secondary focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-foreground">
                Role *
              </Label>
              <Select
                value={formData.role}
                onValueChange={(value: string) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger className="border-2 border-secondary focus:border-primary">
                 <SelectValue> Select role </SelectValue>

                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="nurse">Nurse</SelectItem>
                  <SelectItem value="pharmacist">Pharmacist</SelectItem>
                  <SelectItem value="receptionist">Receptionist</SelectItem>
                  <SelectItem value="lab-technician">Lab Technician</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialization" className="text-foreground">
              Specialization / Department
            </Label>
            <Input
              id="specialization"
              placeholder="e.g., Cardiology, Emergency, etc."
              value={formData.specialization}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, specialization: e.target.value })
              }
              className="border-2 border-secondary focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground">
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+254 712 345 678"
                value={formData.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="border-2 border-secondary focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="staff@lifeline.com"
                value={formData.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="border-2 border-secondary focus:border-primary"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience" className="text-foreground">
              Years of Experience
            </Label>
            <Input
              id="experience"
              type="number"
              placeholder="e.g., 5"
              value={formData.experience}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, experience: e.target.value })
              }
              className="border-2 border-secondary focus:border-primary"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-2"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-secondary">
              Add Staff Member
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
