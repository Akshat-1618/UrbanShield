import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaCheckCircle,
  FaMapMarkerAlt,
  FaAmbulance,
  FaRoute,
  FaFlagCheckered,
  FaBullseye,
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
import api from "../../services/api";
import socket from "../../services/socket";
import { getUnitStatus, INCIDENT_PROGRESS_STEPS } from "../../utils/statusMeta";

const UnitDashboard = () => {
  const [unit, setUnit] = useState(null);
  const [mission, setMission] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    socket.on("incidentUpdated", fetchData);
    return () => {
      socket.off("incidentUpdated", fetchData);
    };
  }, []);

  const fetchData = async () => {
    try {
      const profileRes = await api.get("/units/me");
      const missionRes = await api.get("/units/my-mission");
      setUnit(profileRes.data.data);
      setMission(missionRes.data.data);
    } catch {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (status) => {
    try {
      await api.patch(`/incidents/${mission._id}/status`, { status });
      toast.success("Status Updated");
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <PageLoader label="Loading unit console..." />
      </DashboardLayout>
    );
  }

  const unitStatus = getUnitStatus(unit?.status);

  return (
    <DashboardLayout>
      <PageHeader
        eyebrow="Emergency Response Unit"
        title={unit?.unitName || ""}
        description={unit?.unitType?.replaceAll("_", " ")}
        actions={
          <Badge tone={unitStatus.tone} icon={unitStatus.icon} className="text-sm">
            {unitStatus.label}
          </Badge>
        }
      />

      <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4 animate-fade-in-up animate-delay-1">
        <StatCard title="Current Status" value={unitStatus.label} icon={FaAmbulance} tone="blue" />
        <StatCard
          title="Mission"
          value={mission ? "Active" : "None"}
          icon={FaBullseye}
          tone={mission ? "amber" : "green"}
        />
        <StatCard
          title="Current Area"
          value={unit?.currentLocation?.areaName || "-"}
          icon={FaMapMarkerAlt}
          tone="purple"
        />
        <StatCard
          title="Severity"
          value={mission ? mission.severity : "-"}
          icon={FaFlagCheckered}
          tone="red"
        />
      </div>

      <Card className="mb-8 animate-fade-in-up animate-delay-2">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-900">Live Deployment Map</h2>
          <p className="mt-1 text-sm text-slate-500">
            Current unit location, assigned incident, and the shortest response route.
          </p>
        </div>
        <CityMap
          units={unit ? [unit] : []}
          incidents={mission ? [mission] : []}
          route={mission?.route || []}
          showNodes={true}
        />
      </Card>

      {mission ? (
        <>
          <Card className="mb-8 animate-fade-in-up animate-delay-3">
            <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-900">Current Mission</h2>
                <h3 className="mt-4 text-2xl font-bold text-slate-900">
                  {mission.title}
                </h3>
                {mission.description && (
                  <p className="mt-2.5 text-slate-600">{mission.description}</p>
                )}
                <div className="mt-5 flex flex-wrap gap-2.5">
                  <Badge tone="blue">{mission.type}</Badge>
                  <Badge tone="red">Severity {mission.severity}</Badge>
                  <Badge tone={getUnitStatus(mission.status).tone}>
                    {mission.status.replaceAll("_", " ")}
                  </Badge>
                </div>
              </div>
              <div className="grid gap-5 lg:w-80">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Area
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 font-semibold text-slate-800">
                    <FaMapMarkerAlt className="text-slate-400" aria-hidden="true" />
                    {mission.location?.areaName}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Route Distance
                  </p>
                  <p className="mt-1 font-semibold text-slate-800">
                    {mission.routeDistance ? `${mission.routeDistance} KM` : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Last Updated
                  </p>
                  <p className="mt-1 font-semibold text-slate-800">
                    {new Date(mission.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="mb-8 animate-fade-in-up animate-delay-4">
            <h2 className="mb-6 text-xl font-bold text-slate-900">Mission Progress</h2>
            <div className="flex flex-wrap gap-3">
              {INCIDENT_PROGRESS_STEPS.map((step) => {
                const completed = mission.statusHistory?.some(
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
          </Card>

          <Card className="animate-fade-in-up animate-delay-4">
            <h2 className="mb-6 text-xl font-bold text-slate-900">Mission Actions</h2>
            <div className="flex flex-wrap gap-4">
              {mission.status === "ASSIGNED" && (
                <PrimaryButton
                  icon={FaRoute}
                  fullWidth={false}
                  onClick={() => updateStatus("ON_THE_WAY")}
                >
                  Start Journey
                </PrimaryButton>
              )}
              {mission.status === "ON_THE_WAY" && (
                <PrimaryButton
                  icon={FaMapMarkerAlt}
                  fullWidth={false}
                  onClick={() => updateStatus("ARRIVED")}
                >
                  Mark Arrived
                </PrimaryButton>
              )}
              {mission.status === "ARRIVED" && (
                <PrimaryButton
                  icon={FaCheckCircle}
                  fullWidth={false}
                  variant="danger"
                  onClick={() => updateStatus("RESOLVED")}
                >
                  Resolve Incident
                </PrimaryButton>
              )}
            </div>
          </Card>
        </>
      ) : (
        <EmptyState
          icon={FaAmbulance}
          title="No active mission"
          description="Your unit is currently available. You'll automatically receive a mission when the administrator dispatches you to an incident."
        />
      )}
    </DashboardLayout>
  );
};

export default UnitDashboard;
