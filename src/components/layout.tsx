import React, { Suspense } from "react"
import "./App.css"
import "./globals.css"

// Import your components here
import { RecentActivity } from "./RecentActivity"
import  Medication  from "./Medication"

function App() {
  return (
    <div className="min-h-screen font-sans antialiased bg-gray-50 text-gray-900">
      <header className="py-6 text-center border-b border-gray-200 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-primary">
          Life Line Hospital Management System
        </h1>
        <p className="text-sm text-gray-600">Reliable care. Timeless trust.</p>
      </header>

      <main className="p-6 space-y-6 max-w-4xl mx-auto">
        <Suspense fallback={<p>Loading...</p>}>
          <Medication />
          <RecentActivity />
        </Suspense>
      </main>

      <footer className="py-4 text-center text-sm text-gray-500 border-t">
        © {new Date().getFullYear()} Life Line Hospital
      </footer>
    </div>
  )
}

export default App
