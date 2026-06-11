import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";

import PrimaryButton from "../../components/ui/PrimaryButton";

import StatCard from "../../components/ui/StatCard";

import { useAuth } from "../../context/AuthContext";

import { useState, useEffect } from "react";

import toast from "react-hot-toast";

import api from "../../services/api";

const AdminDashboard = () => {

  const navigate = useNavigate();

  const { user } = useAuth();

  const [stats, setStats] = useState({

  totalIncidents: 0,

  activeIncidents: 0,

  resolvedIncidents: 0,

  availableUnits: 0,

});

const fetchDashboardData = async () => {

  try {

    const incidentsRes =
      await api.get("/incidents");

    const unitsRes =
      await api.get("/units");

    const incidents =
      incidentsRes.data.data;

    const units =
      unitsRes.data.data;

    const totalIncidents =
      incidents.length;

    const resolvedIncidents =
      incidents.filter(

        (incident) =>

          incident.status === "RESOLVED"

      ).length;

    const activeIncidents =
      totalIncidents - resolvedIncidents;

    const availableUnits =
      units.filter(

        (unit) => unit.availability

      ).length;

    setStats({

      totalIncidents,

      activeIncidents,

      resolvedIncidents,

      availableUnits,

    });

  } catch {

    toast.error(
      "Failed to load dashboard"
    );

  }

};

useEffect(() => {

  fetchDashboardData();

}, []);

  return (

    <DashboardLayout>

      <div className="mb-8">

        <h1 className="text-4xl font-bold">

          Welcome,

          {" "}

          {user?.name}

          👋

        </h1>

        <p className="mt-2 text-gray-600">

          Monitor incidents, manage emergency
          units and coordinate city response.

        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard

          title="Total Incidents"

          value={stats.totalIncidents}

        />

        <StatCard

          title="Active Incidents"

          value={stats.activeIncidents}

        />

        <StatCard

          title="Resolved"

          value={stats.resolvedIncidents}

        />

        <StatCard

          title="Available Units"

          value={stats.availableUnits}

        />

      </div>

      <div className="mt-10 rounded-xl bg-white p-6 shadow">

        <h2 className="mb-5 text-2xl font-semibold">

          Quick Actions

        </h2>

        <div className="flex flex-wrap gap-4">

          <PrimaryButton
            onClick={() =>
              navigate(
                "/admin/incidents"
              )
            }
          >
            View Incidents
          </PrimaryButton>

          <PrimaryButton
            onClick={() =>
              navigate(
                "/admin/units"
              )
            }
          >
            Manage Units
          </PrimaryButton>

        </div>

      </div>

      <div className="mt-10 rounded-xl bg-white p-6 shadow">

        <h2 className="mb-4 text-2xl font-semibold">

          Recent Activity

        </h2>

        <div className="rounded-lg border border-dashed p-10 text-center text-gray-500">

          No recent activity.

        </div>

      </div>

    </DashboardLayout>

  );

};

export default AdminDashboard;