"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { API_URLS, apiPost } from "../lib/api";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export default function PatientDialogue({ open, onClose, onCreated }: Props) {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    age: "",
    phone: "",
    email: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await apiPost(API_URLS.patients, {
        ...form,
        age: Number(form.age),
      });
      onCreated(); // Refresh patient list
      onClose();   // Close dialog
    } catch {
      alert("Failed to create patient");
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Patient</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <Input
            placeholder="First name"
            value={form.first_name}
            onChange={(e) => handleChange("first_name", e.target.value)}
          />
          <Input
            placeholder="Last name"
            value={form.last_name}
            onChange={(e) => handleChange("last_name", e.target.value)}
          />
          <Input
            placeholder="Age"
            type="number"
            value={form.age}
            onChange={(e) => handleChange("age", e.target.value)}
          />
          <Input
            placeholder="Gender"
            value={form.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
          />
          <Input
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          <Input
            placeholder="Email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        <Button className="w-full mt-4" onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Save Patient"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
