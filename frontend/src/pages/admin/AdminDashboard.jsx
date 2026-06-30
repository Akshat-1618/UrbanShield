import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/layout/DashboardLayout";
import PrimaryButton from "../../components/ui/PrimaryButton";
import StatCard from "../../components/ui/StatCard";
import CityMap from "../../components/map/CityMap";

import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import socket from "../../services/socket";

const AdminDashboard = () => {

  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalIncidents: 0,
    activeIncidents: 0,
    resolvedIncidents: 0,
    availableUnits: 0,
  });

  const [units, setUnits] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [priorityQueue, setPriorityQueue] = useState([]);

  useEffect(() => {

    fetchDashboardData();

    socket.on(
      "incidentUpdated",
      fetchDashboardData
    );

    return () => {

      socket.off(
        "incidentUpdated",
        fetchDashboardData
      );

    };

  }, []);

  const fetchDashboardData = async () => {

    try {

      const [
        incidentsRes,
        unitsRes,
        pendingRes,
      ] = await Promise.all([
        api.get("/incidents"),
        api.get("/units"),
        api.get("/incidents/pending"),
      ]);

      const incidents =
        incidentsRes.data.data;

      const units =
        unitsRes.data.data;

      setIncidents(incidents);
      setUnits(units);
      setPriorityQueue(
        pendingRes.data.data
      );

      setStats({
        totalIncidents: incidents.length,
        activeIncidents: incidents.filter(
          (incident) =>
            incident.status !== "RESOLVED"
        ).length,
        resolvedIncidents: incidents.filter(
          (incident) =>
            incident.status === "RESOLVED"
        ).length,
        availableUnits: units.filter(
          (unit) => unit.availability
        ).length,
      });

    }

    catch {

      toast.error(
        "Failed to load dashboard"
      );

    }

    finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (
      <DashboardLayout>
        <h2>Loading...</h2>
      </DashboardLayout>
    );

  }

  return (

    <DashboardLayout>

      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">

          Emergency Command Center

        </p>

        <h1 className="mt-2 text-4xl font-bold text-slate-900">

          Welcome, {user?.name} 👋

        </h1>

        <p className="mt-3 text-slate-500">

          Monitor incidents, dispatch emergency units and coordinate city-wide response in real time.

        </p>

      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

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

      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-5">

          <h2 className="text-2xl font-bold text-slate-900">

            Live City Map

          </h2>

          <p className="mt-1 text-slate-500">

            View all active incidents and emergency unit locations.

          </p>

        </div>

        <CityMap
          units={units}
          incidents={incidents}
          showNodes={true}
        />

      </div>

      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <h2 className="mb-6 text-2xl font-bold">

          Priority Dispatch Queue

        </h2>

        {priorityQueue.length === 0 ? (

          <div className="rounded-2xl border border-dashed p-10 text-center text-slate-500">

            🎉 No pending incidents.

          </div>

        ) : (

          <div className="space-y-4">

            {priorityQueue.map(
              (incident, index) => (

                <div
                  key={incident._id}
                  className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-5 transition hover:shadow-md md:flex-row md:items-center md:justify-between"
                >

                  <div>

                    <h3 className="text-xl font-bold text-slate-900">

                      #{index + 1} {incident.title}

                    </h3>

                    <p className="mt-1 text-slate-500">

                      {incident.type}

                    </p>

                  </div>

                  <div className="flex items-center gap-4">

                    <span className="rounded-full bg-red-100 px-4 py-2 font-semibold text-red-700">

                      Severity {incident.severity}

                    </span>

                    <span className="rounded-full bg-slate-100 px-4 py-2 text-slate-700">

                      📍 {incident.location.areaName}

                    </span>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <h2 className="mb-6 text-2xl font-bold">

          Quick Actions

        </h2>

        <div className="flex flex-wrap gap-4">

          <PrimaryButton
            onClick={() =>
              navigate("/admin/incidents")
            }
          >
            Manage Incidents
          </PrimaryButton>

          <PrimaryButton
            onClick={() =>
              navigate("/admin/units")
            }
          >
            Manage Units
          </PrimaryButton>

          <PrimaryButton
            onClick={() =>
              navigate("/admin/create-unit")
            }
          >
            Create Unit
          </PrimaryButton>

        </div>

      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <h2 className="mb-5 text-2xl font-bold">

          System Status

        </h2>

        <div className="grid gap-4 md:grid-cols-3">

          <div className="rounded-2xl bg-green-50 p-5">

            <h3 className="font-semibold text-green-700">

              🟢 Backend

            </h3>

            <p className="mt-2 text-sm text-green-600">

              Connected & Running

            </p>

          </div>

          <div className="rounded-2xl bg-blue-50 p-5">

            <h3 className="font-semibold text-blue-700">

              🔄 Live Updates

            </h3>

            <p className="mt-2 text-sm text-blue-600">

              Socket.IO Active

            </p>

          </div>

          <div className="rounded-2xl bg-purple-50 p-5">

            <h3 className="font-semibold text-purple-700">

              🚑 Dispatch Engine

            </h3>

            <p className="mt-2 text-sm text-purple-600">

              Priority Queue Online

            </p>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );

};

export default AdminDashboard;