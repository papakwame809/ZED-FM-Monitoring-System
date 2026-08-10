import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";

function RequireAuth({ children }) {
  const { token, user } = useAuth();
  const location = useLocation();

  // Read directly from localStorage to ensure stale/empty context state doesn't leak
  const activeToken = token || localStorage.getItem("auth_token");
  const activeUser = user || JSON.parse(localStorage.getItem("user") || "null");

  if (!activeToken || !activeUser) {
    // Force redirect to login and preserve attempted path
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;