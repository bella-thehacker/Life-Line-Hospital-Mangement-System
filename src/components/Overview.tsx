"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

const data = [
  { month: "Jan", visits: 186 },
  { month: "Feb", visits: 205 },
  { month: "Mar", visits: 237 },
  { month: "Apr", visits: 273 },
  { month: "May", visits: 209 },
  { month: "Jun", visits: 264 },
  { month: "Jul", visits: 298 },
  { month: "Aug", visits: 312 },
  { month: "Sep", visits: 287 },
  { month: "Oct", visits: 345 },
  { month: "Nov", visits: 321 },
  { month: "Dec", visits: 289 },
]

export function OverviewChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "2px solid hsl(var(--border))",
            borderRadius: "0.75rem",
            color: "hsl(var(--foreground))",
          }}
          cursor={{ fill: "hsl(var(--muted))", opacity: 0.2 }}
        />
        <Bar dataKey="visits" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
