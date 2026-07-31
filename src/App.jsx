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
import Users from "./pages/Users";

import RequireAuth from "./auth/RequireAuth";
import RequireAdmin from "./auth/RequireAdmin";


function App() {

  return (

    <BrowserRouter>

      <Routes>


        {/* Default route */}

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />



        {/* Login */}

        <Route
          path="/login"
          element={<Login />}
        />



        {/* Protected dashboard */}

        <Route

          element={
            <RequireAuth>
              <DashboardLayout />
            </RequireAuth>
          }

        >


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



          {/* Admin only */}

          <Route

            path="/maintenance"

            element={
              <RequireAdmin>
                <MaintenanceSchedule />
              </RequireAdmin>
            }

          />



          <Route

            path="/users"

            element={
              <RequireAdmin>
                <Users />
              </RequireAdmin>
            }

          />



          <Route
            path="/reports"
            element={<Reports />}
          />


        </Route>



        {/* Unknown routes */}

        <Route

          path="*"

          element={
            <Navigate
              to="/login"
              replace
            />
          }

        />


      </Routes>


    </BrowserRouter>

  );

}


export default App;