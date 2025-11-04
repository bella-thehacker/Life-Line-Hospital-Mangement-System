import React from "react"
import { Routes, Route } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import PatientsPage from "./components/Patients"
import DoctorsPage from "./components/Doctor"
import AppointmentsPage from "./components/Appointment"
import Medication from "./components/Medication"
import AdminPage from "./components/AdminPage"
import LoginPage from "./components/LoginPage"

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/patients" element={<PatientsPage />} />
      <Route path="/dashboard/doctors" element={<DoctorsPage />} />
      <Route path="/dashboard/appointments" element={<AppointmentsPage />} />
      <Route path="/dashboard/inventory" element={<Medication />} />
      <Route path="/dashboard/admin" element={<AdminPage />} />
    </Routes>
  )
}

export default App
