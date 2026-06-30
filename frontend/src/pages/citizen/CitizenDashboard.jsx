import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/ui/StatCard";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import socket from "../../services/socket";

const CitizenDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    resolved: 0,
  });
  const [recentIncidents, setRecentIncidents] = useState([]);
  const fetchDashboard = async () => {
    try {
      const res = await api.get(
        "/incidents/my-incidents"
      );
      const incidents = res.data.data;
      setRecentIncidents(
        incidents.slice(0, 3)
      );
      setStats({
        total: incidents.length,
        active: incidents.filter(
          (incident) =>
            incident.status !== "RESOLVED"
        ).length,
        resolved: incidents.filter(
          (incident) =>
            incident.status === "RESOLVED"
        ).length,
      });
    }
    catch {
      toast.error(
        "Failed to load dashboard"
      );
    }
  };

  useEffect(() => {
    fetchDashboard();
    socket.on(
      "incidentUpdated",
      fetchDashboard
    );
    return () => {
      socket.off(
        "incidentUpdated",
        fetchDashboard
      );
    };
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "REPORTED":
        return "bg-red-100 text-red-700";
      case "ASSIGNED":
        return "bg-yellow-100 text-yellow-700";
      case "ON_THE_WAY":
        return "bg-blue-100 text-blue-700";
      case "ARRIVED":
        return "bg-purple-100 text-purple-700";
      case "RESOLVED":
        return "bg-green-100 text-green-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-bold text-slate-900">
          Welcome back, {user?.name} 👋
        </h1>
        <p className="mt-3 text-slate-500">
          Report emergencies, track live progress and stay connected with UrbanShield.
        </p>
      </div>
      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <StatCard
          title="Total Incidents"
          value={stats.total}
        />
        <StatCard
          title="Active Incidents"
          value={stats.active}
        />
        <StatCard
          title="Resolved"
          value={stats.resolved}
        />
      </div>
      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          <PrimaryButton
            onClick={() =>
              navigate("/citizen/report")
            }
          >
            🚨 Report Emergency
          </PrimaryButton>
          <PrimaryButton
            onClick={() =>
              navigate("/citizen/my-incidents")
            }
          >
            📄 My Incidents
          </PrimaryButton>
          <PrimaryButton
            onClick={() =>
              navigate("/citizen/track")
            }
          >
            📍 Track Incident
          </PrimaryButton>
        </div>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold">
          Recent Activity
        </h2>
        {
          recentIncidents.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
              No incidents reported yet.
            </div>
          ) : (
            <div className="space-y-4">
              {
                recentIncidents.map((incident) => (
                  <div
                    key={incident._id}
                    className="rounded-2xl border border-slate-200 p-5 transition hover:shadow-md"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-xl font-bold">
                          {incident.title}
                        </h3>
                        <p className="mt-2 text-slate-500">
                          📍 {incident.location.areaName}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                          {incident.type}
                        </span>
                        <span
                          className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusColor(
                            incident.status
                          )}`}
                        >
                          {incident.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          )
        }
      </div>
    </DashboardLayout>
  );
};

export default CitizenDashboard;