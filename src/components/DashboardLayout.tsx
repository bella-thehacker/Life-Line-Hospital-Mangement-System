// src/components/DashboardLayout.tsx
import React, { type ReactNode, useState } from "react"
import { NavLink } from "react-router-dom"
import { Logo } from "./Logo"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import {
  Users,
  UserCog,
  Calendar,
  Package,
  FileText,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react"
import { cn } from "../lib/utils"

interface DashboardLayoutProps {
  children: ReactNode
}

interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const navigation: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: FileText },
  { name: "Patients", href: "/dashboard/patients", icon: Users },
  { name: "Doctors", href: "/dashboard/doctors", icon: UserCog },
  { name: "Appointments", href: "/dashboard/appointments", icon: Calendar },
  { name: "Inventory", href: "/dashboard/inventory", icon: Package },
  { name: "Admin", href: "/dashboard/admin", icon: ShieldCheck },
]

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-sidebar-border">
            <Logo className="text-sidebar-foreground" />
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="h-5 w-5" strokeWidth={2} />
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              )
            })}
          </nav>

          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 px-4 py-3">
              <Avatar>
                <AvatarImage src="/caring-doctor.png" />
                <AvatarFallback className="bg-primary text-primary-foreground">AD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">Admin User</p>
                <p className="text-xs text-sidebar-foreground/60 truncate">admin@lifeline.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-40 bg-card border-b border-border shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>

            <div className="flex-1 lg:flex-none">
              <h1 className="text-xl font-bold text-foreground">Life Line Hospital</h1>
            </div>

            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/admin-interface.png" />
                <AvatarFallback className="bg-primary text-primary-foreground">AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
    </div>
  )
}
