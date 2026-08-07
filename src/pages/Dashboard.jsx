import { useEffect, useState } from "react";

import DashboardHeader from "../cards/DashboardHeader";
import SummaryCards from "../cards/SummaryCards";
import IncidentTable from "../cards/IncidentTable";
import EquipmentStatus from "../cards/EquipmentStatus";
import MaintenanceTable from "../cards/MaintenanceTable";

import { getIncidents } from "../api/incidentsApi";
import { getAssets } from "../api/assetsApi";
import { getMaintenanceRecords } from "../api/maintenanceApi";


function Dashboard() {


const [incidents,setIncidents] = useState([]);

const [assets,setAssets] = useState([]);

const [maintenance,setMaintenance] = useState([]);


const [loading,setLoading] = useState(true);



useEffect(()=>{


async function loadDashboard(){


try{


const [
    incidentsData,
    assetsData,
    maintenanceData

] = await Promise.all([


    getIncidents(),

    getAssets(),

    getMaintenanceRecords()


]);



setIncidents(incidentsData);

setAssets(assetsData);

setMaintenance(maintenanceData);



}

catch(err){


console.error(
    "Dashboard loading error:",
    err
);


}


finally{


setLoading(false);


}



}



loadDashboard();


},[]);






if(loading){

return (

<div className="p-10 text-gray-600">

Loading dashboard...

</div>

);

}







const activeIncidents = incidents.filter(

(incident)=>

    incident.status !== "Resolved" &&

    incident.status !== "Fixed"


).length;







const totalAssets = assets.length;







const maintenanceDue = assets.filter(

(asset)=>

    asset.status === "Maintenance Due"


).length;







const systemStatus = assets.some(

(asset)=>

    asset.status === "Faulty"


)

?

"Attention Required"

:

"Operational";









return (

<div className="space-y-8">


<DashboardHeader />





<SummaryCards


activeIncidents={activeIncidents}


totalAssets={totalAssets}


maintenanceDue={maintenanceDue}


systemStatus={systemStatus}


/>







<IncidentTable

incidents={incidents}

isAdmin={false}

/>







<EquipmentStatus

assets={assets}

/>








<MaintenanceTable

maintenance={maintenance}

/>





</div>

);


}


export default Dashboard;