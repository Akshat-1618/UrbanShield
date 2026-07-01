import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaListUl,
  FaBolt,
  FaCheckCircle,
  FaTruck,
  FaMapMarkerAlt,
  FaClipboardList,
  FaPlusCircle,
  FaCircle,
  FaSyncAlt,
  FaAmbulance,
  FaThumbsUp,
} from "react-icons/fa";

import DashboardLayout from "../../components/layout/DashboardLayout";
import PrimaryButton from "../../components/ui/PrimaryButton";
import StatCard from "../../components/ui/StatCard";
import PageLoader from "../../components/ui/PageLoader";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import EmptyState from "../../components/ui/EmptyState";
import CityMap from "../../components/map/CityMap";

import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import socket from "../../services/socket";
import { severityTone } from "../../utils/statusMeta";

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
    socket.on("incidentUpdated", fetchDashboardData);
    return () => {
      socket.off("incidentUpdated", fetchDashboardData);
    };
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [incidentsRes, unitsRes, pendingRes] = await Promise.all([
        api.get("/incidents"),
        api.get("/units"),
        api.get("/incidents/pending"),
      ]);

      const incidents = incidentsRes.data.data;
      const units = unitsRes.data.data;

      setIncidents(incidents);
      setUnits(units);
      setPriorityQueue(pendingRes.data.data);

      setStats({
        totalIncidents: incidents.length,
        activeIncidents: incidents.filter(
          (incident) => incident.status !== "RESOLVED"
        ).length,
        resolvedIncidents: incidents.filter(
          (incident) => incident.status === "RESOLVED"
        ).length,
        availableUnits: units.filter((unit) => unit.availability).length,
      });
    } catch {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <PageLoader label="Loading command center..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageHeader
        eyebrow="Emergency Command Center"
        title={`Welcome, ${user?.name || ""}`}
        description="Monitor incidents, dispatch emergency units, and coordinate city-wide response in real time."
      />

      <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4 animate-fade-in-up animate-delay-1">
        <StatCard title="Total Incidents" value={stats.totalIncidents} icon={FaListUl} tone="blue" />
        <StatCard title="Active Incidents" value={stats.activeIncidents} icon={FaBolt} tone="amber" />
        <StatCard title="Resolved" value={stats.resolvedIncidents} icon={FaCheckCircle} tone="green" />
        <StatCard title="Available Units" value={stats.availableUnits} icon={FaTruck} tone="purple" />
      </div>

      <Card className="mb-8 animate-fade-in-up animate-delay-2">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-900">Live City Map</h2>
          <p className="mt-1 text-sm text-slate-500">
            View all active incidents and emergency unit locations.
          </p>
        </div>
        <CityMap
          units={units}
          incidents={incidents.filter((incident) => incident.status !== "RESOLVED")}
          showNodes={true}
        />
      </Card>

      <Card className="mb-8 animate-fade-in-up animate-delay-3">
        <h2 className="mb-6 text-xl font-bold text-slate-900">
          Priority Dispatch Queue
        </h2>
        {priorityQueue.length === 0 ? (
          <EmptyState
            icon={FaThumbsUp}
            title="No pending incidents"
            description="Every reported incident currently has a unit assigned."
          />
        ) : (
          <div className="space-y-4">
            {priorityQueue.map((incident, index) => (
              <div
                key={incident._id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-[color:var(--color-aurora-300)]/50 hover:shadow-md md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    #{index + 1} {incident.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">{incident.type}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge tone={severityTone(incident.severity)}>
                    Severity {incident.severity}
                  </Badge>
                  <Badge tone="slate" icon={FaMapMarkerAlt}>
                    {incident.location.areaName}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="mb-8 animate-fade-in-up animate-delay-4">
        <h2 className="mb-6 text-xl font-bold text-slate-900">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <PrimaryButton
            icon={FaClipboardList}
            onClick={() => navigate("/admin/incidents")}
          >
            Manage Incidents
          </PrimaryButton>
          <PrimaryButton
            icon={FaTruck}
            variant="secondary"
            onClick={() => navigate("/admin/units")}
          >
            Manage Units
          </PrimaryButton>
          <PrimaryButton
            icon={FaPlusCircle}
            variant="secondary"
            onClick={() => navigate("/admin/create-unit")}
          >
            Create Unit
          </PrimaryButton>
        </div>
      </Card>

      <Card className="animate-fade-in-up animate-delay-4">
        <h2 className="mb-5 text-xl font-bold text-slate-900">System Status</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-start gap-3 rounded-2xl bg-emerald-50 p-5">
            <FaCircle className="mt-1 text-[10px] text-emerald-500" aria-hidden="true" />
            <div>
              <h3 className="font-semibold text-emerald-800">Backend</h3>
              <p className="mt-1 text-sm text-emerald-700">Connected &amp; running</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl bg-[color:var(--color-aurora-100)]/30 p-5">
            <FaSyncAlt className="mt-1 text-[color:var(--color-aurora-700)]" aria-hidden="true" />
            <div>
              <h3 className="font-semibold text-[color:var(--color-aurora-900)]">Live Updates</h3>
              <p className="mt-1 text-sm text-[color:var(--color-aurora-700)]">Real-time sync active</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl bg-violet-50 p-5">
            <FaAmbulance className="mt-1 text-violet-600" aria-hidden="true" />
            <div>
              <h3 className="font-semibold text-violet-800">Dispatch Engine</h3>
              <p className="mt-1 text-sm text-violet-700">Priority queue online</p>
            </div>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default AdminDashboard;
