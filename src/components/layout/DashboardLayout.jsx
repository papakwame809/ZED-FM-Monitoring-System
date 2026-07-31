import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../auth/useAuth";


function DashboardLayout() {

  const [collapsed, setCollapsed] = useState(false);

  const { user } = useAuth();


  return (
    <div className="flex h-screen overflow-auto bg-gray-100">

      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />


      {/* Main Area */}
      <div className="flex flex-1 flex-col">

        {/* Topbar */}
        <Topbar
          title="Dashboard"
          user={user}
        />


        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
}


export default DashboardLayout;