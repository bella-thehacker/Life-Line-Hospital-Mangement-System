"use client"

import React, { useState, ChangeEvent } from "react"
import { DashboardLayout } from "./DashboardLayout"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Package, Search, AlertTriangle, Plus } from "lucide-react"
import { AddMedicationDialog } from "./MedicationDialogue"

// Define the Medication type
export interface Medication {
  id: string
  name: string
  category: string
  uses: string
  stock: number
  minStock: number
  unit: string
  expiryDate: string
}

// Mock data
const mockMedications: Medication[] = [
  {
    id: "M001",
    name: "Paracetamol",
    category: "Analgesic",
    uses: "Pain relief and fever reduction",
    stock: 450,
    minStock: 200,
    unit: "tablets",
    expiryDate: "2025-06-15",
  },
  {
    id: "M002",
    name: "Amoxicillin",
    category: "Antibiotic",
    uses: "Bacterial infections treatment",
    stock: 180,
    minStock: 150,
    unit: "capsules",
    expiryDate: "2024-12-20",
  },
  {
    id: "M003",
    name: "Ibuprofen",
    category: "Anti-inflammatory",
    uses: "Pain, inflammation, and fever reduction",
    stock: 320,
    minStock: 200,
    unit: "tablets",
    expiryDate: "2025-03-10",
  },
  {
    id: "M004",
    name: "Metformin",
    category: "Antidiabetic",
    uses: "Type 2 diabetes management",
    stock: 95,
    minStock: 100,
    unit: "tablets",
    expiryDate: "2025-08-22",
  },
  {
    id: "M005",
    name: "Omeprazole",
    category: "Proton Pump Inhibitor",
    uses: "Acid reflux and ulcer treatment",
    stock: 210,
    minStock: 150,
    unit: "capsules",
    expiryDate: "2025-01-30",
  },
  {
    id: "M006",
    name: "Ciprofloxacin",
    category: "Antibiotic",
    uses: "Bacterial infections, UTI treatment",
    stock: 75,
    minStock: 100,
    unit: "tablets",
    expiryDate: "2024-11-15",
  },
  {
    id: "M007",
    name: "Artemether-Lumefantrine",
    category: "Antimalarial",
    uses: "Malaria treatment",
    stock: 280,
    minStock: 200,
    unit: "tablets",
    expiryDate: "2025-09-05",
  },
  {
    id: "M008",
    name: "Salbutamol Inhaler",
    category: "Bronchodilator",
    uses: "Asthma and breathing difficulties",
    stock: 45,
    minStock: 50,
    unit: "inhalers",
    expiryDate: "2025-04-18",
  },
]

// Props expected by AddMedicationDialog
interface AddMedicationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Extend imported AddMedicationDialog with prop typing (if not already typed)
const TypedAddMedicationDialog = AddMedicationDialog as React.FC<AddMedicationDialogProps>

const Medication: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [medications] = useState<Medication[]>(mockMedications)

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value)
  }

  const filteredMedications = medications.filter(
    (med) =>
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.uses.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const lowStockCount = medications.filter((med) => med.stock < med.minStock).length

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
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Medications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{medications.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Different types</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Stock
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {medications.reduce((sum, med) => sum + med.stock, 0)}
              </div>
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
            const isLowStock = medication.stock < medication.minStock
            const stockPercentage = (medication.stock / medication.minStock) * 100

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
                        <CardTitle className="text-lg font-bold text-foreground mb-1">
                          {medication.name}
                        </CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          {medication.category}
                        </Badge>
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
                      <span
                        className={`font-bold ${
                          isLowStock ? "text-destructive" : "text-primary"
                        }`}
                      >
                        {medication.stock} {medication.unit}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          isLowStock ? "bg-destructive" : "bg-primary"
                        }`}
                        style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Minimum required: {medication.minStock} {medication.unit}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Expiry Date</span>
                      <span className="font-medium text-foreground">{medication.expiryDate}</span>
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

      <TypedAddMedicationDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </DashboardLayout>
  )
}

export default Medication
