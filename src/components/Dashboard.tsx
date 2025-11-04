import React from "react"
import { DashboardLayout } from "./DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Users, UserCog, Calendar, TrendingUp, LucideIcon } from "lucide-react"
import { OverviewChart } from "./Overview"
import { RecentActivity } from "./RecentActivity"

interface Stat {
  title: string
  value: string
  change: string
  icon: LucideIcon
  color: string
  bgColor: string
}

const Dashboard: React.FC = () => {
  const stats: Stat[] = [
    {
      title: "Total Patients",
      value: "1,284",
      change: "+12.5%",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Active Doctors",
      value: "48",
      change: "+2 this month",
      icon: UserCog,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Appointments Today",
      value: "32",
      change: "8 pending",
      icon: Calendar,
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      title: "Patient Satisfaction",
      value: "94%",
      change: "+3.2% from last month",
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h2>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card
                key={stat.title}
                className="border-2 border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} strokeWidth={2} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-7">
          <Card className="lg:col-span-4 border-2 border-border">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground">
                Patient Visits Overview
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Monthly patient visit trends
              </p>
            </CardHeader>
            <CardContent>
              <OverviewChart />
            </CardContent>
          </Card>

          <Card className="lg:col-span-3 border-2 border-border">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground">
                Recent Activity
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Latest system updates
              </p>
            </CardHeader>
            <CardContent>
              <RecentActivity />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
