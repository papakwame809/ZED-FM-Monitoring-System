import DashboardHeader from "../cards/DashboardHeader";
import SummaryCards from "../cards/SummaryCards";
import IncidentTable from "../cards/IncidentTable";
import EquipmentStatus from "../cards/EquipmentStatus";
import MaintenanceTable from "../cards/MaintenanceTable";
import incidentsData from "../data/incidents";
import assetsData from "../data/assets";
import maintenanceData from "../data/maintenance";

function Dashboard() {

  const incidents =

    JSON.parse(
      localStorage.getItem("incidents")
    )
    ||
    incidentsData;

  const assets =

    JSON.parse(
      localStorage.getItem("assets")
    )
    ||
    assetsData;

  const maintenance =

    JSON.parse(
      localStorage.getItem("maintenance")
    )
    ||
    maintenanceData;

  const activeIncidents = incidents.filter(

    (incident) =>

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