import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { ROLES, hasRole } from "./roles";


function RequireAdmin({ children }) {

  const { user } = useAuth();


  if (!hasRole(user, ROLES.ADMIN)) {

  alert("This page can only be accessed by Admins.");

  return <Navigate to="/dashboard" />;

}

  return children;
}


export default RequireAdmin;