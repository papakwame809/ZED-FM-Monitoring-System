import DashboardHeader from "../cards/DashboardHeader";
import SummaryCards from "../cards/SummaryCards";
import IncidentTable from "../cards/IncidentTable";
import EquipmentStatus from "../cards/EquipmentStatus";
import MaintenanceTable from "../cards/MaintenanceTable";


function Dashboard() {
  return (
    <div className="space-y-8">

      <DashboardHeader />

      <SummaryCards />

      <IncidentTable />

      <EquipmentStatus />

      <MaintenanceTable />

    </div>
  );
}


export default Dashboard;