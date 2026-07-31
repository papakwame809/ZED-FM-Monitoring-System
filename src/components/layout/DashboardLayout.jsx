import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import user from "../../data/user";

import { Outlet } from "react-router-dom";
import { useState } from "react";


function DashboardLayout() {

  const [collapsed, setCollapsed] = useState(false);


  return (
    <div className="flex h-screen overflow-auto bg-gray-100">

      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />


      {/* Main Area */}
      <div className="flex flex-1 flex-col">

        <Topbar
          title="Dashboard"
          user={user}
        />


        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
}


export default DashboardLayout;