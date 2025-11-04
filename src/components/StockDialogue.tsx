"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

interface AddStockDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface StockFormData {
  itemType: string
  itemName: string
  quantity: string
  unit: string
}

export const AddStockDialog: React.FC<AddStockDialogProps> = ({ open, onOpenChange }) => {
  const [formData, setFormData] = useState<StockFormData>({
    itemType: "",
    itemName: "",
    quantity: "",
    unit: "",
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Adding stock:", formData)
    onOpenChange(false)
    setFormData({
      itemType: "",
      itemName: "",
      quantity: "",
      unit: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">Add Stock</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Item Type */}
          <div className="space-y-2">
            <Label htmlFor="itemType" className="text-foreground">
              Item Type *
            </Label>
            <Select
              value={formData.itemType}
              onValueChange={(value) => setFormData({ ...formData, itemType: value })}
            >
              <SelectTrigger className="border-2 border-secondary focus:border-primary">
                <SelectValue placeholder="Select item type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="medication">Medication</SelectItem>
                <SelectItem value="equipment">Medical Equipment</SelectItem>
                <SelectItem value="supplies">Medical Supplies</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Item Name */}
          <div className="space-y-2">
            <Label htmlFor="itemName" className="text-foreground">
              Item Name *
            </Label>
            <Input
              id="itemName"
              placeholder="e.g., Paracetamol, Syringes, etc."
              value={formData.itemName}
              onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
              className="border-2 border-secondary focus:border-primary"
              required
            />
          </div>

          {/* Quantity & Unit */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-foreground">
                Quantity *
              </Label>
              <Input
                id="quantity"
                type="number"
                placeholder="e.g., 100"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
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
                placeholder="e.g., tablets, boxes"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="border-2 border-secondary focus:border-primary"
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1 border-2">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-secondary">
              Add to Inventory
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
