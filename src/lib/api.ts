export const API_URLS = {
  patients: "http://127.0.0.1:8000/api/patients/",
  doctors: "http://127.0.0.1:8000/api/doctors/",
  departments: "/api/departments/",
  appointments: "http://127.0.0.1:8000/api/appointments/",
  inventory: "http://127.0.0.1:8000/api/inventory/",

};

export async function apiGet<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export async function apiPost<T>(url: string, body: any): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Failed to post");
  return res.json();
}

