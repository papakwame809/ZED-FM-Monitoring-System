import { apiFetch } from "./apiClient";

function normalizeNotification(notification) {
    
  if (!notification) return null;

  return {
    
    id: notification.id,
    title: notification.title,
    message: notification.message,
    read: Boolean(notification.read ?? notification.is_read),
    createdAt: notification.created_at ?? notification.createdAt,
  };
}

// GET ALL NOTIFICATIONS
export async function getNotifications() {
  const data = await apiFetch("/notifications");
  return Array.isArray(data) ? data.map(normalizeNotification) : [];
}

// MARK AS READ
export async function markNotificationRead(id) {
  const data = await apiFetch(`/notifications/${id}/read`, {
    method: "PUT",
  });
  return normalizeNotification(data);
}

// CLEAR ALL NOTIFICATIONS
export async function clearNotifications() {
  return await apiFetch("/notifications/clear", {
    method: "DELETE",
  });
}