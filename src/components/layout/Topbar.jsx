import { useEffect, useState } from "react";
import { LogIn, LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import NotificationBell from "../layout/NotificationBell.jsx";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/incidents": "Incident Management",
  "/report-incident": "Report Incident",
  "/assets": "Asset Registry",
  "/maintenance": "Maintenance Schedule",
  "/reports": "Reports",
  "/users": "User Management",
};

function Topbar({ user: propUser }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Always derive user state from local storage on load/change
  const [currentUser, setCurrentUser] = useState(() => {
    return propUser || JSON.parse(localStorage.getItem("user") || "null");
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem("auth_token"));
  });

  // Re-sync user whenever the location changes or an auth event fires
  useEffect(() => {
    const syncUser = () => {
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");
      const token = localStorage.getItem("auth_token");
      setCurrentUser(propUser || storedUser);
      setIsAuthenticated(Boolean(token));
    };

    syncUser();

    window.addEventListener("storage", syncUser);
    window.addEventListener("auth-change", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("auth-change", syncUser);
    };
  }, [location.pathname, propUser]);

  function getPageTitle() {
    const path = location.pathname;
    if (path.startsWith("/incidents/")) return "Incident Details";
    if (path.startsWith("/report-incident/")) return "Edit Incident";
    if (path.startsWith("/assets/")) {
      return path.endsWith("/edit") ? "Edit Asset" : "Asset Details";
    }
    return pageTitles[path] || "Technical Operations";
  }

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("auth-change"));
    navigate("/login");
  };

  return (
    <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-6">
      <h1 className="text-2xl font-bold text-gray-900">{getPageTitle()}</h1>

      <div className="flex items-center gap-5">
        <NotificationBell />

        {/* User Info Display */}
        {isAuthenticated && currentUser ? (
          <div className="text-right">
            <h2 className="text-lg font-semibold text-gray-900 capitalize">
              {currentUser.name}
            </h2>
            <p className="text-sm font-medium text-gray-500 capitalize">
              {currentUser.role || "User"}
            </p>
          </div>
        ) : (
          <div className="text-right">
            <h2 className="text-sm font-medium text-gray-500">Guest User</h2>
          </div>
        )}

        {/* Auth Button */}
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
          >
            <LogOut size={18} />
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white transition hover:bg-violet-600"
          >
            <LogIn size={18} />
            Login
          </button>
        )}
      </div>
    </header>
  );
}

export default Topbar;