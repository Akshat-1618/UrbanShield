import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaClipboardList, FaMapMarkerAlt } from "react-icons/fa";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageLoader from "../../components/ui/PageLoader";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import EmptyState from "../../components/ui/EmptyState";
import api from "../../services/api";
import socket from "../../services/socket";
import { getIncidentStatus, severityTone } from "../../utils/statusMeta";

const MyIncidents = () => {
  const [incidents, setIncidents] = useState([]);
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
      setIncidents(res.data.data);
    } catch {
      toast.error("Failed to load incidents");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <PageLoader label="Loading your incidents..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageHeader
        eyebrow="Citizen Portal"
        title="My Incidents"
        description="View every emergency you've reported and follow their latest status."
      />

      {incidents.length === 0 ? (
        <EmptyState
          icon={FaClipboardList}
          title="No incidents found"
          description="You haven't reported any emergencies yet."
        />
      ) : (
        <div className="grid gap-6 animate-fade-in-up animate-delay-1">
          {incidents.map((incident) => {
            const status = getIncidentStatus(incident.status);
            return (
              <Card
                key={incident._id}
                className="transition hover:shadow-[var(--shadow-soft-lg)]"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-slate-900">
                      {incident.title}
                    </h2>
                    {incident.description && (
                      <p className="mt-2.5 text-slate-600">
                        {incident.description}
                      </p>
                    )}
                    <div className="mt-5 flex flex-wrap gap-2.5">
                      <Badge tone="blue">{incident.type}</Badge>
                      <Badge tone={status.tone} icon={status.icon}>
                        {status.label}
                      </Badge>
                      <Badge tone={severityTone(incident.severity)}>
                        Severity {incident.severity}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid gap-4 lg:w-72">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Location
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 font-semibold text-slate-800">
                        <FaMapMarkerAlt className="text-slate-400" aria-hidden="true" />
                        {incident.location.areaName}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Assigned Unit
                      </p>
                      <p className="mt-1 font-semibold text-slate-800">
                        {incident.assignedUnit
                          ? incident.assignedUnit.unitName
                          : "Not Assigned"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Last Updated
                      </p>
                      <p className="mt-1 font-semibold text-slate-800">
                        {new Date(incident.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
};

export default MyIncidents;
