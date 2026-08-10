import { apiFetch } from "./apiClient";

const formatPayload = (data) => ({
  name: data.name,
  type: data.type,
  location: data.location,
  status: data.status || "Operational",
  serial_number: data.serial_number || data.serialNumber || null,
  purchase_date: data.purchase_date || data.purchaseDate || null,
  last_service: data.last_service || data.lastService || null,
  warranty: data.warranty || null,
});

export async function getAssets() {
  return apiFetch("/assets");
}

export async function getAsset(id) {
  return apiFetch(`/assets/${id}`);
}

export async function createAsset(data) {
  return apiFetch("/assets", {
    method: "POST",
    body: JSON.stringify(formatPayload(data)),
  });
}

export async function updateAsset(id, data) {
  return apiFetch(`/assets/${id}`, {
    method: "PUT",
    body: JSON.stringify(formatPayload(data)),
  });
}

export async function deleteAsset(id) {
  return apiFetch(`/assets/${id}`, {
    method: "DELETE",
  });
}