import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UnitDashboard from "./pages/unit/UnitDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";
import TrackIncident from "./pages/citizen/TrackIncident";
import ReportIncident from "./pages/citizen/ReportIncident";

import MyIncidents from "./pages/citizen/MyIncidents";
import AdminIncidents from "./pages/admin/AdminIncidents";
import AdminUnits from "./pages/admin/AdminUnits";

import CreateUnit from "./pages/admin/CreateUnit";
import UnitLogin from "./pages/unit/UnitLogin";

function App() {

  return (

    <Routes>

      {/* Public Routes */}

      <Route
        path="/"
        element={<LandingPage />}
      />

      <Route
        path="/unit/login"
        element={<UnitLogin />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      {/* Citizen */}

      <Route
        path="/citizen/dashboard"
        element={

          <ProtectedRoute
            allowedRoles={["citizen"]}
          >

            <CitizenDashboard />

          </ProtectedRoute>

        }
      />

      <Route
        path="/citizen/report"
        element={
          <ProtectedRoute
            allowedRoles={["citizen"]}
          >
            <ReportIncident />
          </ProtectedRoute>
        }
      />

      <Route
        path="/citizen/my-incidents"
        element={
          <ProtectedRoute allowedRoles={["citizen"]}>
            <MyIncidents />
          </ProtectedRoute>
        }
      />

      <Route
        path="/citizen/track"
        element={
          <ProtectedRoute allowedRoles={["citizen"]}>
            <TrackIncident />
          </ProtectedRoute>
        }
      />

      {/* Admin */}

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute
            allowedRoles={["admin"]}
          >
            <AdminDashboard />
          </ProtectedRoute>

        }
      />

      <Route
        path="/admin/incidents"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminIncidents />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/units"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminUnits />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/create-unit"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <CreateUnit />
          </ProtectedRoute>
        }
      />

      {/* Unit */}

      <Route
        path="/unit/dashboard"
        element={

          <ProtectedRoute
            allowedRoles={["unit"]}
          >

            <UnitDashboard />

          </ProtectedRoute>

        }
      />

    </Routes>

    

  );

}

export default App;