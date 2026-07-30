import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import DashboardLayout from "./components/layout/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Incidents from "./pages/Incidents";
import ReportIncident from "./pages/ReportIncident";
import AssetRegistry from "./pages/AssetRegistry";
import AssetDetails from "./pages/AssetDetails";
import MaintenanceSchedule from "./pages/MaintenanceSchedule";
import Reports from "./pages/Reports";
import Login from "./pages/Login";


function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* Default route */}
        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />


        {/* Login page - no dashboard layout */}
        <Route
          path="/login"
          element={<Login />}
        />


        {/* Dashboard application */}
        <Route element={<DashboardLayout />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />


          <Route
            path="/incidents"
            element={<Incidents />}
          />


          <Route
            path="/report-incident"
            element={<ReportIncident />}
          />


          <Route
            path="/assets"
            element={<AssetRegistry />}
          />


          <Route
            path="/assets/:id"
            element={<AssetDetails />}
          />


          <Route
            path="/maintenance"
            element={<MaintenanceSchedule />}
          />


          <Route
            path="/reports"
            element={<Reports />}
          />

        </Route>


        {/* Catch unknown routes */}
        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}


export default App;