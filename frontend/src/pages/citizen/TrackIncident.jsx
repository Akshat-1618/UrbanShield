import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaMapMarkerAlt, FaClipboardList, FaCheckCircle } from "react-icons/fa";
import DashboardLayout from "../../components/layout/DashboardLayout";
import CityMap from "../../components/map/CityMap";
import PageLoader from "../../components/ui/PageLoader";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import EmptyState from "../../components/ui/EmptyState";
import api from "../../services/api";
import socket from "../../services/socket";
import {
  getIncidentStatus,
  severityTone,
  INCIDENT_PROGRESS_STEPS,
} from "../../utils/statusMeta";

const TrackIncident = () => {
  const [incidents, setIncidents] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIncidents();
    socket.on("incidentUpdated", fetchIncidents);
    return () => {
      socket.off("incidentUpdated", fetchIncidents);
    };
  }, []);

  const fetchIncidents = async () => {
    try {
      const res = await api.get("/incidents/my-incidents");
      const activeIncidents = res.data.data.filter(
        (incident) => incident.status !== "RESOLVED"
      );
      setIncidents(activeIncidents);
      setSelectedIncident(activeIncidents[0] || null);
    } catch {
      toast.error("Failed to fetch incidents");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <PageLoader label="Loading incident tracker..." />
      </DashboardLayout>
    );
  }

  const status = selectedIncident ? getIncidentStatus(selectedIncident.status) : null;

  return (
    <DashboardLayout>
      <PageHeader
        eyebrow="Citizen Portal"
        title="Track Active Incident"
        description="Monitor your emergency request and the assigned unit's route in real time."
      />

      <Card className="mb-8 animate-fade-in-up animate-delay-1">
        <h2 className="mb-5 text-xl font-bold text-slate-900">Live Incident Map</h2>
        <CityMap
          incidents={incidents}
          route={selectedIncident?.route || []}
          showNodes={true}
        />
      </Card>

      {incidents.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-3 animate-fade-in-up animate-delay-2">
          {incidents.map((incident) => (
            <button
              key={incident._id}
              onClick={() => setSelectedIncident(incident)}
              className={`rounded-xl border px-5 py-3 text-sm font-semibold transition ${
                selectedIncident?._id === incident._id
                  ? "border-[color:var(--color-aurora-600)] bg-[color:var(--color-aurora-600)] text-white shadow-sm shadow-[color:var(--color-aurora-500)]/20"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {incident.title}
            </button>
          ))}
        </div>
      )}

      {!selectedIncident ? (
        <EmptyState
          icon={FaClipboardList}
          title="No active incident"
          description="You currently have no ongoing emergency requests."
        />
      ) : (
        <Card className="animate-fade-in-up animate-delay-3">
          <h2 className="text-2xl font-bold text-slate-900">
            {selectedIncident.title}
          </h2>
          {selectedIncident.description && (
            <p className="mt-2.5 text-slate-600">
              {selectedIncident.description}
            </p>
          )}
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Badge tone="blue">{selectedIncident.type}</Badge>
            <Badge tone={status.tone} icon={status.icon}>
              {selectedIncident.status.replaceAll("_", " ")}
            </Badge>
            <Badge tone={severityTone(selectedIncident.severity)}>
              Severity {selectedIncident.severity}
            </Badge>
          </div>

          <div className="mt-10">
            <h3 className="mb-5 text-base font-bold text-slate-900">
              Incident Progress
            </h3>
            <div className="flex flex-wrap gap-3">
              {INCIDENT_PROGRESS_STEPS.map((step) => {
                const completed = selectedIncident.statusHistory?.some(
                  (item) => item.status === step
                );
                return (
                  <div
                    key={step}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold ${
                      completed
                        ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/10"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    <FaCheckCircle
                      className={completed ? "text-emerald-500" : "text-slate-300"}
                      aria-hidden="true"
                    />
                    {step.replaceAll("_", " ")}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-10 grid gap-6 rounded-2xl bg-slate-50 p-6 md:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Area
              </p>
              <p className="mt-1.5 flex items-center gap-1.5 font-semibold text-slate-800">
                <FaMapMarkerAlt className="text-slate-400" aria-hidden="true" />
                {selectedIncident.location?.areaName}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Route Distance
              </p>
              <p className="mt-1.5 font-semibold text-slate-800">
                {selectedIncident.routeDistance
                  ? `${selectedIncident.routeDistance} KM`
                  : "Pending"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Last Updated
              </p>
              <p className="mt-1.5 font-semibold text-slate-800">
                {new Date(selectedIncident.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
      )}
    </DashboardLayout>
  );
};

export default TrackIncident;
