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








        {/* Protected Routes */}

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







          {/* INCIDENTS */}

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









          {/* ASSETS */}

          <Route

            path="/assets"

            element={<AssetRegistry />}

          />


          <Route

            path="/assets/:id"

            element={<AssetDetails />}

          />









          {/* ADMIN */}

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

        {/* Catch all */}

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