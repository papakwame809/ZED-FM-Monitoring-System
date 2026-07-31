import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";


function RequireAdmin({ children }) {

  const { user } = useAuth();


  if (!user || user.role?.toLowerCase() !== "admin") {

    alert("This page can only be accessed by Admins.");

    return <Navigate to="/dashboard" replace />;
  }


  return children;
}


export default RequireAdmin;