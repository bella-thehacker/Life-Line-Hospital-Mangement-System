"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Logo } from "./Logo"
import { Stethoscope, Heart } from "lucide-react"

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // For demo purposes, navigate to dashboard
    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Retro Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 to-secondary/10 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 400 400">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="relative">
            <Stethoscope className="h-48 w-48 text-secondary/60" strokeWidth={1.5} />
            <Heart className="h-24 w-24 text-primary absolute -bottom-4 -right-4 animate-pulse" strokeWidth={2} />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-bold text-foreground">Welcome Back</h2>
            <p className="text-lg text-muted-foreground italic">Reliable care. Timeless trust.</p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Logo className="justify-center mb-6" />
            <h1 className="text-3xl font-bold text-foreground mb-2">Sign In</h1>
            <p className="text-muted-foreground">Enter your credentials to access the system</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="doctor@lifeline.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 border-2 border-border focus:border-primary transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 border-2 border-border focus:border-primary transition-colors"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg font-semibold bg-primary hover:bg-secondary transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Sign In
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            <p>Demo credentials: Any email and password</p>
          </div>
        </div>
      </div>
    </div>
  )
}
