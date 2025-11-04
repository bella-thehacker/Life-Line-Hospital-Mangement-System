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

interface AddPatientDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface PatientFormData {
  name: string
  age: string
  gender: string
  phone: string
  email: string
  address: string
  bloodType: string
}

export const AddPatientDialog: React.FC<AddPatientDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const [formData, setFormData] = useState<PatientFormData>({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    bloodType: "",
  })

  const handleChange = (
    field: keyof PatientFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("New patient:", formData)
    onOpenChange(false)
    // Reset form
    setFormData({
      name: "",
      age: "",
      gender: "",
      phone: "",
      email: "",
      address: "",
      bloodType: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-secondary">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Add New Patient
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter the patient's information to create a new record.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground font-medium">
                Full Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  handleChange("name", e.target.value)
                }
                className="border-2 border-border focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-foreground font-medium">
                Age *
              </Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) =>
                  handleChange("age", e.target.value)
                }
                className="border-2 border-border focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender" className="text-foreground font-medium">
                Gender *
              </Label>
              <Select
                value={formData.gender}
                onValueChange={(value) =>
                  handleChange("gender", value)
                }
              >
                <SelectTrigger className="border-2 border-border focus:border-primary">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bloodType" className="text-foreground font-medium">
                Blood Type *
              </Label>
              <Select
                value={formData.bloodType}
                onValueChange={(value) =>
                  handleChange("bloodType", value)
                }
              >
                <SelectTrigger className="border-2 border-border focus:border-primary">
                  <SelectValue placeholder="Select blood type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground font-medium">
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  handleChange("phone", e.target.value)
                }
                className="border-2 border-border focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  handleChange("email", e.target.value)
                }
                className="border-2 border-border focus:border-primary"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-foreground font-medium">
              Address *
            </Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) =>
                handleChange("address", e.target.value)
              }
              className="border-2 border-border focus:border-primary"
              required
            />
          </div>

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
              Add Patient
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
