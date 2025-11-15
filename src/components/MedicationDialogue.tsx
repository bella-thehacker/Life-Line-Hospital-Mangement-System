"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"

interface AddMedicationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface MedicationFormData {
  name: string
  category: string
  uses: string
  stock: string
  minStock: string
  unit: string
  expiryDate: string
}

export function AddMedicationDialog({ open, onOpenChange }: AddMedicationDialogProps) {
  const [formData, setFormData] = useState<MedicationFormData>({
    name: "",
    category: "",
    uses: "",
    stock: "",
    minStock: "",
    unit: "",
    expiryDate: "",
  })

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()

  // Construct payload with backend field names
  const payload = {
    sku: `M${Date.now()}`, // simple unique SKU
    name: formData.name,
    category: formData.category,
    uses: formData.uses,
    stock: Number(formData.stock),
    min_stock: Number(formData.minStock),
    unit: formData.unit,
    expiry_date: formData.expiryDate,
  }

  try {
    const response = await fetch("http://localhost:8000/api/inventory/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error("Failed to add medication")
    }

    const newMedication = await response.json()
    console.log("Medication added successfully:", newMedication)

    // Optionally: call a prop function to refresh the list in Medication.tsx

    // Close dialog and reset form
    onOpenChange(false)
    setFormData({
      name: "",
      category: "",
      uses: "",
      stock: "",
      minStock: "",
      unit: "",
      expiryDate: "",
    })
  } catch (error) {
    console.error("Error adding medication:", error)
    alert("Failed to add medication. Check console for details.")
  }
}


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">Add New Medication</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Name & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Medication Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Uses */}
          <div className="space-y-2">
            <Label htmlFor="uses">Uses / Description *</Label>
            <Textarea
              id="uses"
              value={formData.uses}
              onChange={(e) => setFormData({ ...formData, uses: e.target.value })}
              required
            />
          </div>

          {/* Stock info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stock">Current Stock *</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minStock">Minimum Stock *</Label>
              <Input
                id="minStock"
                type="number"
                value={formData.minStock}
                onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">Unit *</Label>
              <Input
                id="unit"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                placeholder="e.g., tablets, ml"
                required
              />
            </div>
          </div>

          {/* Expiry */}
          <div className="space-y-2">
            <Label htmlFor="expiryDate">Expiry Date *</Label>
            <Input
              id="expiryDate"
              type="date"
              value={formData.expiryDate}
              onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-secondary">
              Add Medication
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
