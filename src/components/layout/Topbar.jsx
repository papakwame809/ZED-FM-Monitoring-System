import { Bell } from "lucide-react";
import { useLocation } from "react-router-dom";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/incidents": "Incident Management",
  "/report-incident": "Report Incident",
  "/assets": "Asset Registry",
  "/maintenance": "Maintenance Schedule",
  "/reports": "Reports",
};

function Topbar({ user }) {
  const location = useLocation();

  const title = pageTitles[location.pathname] || "Technical Operations";

  return (
    <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-6">

      {/* Page Title */}
      <h1 className="text-2xl font-bold">
        {title}
      </h1>

      {/* User Section */}
      <div className="flex items-center gap-4">

        <div className="text-right">
          <h2 className="text-lg font-semibold">
            {user.name}
          </h2>

          <p className="text-sm text-gray-500">
            {user.role}
          </p>
        </div>

        <button className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-100">
          <Bell size={22} />
        </button>

      </div>

    </header>
  );
}

export default Topbar;