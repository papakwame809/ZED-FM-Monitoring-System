import { apiFetch } from "./apiClient";

const formatMaintenancePayload = (data) => ({
  ...data,
  scheduled_date: data.scheduled_date || null,
  completed_date: data.completed_date || null,
});

export async function getMaintenanceRecords() {
  return apiFetch("/maintenance");
}

export async function createMaintenanceRecord(recordData) {
  return apiFetch("/maintenance", {
    method: "POST",
    body: JSON.stringify(formatMaintenancePayload(recordData)),
  });
}

export async function updateMaintenanceRecord(id, recordData) {
  return apiFetch(`/maintenance/${id}`, {
    method: "PUT",
    body: JSON.stringify(formatMaintenancePayload(recordData)),
  });
}

export async function deleteMaintenanceRecord(id) {
  return apiFetch(`/maintenance/${id}`, {
    method: "DELETE",
  });
}

// Aliases to match component imports seamlessly
export const createMaintenance = createMaintenanceRecord;
export const updateMaintenance = updateMaintenanceRecord;
export const deleteMaintenance = deleteMaintenanceRecord;