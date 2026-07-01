import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaExclamationTriangle,
  FaClipboardList,
  FaMapMarkedAlt,
  FaListUl,
  FaCheckCircle,
  FaBolt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/ui/StatCard";
import PrimaryButton from "../../components/ui/PrimaryButton";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import EmptyState from "../../components/ui/EmptyState";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import socket from "../../services/socket";
import { getIncidentStatus } from "../../utils/statusMeta";

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
      const res = await api.get("/incidents/my-incidents");
      const incidents = res.data.data;
      setRecentIncidents(incidents.slice(0, 3));
      setStats({
        total: incidents.length,
        active: incidents.filter((incident) => incident.status !== "RESOLVED")
          .length,
        resolved: incidents.filter(
          (incident) => incident.status === "RESOLVED"
        ).length,
      });
    } catch {
      toast.error("Failed to load dashboard");
    }
  };

  useEffect(() => {
    fetchDashboard();
    socket.on("incidentUpdated", fetchDashboard);
    return () => {
      socket.off("incidentUpdated", fetchDashboard);
    };
  }, []);

  return (
    <DashboardLayout>
      <PageHeader
        eyebrow="Citizen Portal"
        title={`Welcome back, ${user?.name || ""}`}
        description="Report emergencies, follow live response progress, and stay connected with UrbanShield responders."
      />

      <div className="mb-8 grid gap-6 md:grid-cols-3 animate-fade-in-up animate-delay-1">
        <StatCard title="Total Incidents" value={stats.total} icon={FaListUl} tone="blue" />
        <StatCard title="Active Incidents" value={stats.active} icon={FaBolt} tone="amber" />
        <StatCard title="Resolved" value={stats.resolved} icon={FaCheckCircle} tone="green" />
      </div>

      <Card className="mb-8 animate-fade-in-up animate-delay-2">
        <h2 className="mb-6 text-xl font-bold text-slate-900">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <PrimaryButton
            icon={FaExclamationTriangle}
            variant="danger"
            onClick={() => navigate("/citizen/report")}
          >
            Report Emergency
          </PrimaryButton>
          <PrimaryButton
            icon={FaClipboardList}
            variant="secondary"
            onClick={() => navigate("/citizen/my-incidents")}
          >
            My Incidents
          </PrimaryButton>
          <PrimaryButton
            icon={FaMapMarkedAlt}
            variant="secondary"
            onClick={() => navigate("/citizen/track")}
          >
            Track Incident
          </PrimaryButton>
        </div>
      </Card>

      <Card className="animate-fade-in-up animate-delay-3">
        <h2 className="mb-6 text-xl font-bold text-slate-900">Recent Activity</h2>
        {recentIncidents.length === 0 ? (
          <EmptyState
            icon={FaClipboardList}
            title="No incidents reported yet"
            description="Emergencies you report will show up here with live status updates."
          />
        ) : (
          <div className="space-y-4">
            {recentIncidents.map((incident) => {
              const status = getIncidentStatus(incident.status);
              return (
                <div
                  key={incident._id}
                  className="rounded-2xl border border-slate-200 p-5 transition hover:border-[color:var(--color-aurora-300)]/50 hover:shadow-md"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {incident.title}
                      </h3>
                      <p className="mt-1.5 flex items-center gap-1.5 text-sm text-slate-500">
                        <FaMapMarkerAlt className="text-slate-400" aria-hidden="true" />
                        {incident.location.areaName}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge tone="blue">{incident.type}</Badge>
                      <Badge tone={status.tone} icon={status.icon}>
                        {status.label}
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </DashboardLayout>
  );
};

export default CitizenDashboard;
