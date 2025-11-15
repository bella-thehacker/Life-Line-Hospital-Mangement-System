"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "./DashboardLayout";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Plus, Search, Phone, Mail } from "lucide-react";
import { API_URLS, apiGet } from "../lib/api";
import PatientDialogue from "./PatientDialogue";

interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
}

export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  // Fetch patients from backend
  const fetchPatients = async () => {
    try {
      setLoading(true);
      const data = await apiGet<Patient[]>(API_URLS.patients);
      setPatients(data);
    } catch (err) {
      setError("Failed to fetch patients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const filtered = patients.filter((p) =>
    `${p.first_name} ${p.last_name}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Patients</h1>

        <Button onClick={() => setOpenDialog(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Patient
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
        <Input
          placeholder="Search patients..."
          className="pl-10"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Loading / Error */}
      {loading && <p>Loading patients...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Patients List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <Card key={p.id}>
            <CardHeader>
              <CardTitle>{p.first_name} {p.last_name}</CardTitle>
              <Badge>{p.gender}</Badge>
            </CardHeader>
            <CardContent>
              <p>Age: {p.age}</p>

              <div className="flex items-center mt-2">
                <Phone className="h-4 w-4 mr-2 text-gray-500" />
                <span>{p.phone}</span>
              </div>

              <div className="flex items-center mt-2">
                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                <span>{p.email}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog for creating new patient */}
      <PatientDialogue
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onCreated={fetchPatients}
      />
    </DashboardLayout>
  );
}
