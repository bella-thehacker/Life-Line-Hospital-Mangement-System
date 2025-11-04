"use client"

import { useState } from "react"
import { DashboardLayout } from "./DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Badge } from "./ui/badge"
import {
  ShieldCheck,
  UserPlus,
  UserMinus,
  Package,
  Activity,
  Users,
  UserCog,
  Calendar,
  FileText,
  AlertCircle,
  TrendingUp,
} from "lucide-react"
import { ManageStaffDialog } from "./ManageStaff"
import { AddStockDialog } from "./StockDialogue"

interface ActivityLog {
  id: string
  type: "staff" | "patient" | "appointment" | "inventory" | "system"
  action: string
  user: string
  timestamp: string
  details: string
}

const mockActivities: ActivityLog[] = [
  {
    id: "1",
    type: "staff",
    action: "Doctor Added",
    user: "Admin User",
    timestamp: "2024-01-20 09:15 AM",
    details: "Dr. Njoroge Mwangi added to Cardiology department",
  },
  {
    id: "2",
    type: "patient",
    action: "New Patient Registration",
    user: "Reception Desk",
    timestamp: "2024-01-20 09:00 AM",
    details: "Wanjiku Kamau registered as new patient",
  },
  {
    id: "3",
    type: "inventory",
    action: "Stock Added",
    user: "Pharmacy Manager",
    timestamp: "2024-01-20 08:45 AM",
    details: "200 units of Paracetamol added to inventory",
  },
  {
    id: "4",
    type: "appointment",
    action: "Appointment Scheduled",
    user: "Dr. Amina Hassan",
    timestamp: "2024-01-20 08:30 AM",
    details: "Appointment scheduled for Kipchoge Rotich",
  },
  {
    id: "5",
    type: "inventory",
    action: "Low Stock Alert",
    user: "System",
    timestamp: "2024-01-20 08:00 AM",
    details: "Metformin stock below minimum threshold",
  },
  {
    id: "6",
    type: "staff",
    action: "Staff Updated",
    user: "Admin User",
    timestamp: "2024-01-19 05:30 PM",
    details: "Dr. Chebet Koech schedule updated",
  },
  {
    id: "7",
    type: "appointment",
    action: "Appointment Completed",
    user: "Dr. Mutua Musyoka",
    timestamp: "2024-01-19 04:15 PM",
    details: "Surgery consultation completed for Chebet Koech",
  },
  {
    id: "8",
    type: "patient",
    action: "Patient Record Updated",
    user: "Dr. Kimani Kariuki",
    timestamp: "2024-01-19 03:00 PM",
    details: "Medical history updated for Akinyi Odhiambo",
  },
]

const activityIcons = {
  staff: UserCog,
  patient: Users,
  appointment: Calendar,
  inventory: Package,
  system: AlertCircle,
}

const activityColors = {
  staff: { bg: "bg-primary/10", text: "text-primary" },
  patient: { bg: "bg-secondary/10", text: "text-secondary" },
  appointment: { bg: "bg-chart-3/10", text: "text-chart-3" },
  inventory: { bg: "bg-chart-4/10", text: "text-chart-4" },
  system: { bg: "bg-destructive/10", text: "text-destructive" },
}

export default function AdminPage() {
  const [staffDialogOpen, setStaffDialogOpen] = useState(false)
  const [stockDialogOpen, setStockDialogOpen] = useState(false)
  const [activities] = useState<ActivityLog[]>(mockActivities)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground">Admin Control Panel</h2>
            <p className="text-muted-foreground">Manage staff, inventory, and monitor hospital activities</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-2 border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />
                Total Staff
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">24</div>
              <p className="text-xs text-muted-foreground mt-1">6 doctors, 18 staff</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Today's Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">47</div>
              <p className="text-xs text-muted-foreground mt-1">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                12% from yesterday
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Package className="h-4 w-4" />
                Inventory Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">156</div>
              <p className="text-xs text-muted-foreground mt-1">8 items low stock</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Pending Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">5</div>
              <p className="text-xs text-muted-foreground mt-1">Require attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Admin Actions */}
        <Card className="border-2 border-border">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button
                onClick={() => setStaffDialogOpen(true)}
                className="h-24 flex flex-col items-center justify-center gap-2 bg-primary hover:bg-secondary transition-all"
              >
                <UserPlus className="h-6 w-6" />
                <span>Add Staff</span>
              </Button>

              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2 border-2 hover:bg-destructive/10 hover:border-destructive hover:text-destructive transition-all bg-transparent"
              >
                <UserMinus className="h-6 w-6" />
                <span>Remove Staff</span>
              </Button>

              <Button
                onClick={() => setStockDialogOpen(true)}
                className="h-24 flex flex-col items-center justify-center gap-2 bg-secondary hover:bg-primary transition-all"
              >
                <Package className="h-6 w-6" />
                <span>Add Stock</span>
              </Button>

              <Button
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2 border-2 hover:bg-primary/10 hover:border-primary hover:text-primary transition-all bg-transparent"
              >
                <Activity className="h-6 w-6" />
                <span>View Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Activity Monitor */}
        <Card className="border-2 border-border">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Hospital Activity Monitor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-6 h-12 bg-muted/50 border-2 border-border">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="staff">Staff</TabsTrigger>
                <TabsTrigger value="patient">Patients</TabsTrigger>
                <TabsTrigger value="appointment">Appointments</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="system">System</TabsTrigger>
              </TabsList>

              {["all", "staff", "patient", "appointment", "inventory", "system"].map((tab) => (
                <TabsContent key={tab} value={tab} className="mt-6">
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                    {activities
                      .filter((activity) => tab === "all" || activity.type === tab)
                      .map((activity) => {
                        const Icon = activityIcons[activity.type]
                        const colors = activityColors[activity.type]

                        return (
                          <div
                            key={activity.id}
                            className="flex items-start gap-4 p-4 rounded-lg border-2 border-border hover:shadow-md transition-all"
                          >
                            <div className={`p-2 rounded-lg ${colors.bg} shrink-0`}>
                              <Icon className={`h-5 w-5 ${colors.text}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h4 className="font-bold text-foreground">{activity.action}</h4>
                                <Badge variant="secondary" className="text-xs shrink-0">
                                  {activity.type}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{activity.details}</p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {activity.user}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {activity.timestamp}
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <ManageStaffDialog open={staffDialogOpen} onOpenChange={setStaffDialogOpen} />
      <AddStockDialog open={stockDialogOpen} onOpenChange={setStockDialogOpen} />
    </DashboardLayout>
  )
}
