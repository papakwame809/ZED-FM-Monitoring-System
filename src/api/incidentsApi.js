import { apiFetch } from "./apiClient";

function normalizeIncident(incident) {
  if (!incident) return null;
  return {
    id: incident.id,
    assetId: incident.asset_id ? String(incident.asset_id) : (incident.assetId ? String(incident.assetId) : ""),
    title: incident.title || "",
    description: incident.description || "",
    status: incident.status || "Open",
    severity: incident.severity || "",
    technician: incident.technician || "",
    incidentDate: incident.incident_date || incident.incidentDate || "",
    createdAt: incident.created_at,
    updatedAt: incident.updated_at,
    asset: incident.asset || null,
  };
}

function formatPayload(incident) {
  return {
    asset_id: incident.assetId ? Number(incident.assetId) : null,
    title: incident.title,
    description: incident.description || null,
    status: incident.status ? incident.status.toLowerCase() : "open",
    severity: incident.severity ? incident.severity.toLowerCase() : "low",
    technician: incident.technician || null,
    incident_date: incident.incidentDate || null,
  };
}

// GET ALL INCIDENTS
export async function getIncidents() {
  const response = await apiFetch("/incidents");
  const data = Array.isArray(response) ? response : (response?.data || []);
  return data.map(normalizeIncident);
}

// GET SINGLE INCIDENT
export async function getIncident(id) {
  const response = await apiFetch(`/incidents/${id}`);
  const data = response?.data || response;
  return normalizeIncident(data);
}

// CREATE INCIDENT
export async function createIncident(incidentData) {
  const payload = formatPayload(incidentData);
  const response = await apiFetch("/incidents", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  const data = response?.data || response;
  return normalizeIncident(data);
}

// UPDATE INCIDENT
export async function updateIncident(id, incidentData) {
  const payload = formatPayload(incidentData);
  const response = await apiFetch(`/incidents/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  const data = response?.data || response;
  return normalizeIncident(data);
}

// DELETE INCIDENT
export async function deleteIncident(id) {
  return await apiFetch(`/incidents/${id}`, {
    method: "DELETE",
  });
}