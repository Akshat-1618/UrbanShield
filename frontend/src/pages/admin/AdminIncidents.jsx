import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaClipboardList, FaAmbulance, FaMapMarkerAlt } from "react-icons/fa";

import DashboardLayout from "../../components/layout/DashboardLayout";
import PrimaryButton from "../../components/ui/PrimaryButton";
import PageLoader from "../../components/ui/PageLoader";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import EmptyState from "../../components/ui/EmptyState";

import api from "../../services/api";
import socket from "../../services/socket";
import { getIncidentStatus, severityTone } from "../../utils/statusMeta";

const AdminIncidents = () => {
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
      const res = await api.get("/incidents");
      setIncidents(res.data.data);
    } catch {
      toast.error("Failed to fetch incidents");
    } finally {
      setLoading(false);
    }
  };

  const handleAutoAssign = async (id) => {
    try {
      const res = await api.patch(`/incidents/${id}/auto-assign`);
      toast.success(res.data.message);
      fetchIncidents();
    } catch (error) {
      toast.error(error.response?.data?.message || "Auto assign failed");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <PageLoader label="Loading incidents..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageHeader
        eyebrow="Command Center"
        title="Incident Management"
        description="Monitor reported emergencies, assign the nearest response units, and track incident progress in real time."
      />

      {incidents.length === 0 ? (
        <EmptyState
          icon={FaClipboardList}
          title="No incidents found"
          description="No emergency incidents have been reported yet."
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
                      <Badge tone="slate" icon={FaMapMarkerAlt}>
                        {incident.location.areaName}
                      </Badge>
                    </div>
                  </div>

                  {!incident.assignedUnit && incident.status === "REPORTED" && (
                    <PrimaryButton
                      icon={FaAmbulance}
                      variant="danger"
                      fullWidth={false}
                      onClick={() => handleAutoAssign(incident._id)}
                    >
                      Auto Assign
                    </PrimaryButton>
                  )}
                </div>

                <div className="mt-8 grid gap-6 border-t border-slate-100 pt-6 md:grid-cols-2 lg:grid-cols-4">
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
                      Route Distance
                    </p>
                    <p className="mt-1 font-semibold text-slate-800">
                      {incident.routeDistance ? `${incident.routeDistance} KM` : "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Reported By
                    </p>
                    <p className="mt-1 font-semibold text-slate-800">
                      {incident.createdBy?.name}
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
              </Card>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminIncidents;
