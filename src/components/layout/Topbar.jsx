import { LogIn } from "lucide-react";
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





function Topbar({ user }) {


const location = useLocation();

const navigate = useNavigate();





function getPageTitle(){


const path = location.pathname;





if(path.startsWith("/incidents/")){

    return "Incident Details";

}





if(path.startsWith("/report-incident/")){

    return "Edit Incident";

}





if(path.startsWith("/assets/")){


    if(path.endsWith("/edit")){

        return "Edit Asset";

    }


    return "Asset Details";


}





return (

    pageTitles[path]

    ||

    "Technical Operations"

);


}





return (

<header

className="
flex
h-20
items-center
justify-between
border-b
border-gray-200
bg-white
px-6
"

>


<h1 className="text-2xl font-bold">

{getPageTitle()}

</h1>







<div className="flex items-center gap-5">



{/* Notifications */}

<NotificationBell />







{/* User */}

<div className="text-right">


<h2 className="text-lg font-semibold">

{user?.name}

</h2>



<p className="text-sm text-gray-500">

{user?.role}

</p>


</div>







<button

onClick={()=>navigate("/login")}

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





</div>



</header>

);

}


export default Topbar;