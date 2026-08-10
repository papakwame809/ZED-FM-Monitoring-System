import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

function RequireAdmin({ children }) {
  const { user } = useAuth();
  const activeUser = user || JSON.parse(localStorage.getItem("user") || "null");

  if (!activeUser || activeUser.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default RequireAdmin;