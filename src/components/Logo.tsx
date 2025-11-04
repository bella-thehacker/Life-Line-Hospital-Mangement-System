import { Activity } from "lucide-react"

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Activity className="h-8 w-8 text-secondary" strokeWidth={2.5} />
      <div className="flex flex-col">
        <span className="text-2xl font-bold tracking-tight text-foreground">Life Line</span>
        <span className="text-xs text-muted-foreground tracking-wide uppercase">Hospital Management</span>
      </div>
    </div>
  )
}
