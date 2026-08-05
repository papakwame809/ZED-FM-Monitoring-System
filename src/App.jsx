import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


import DashboardLayout from "./components/layout/DashboardLayout";


import Dashboard from "./pages/Dashboard";

import Incidents from "./pages/Incidents";
import IncidentDetails from "./pages/IncidentDetails";
import ReportIncident from "./pages/ReportIncident";


import AssetRegistry from "./pages/AssetRegistry";
import AssetDetails from "./pages/AssetDetails";


import MaintenanceSchedule from "./pages/MaintenanceSchedule";
import Reports from "./pages/Reports";
import Users from "./pages/Users";
import Login from "./pages/Login";


import RequireAuth from "./auth/RequireAuth";
import RequireAdmin from "./auth/RequireAdmin";





function App(){


  return (

    <BrowserRouter>

      <Routes>


        {/* Default */}

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







        {/* Protected Application */}

        <Route

          element={

            <RequireAuth>

              <DashboardLayout />

            </RequireAuth>

          }

        >






          {/* Dashboard */}

          <Route

            path="/dashboard"

            element={<Dashboard />}

          />







          {/* Incidents */}

          <Route

            path="/incidents"

            element={<Incidents />}

          />



          <Route

            path="/incidents/:id"

            element={<IncidentDetails />}

          />



          <Route

            path="/report-incident"

            element={<ReportIncident />}

          />


          <Route

            path="/report-incident/:id"

            element={<ReportIncident />}

          />









          {/* Assets */}


          <Route

            path="/assets"

            element={<AssetRegistry />}

          />



          {/* IMPORTANT:
              Must come BEFORE /assets/:id
          */}

          <Route

            path="/assets/:id/edit"

            element={<AssetRegistry />}

          />



          <Route

            path="/assets/:id"

            element={<AssetDetails />}

          />









          {/* Admin */}

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