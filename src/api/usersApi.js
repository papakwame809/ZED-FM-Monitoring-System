import { apiFetch } from "./apiClient";

function normalizeUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role || "viewer",
    status: user.status || "active",
    createdAt: user.created_at,
  };
}

// GET ALL USERS
export async function getUsers() {
  const data = await apiFetch("/users");
  return Array.isArray(data) ? data.map(normalizeUser) : [];
}

// UPDATE USER ROLE / DETAILS
export async function updateUser(id, userData) {
  const data = await apiFetch(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      name: userData.name,
      email: userData.email,
      role: userData.role,
    }),
  });
  return normalizeUser(data.user ?? data);
}