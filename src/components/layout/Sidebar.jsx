import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  AlertTriangle,
  Boxes,
  Wrench,
  FileText,
  ChevronLeft,
  ChevronRight,
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


function Sidebar({ collapsed, setCollapsed }) {


  return (

    <aside
      className={`
        relative
        flex
        h-screen
        flex-col
        border-r
        border-gray-200
        bg-white
        p-6
        transition-all
        duration-300
        ease-in-out

        ${collapsed ? "w-24" : "w-72"}
      `}
    >


      {/* Collapse Button */}

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="
          absolute
          -right-3
          top-10
          flex
          h-7
          w-7
          items-center
          justify-center
          rounded-full
          border
          bg-white
          shadow
          hover:bg-violet-100
        "
      >

        {
          collapsed
          ?
          <ChevronRight size={16}/>
          :
          <ChevronLeft size={16}/>
        }

      </button>



      {/* Logo */}

      <img
        src="/src/assets/newzedlogo.jpg"
        alt="ZED FM Logo"
        className={`
          object-contain
          transition-all
          duration-300

          ${collapsed
            ? "h-12 w-12"
            : "mb-6 h-24 w-full"
          }
        `}
      />



      {/* Title */}

      {!collapsed && (

        <h1 className="mb-10 text-2xl font-normal">
          Technical Operations
        </h1>

      )}



      {/* Navigation */}

      <nav className="flex flex-col gap-2">

        {
          menuItems.map((item)=>{

            const Icon = item.icon;


            return (

              <NavLink
                key={item.name}
                to={item.path}

                className={({isActive})=>
                  `
                  flex
                  items-center
                  rounded-lg
                  px-4
                  py-3
                  transition-all
                  duration-200

                  ${
                    collapsed
                    ?
                    "justify-center"
                    :
                    "gap-3"
                  }

                  ${
                    isActive
                    ?
                    "bg-violet-600 text-white"
                    :
                    "text-gray-700 hover:bg-violet-100 hover:text-violet-600"
                  }

                  `
                }
              >

                <Icon size={22}/>


                {!collapsed && (

                  <span className="text-lg">
                    {item.name}
                  </span>

                )}


              </NavLink>

            )

          })
        }


      </nav>


    </aside>

  );
}


export default Sidebar;