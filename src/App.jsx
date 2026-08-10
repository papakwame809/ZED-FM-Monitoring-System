import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./auth/AuthProvider";
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
import TestAssets from "./pages/TestAssets";

import RequireAuth from "./auth/RequireAuth";
import RequireAdmin from "./auth/RequireAdmin";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Root & Login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Application Wrapper */}
          <Route
            element={
              <RequireAuth>
                <DashboardLayout />
              </RequireAuth>
            }
          >
            {/* Core Pages */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Incidents */}
            <Route path="/incidents" element={<Incidents />} />
            <Route path="/incidents/:id" element={<IncidentDetails />} />
            <Route path="/report-incident" element={<ReportIncident />} />
            <Route path="/report-incident/:id" element={<ReportIncident />} />

            {/* Assets */}
            <Route path="/assets" element={<AssetRegistry />} />
            <Route path="/assets/:id/edit" element={<AssetRegistry />} />
            <Route path="/assets/:id" element={<AssetDetails />} />
            <Route path="/test-assets" element={<TestAssets />} />

            {/* Admin-Only Pages */}
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

            <Route path="/reports" element={<Reports />} />

            {/* Protected Catch-all inside layout */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;