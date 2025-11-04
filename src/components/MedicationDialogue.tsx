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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Adding medication:", formData)
    onOpenChange(false)

    // Reset form after submission
    setFormData({
      name: "",
      category: "",
      uses: "",
      stock: "",
      minStock: "",
      unit: "",
      expiryDate: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">Add New Medication</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">
                Medication Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="border-2 border-secondary focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-foreground">
                Category *
              </Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="border-2 border-secondary focus:border-primary"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="uses" className="text-foreground">
              Uses / Description *
            </Label>
            <Textarea
              id="uses"
              value={formData.uses}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setFormData({ ...formData, uses: e.target.value })
              }
              className="border-2 border-secondary focus:border-primary min-h-[80px]"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stock" className="text-foreground">
                Current Stock *
              </Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                className="border-2 border-secondary focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="minStock" className="text-foreground">
                Minimum Stock *
              </Label>
              <Input
                id="minStock"
                type="number"
                value={formData.minStock}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, minStock: e.target.value })
                }
                className="border-2 border-secondary focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit" className="text-foreground">
                Unit *
              </Label>
              <Input
                id="unit"
                placeholder="e.g., tablets, ml"
                value={formData.unit}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, unit: e.target.value })
                }
                className="border-2 border-secondary focus:border-primary"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiryDate" className="text-foreground">
              Expiry Date *
            </Label>
            <Input
              id="expiryDate"
              type="date"
              value={formData.expiryDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, expiryDate: e.target.value })
              }
              className="border-2 border-secondary focus:border-primary"
              required
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
              Add Medication
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
