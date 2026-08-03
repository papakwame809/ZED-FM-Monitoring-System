export const ROLES = {
  ADMIN: "admin",
  TECHNICIAN: "technician",
  VIEWER: "viewer",
};

export function hasRole(user, role) {
  return user?.role?.toLowerCase() === role.toLowerCase();
}