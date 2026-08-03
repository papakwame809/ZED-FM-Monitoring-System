import { Bell, LogIn } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/incidents": "Incident Management",
  "/report-incident": "Report Incident",
  "/assets": "Asset Registry",
  "/maintenance": "Maintenance Schedule",
  "/reports": "Reports",
  "/users": "User Management",
};

function Topbar({ user }) {

  const location = useLocation();
  const navigate = useNavigate();

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



        {/* Login Button */}

        <button
          onClick={() => navigate("/login")}
          className="
            flex
            items-center
            gap-2
            rounded-lg
            bg-black
            px-4
            py-2
            text-white
            transition
            hover:bg-violet-600
          "
        >

          <LogIn size={18}/>

          Login

        </button>



        {/* Notification */}

        <button
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            transition
            hover:bg-gray-100
          "
        >

          <Bell size={22}/>

        </button>


      </div>


    </header>
  );
}

export default Topbar;