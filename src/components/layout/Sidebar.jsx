import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  AlertTriangle,
  Boxes,
  Wrench,
  FileText,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Incidents",
    path: "/incidents",
    icon: AlertTriangle,
  },
  {
    name: "Assets",
    path: "/assets",
    icon: Boxes,
  },
  {
    name: "Maintenance",
    path: "/maintenance",
    icon: Wrench,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: FileText,
  },
];

function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-gray-200 bg-white p-6">

      {/* Logo */}
      <img
        src="/logo.png"
        alt="ZED FM Logo"
        className="mb-6 h-24 w-full object-contain"
      />

      {/* System Title */}
      <h1 className="mb-10 text-2xl font-normal">
        Technical Operations
      </h1>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-lg transition-all duration-200 ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "text-gray-700 hover:bg-lightgray-100 hover:text-violet-600"
                }`
              }
            >
              <Icon size={22} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}

      </nav>

    </aside>
  );
}

export default Sidebar;