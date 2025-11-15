"use client"

import React, { useState, useEffect, ChangeEvent } from "react"
import { DashboardLayout } from "./DashboardLayout"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Package, Search, AlertTriangle, Plus } from "lucide-react"
import { AddMedicationDialog } from "./MedicationDialogue"

// Define the Medication type
export interface Medication {
  id: number          // backend primary key
  sku: string
  name: string
  category: string
  uses: string
  stock: number
  min_stock: number
  unit: string
  expiry_date: string
}


interface AddMedicationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const TypedAddMedicationDialog = AddMedicationDialog as React.FC<AddMedicationDialogProps>

const Medication: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [medications, setMedications] = useState<Medication[]>([])

  // Fetch medications from API
  const fetchMedications = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/inventory/") // Adjust URL if needed
      const data = await res.json()
      setMedications(data)
    } catch (err) {
      console.error("Error fetching medications:", err)
    }
  }

  useEffect(() => {
    fetchMedications()
  }, [])

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value)
  }

  const filteredMedications = medications.filter(
    (med) =>
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.uses.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const lowStockCount = medications.filter((med) => med.stock < med.min_stock).length
  const totalStock = medications.reduce((sum, med) => sum + med.stock, 0)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Pharmacy Inventory</h2>
            <p className="text-muted-foreground">Manage medication stock and supplies</p>
          </div>
          <Button
            onClick={() => setDialogOpen(true)}
            className="bg-primary hover:bg-secondary transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Medication
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-2 border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Medications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{medications.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Different types</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{totalStock}</div>
              <p className="text-xs text-muted-foreground mt-1">Units available</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-destructive">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-destructive flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Low Stock Alert
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-destructive">{lowStockCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Items need restocking</p>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search medications by name, category, or uses..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 h-12 border-2 border-border focus:border-primary transition-colors"
          />
        </div>

        {/* Medications Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredMedications.map((medication) => {
            const isLowStock = medication.stock < medication.min_stock
            const stockPercentage = (medication.stock / medication.min_stock) * 100

            return (
              <Card
                key={medication.id}
                className={`border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                  isLowStock ? "border-destructive" : "border-border"
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Package className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold text-foreground mb-1">{medication.name}</CardTitle>
                        <Badge variant="secondary" className="text-xs">{medication.category}</Badge>
                      </div>
                    </div>
                    {isLowStock && <AlertTriangle className="h-5 w-5 text-destructive" />}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Uses:</p>
                    <p className="text-sm text-foreground">{medication.uses}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Stock Level</span>
                      <span className={`font-bold ${isLowStock ? "text-destructive" : "text-primary"}`}>
                        {medication.stock} {medication.unit}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${isLowStock ? "bg-destructive" : "bg-primary"}`}
                        style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Minimum required: {medication.min_stock} {medication.unit}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Expiry Date</span>
                      <span className="font-medium text-foreground">{medication.expiry_date}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-2">
                      <span className="text-muted-foreground">ID</span>
                      <span className="font-medium text-foreground">{medication.id}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredMedications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No medications found matching your search.</p>
          </div>
        )}
      </div>

      <TypedAddMedicationDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open)
          if (!open) fetchMedications() // Refresh list after dialog closes
        }}
      />
    </DashboardLayout>
  )
}

export default Medication
