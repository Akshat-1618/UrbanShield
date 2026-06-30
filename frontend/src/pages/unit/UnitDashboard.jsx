import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PrimaryButton from "../../components/ui/PrimaryButton";
import StatCard from "../../components/ui/StatCard";
import CityMap from "../../components/map/CityMap";
import api from "../../services/api";
import socket from "../../services/socket";

const UnitDashboard = () => {
  const [unit, setUnit] = useState(null);
  const [mission, setMission] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchData();
    socket.on(
      "incidentUpdated",
      fetchData
    );
    return () => {
      socket.off(
        "incidentUpdated",
        fetchData
      );
    };
  }, []);

  const fetchData = async () => {
    try {
      const profileRes =
        await api.get("/units/me");
      const missionRes =
        await api.get("/units/my-mission");
      setUnit(profileRes.data.data);
      setMission(missionRes.data.data);
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
  const updateStatus = async (status) => {
    try {
      await api.patch(
        `/incidents/${mission._id}/status`,
        { status }
      );
      toast.success(
        "Status Updated"
      );
      fetchData();
    }
    catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to update status"
      );
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "ASSIGNED":
        return "bg-yellow-100 text-yellow-700";
      case "ON_THE_WAY":
        return "bg-blue-100 text-blue-700";
      case "ARRIVED":
        return "bg-purple-100 text-purple-700";
      case "RESOLVED":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
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
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Emergency Response Unit
            </p>
            <h1 className="mt-2 text-4xl font-bold text-slate-900">
              {unit?.unitName}
            </h1>
            <p className="mt-2 text-slate-500">
              {unit?.unitType}
            </p>
          </div>
          <div>
            <span
              className={`rounded-full px-5 py-2 text-sm font-semibold ${getStatusColor(
                unit?.status
              )}`}
            >
              {unit?.status}
            </span>
          </div>
        </div>
      </div>
      <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Current Status"
          value={unit?.status || "-"}
        />
        <StatCard
          title="Mission"
          value={mission ? "ACTIVE" : "NONE"}
        />
        <StatCard
          title="Current Area"
          value={
            unit?.currentLocation?.areaName ||
            "-"
          }
        />
        <StatCard
          title="Severity"
          value={
            mission
              ? mission.severity
              : "-"
          }
        />
      </div>
      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-slate-900">
            Live Deployment Map
          </h2>
          <p className="mt-1 text-slate-500">
            Current unit location, assigned incident and shortest response route.
          </p>
        </div>
        <CityMap
          units={unit ? [unit] : []}
          incidents={mission ? [mission] : []}
          route={mission?.route || []}
          showNodes={true}
        />
      </div>
      {mission ? (
        <>
          <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900">
                  Current Mission
                </h2>
                <h3 className="mt-5 text-3xl font-bold">
                  {mission.title}
                </h3>
                {mission.description && (
                  <p className="mt-3 text-slate-600">
                    {mission.description}
                  </p>
                )}
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                    {mission.type}
                  </span>
                  <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
                    Severity {mission.severity}
                  </span>
                  <span
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusColor(
                      mission.status
                    )}`}
                  >
                    {mission.status}
                  </span>
                </div>
              </div>
              <div className="grid gap-5 lg:w-80">
                <div>
                  <p className="text-sm text-slate-500">
                    Area
                  </p>
                  <p className="font-semibold">
                    📍 {mission.location?.areaName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">
                    Route Distance
                  </p>
                  <p className="font-semibold">
                    {mission.routeDistance || 0} KM
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">
                    Last Updated
                  </p>
                  <p className="font-semibold">
                    {new Date(
                      mission.updatedAt
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold">
              Mission Progress
            </h2>
            <div className="flex flex-wrap gap-4">
              {[
                "REPORTED",
                "ASSIGNED",
                "ON_THE_WAY",
                "ARRIVED",
                "RESOLVED",
              ].map((step) => {
                const completed =
                  mission.statusHistory?.some(
                    (item) =>
                      item.status === step
                  );
                return (
                  <div
                    key={step}
                    className={`rounded-full px-5 py-3 text-sm font-semibold ${
                      completed
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {completed ? "✅" : "⬜"}
                    {" "}
                    {step.replaceAll(
                      "_",
                      " "
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold">
              Mission Actions
            </h2>
            <div className="flex flex-wrap gap-4">
              {mission.status ===
                "ASSIGNED" && (
                <PrimaryButton
                  onClick={() =>
                    updateStatus(
                      "ON_THE_WAY"
                    )
                  }
                >
                  🚑 Start Journey
                </PrimaryButton>
              )}
              {mission.status ===
                "ON_THE_WAY" && (
                <PrimaryButton
                  onClick={() =>
                    updateStatus(
                      "ARRIVED"
                    )
                  }
                >
                  📍 Mark Arrived
                </PrimaryButton>
              )}
              {mission.status ===
                "ARRIVED" && (
                <PrimaryButton
                  onClick={() =>
                    updateStatus(
                      "RESOLVED"
                    )
                  }
                >
                  ✅ Resolve Incident
                </PrimaryButton>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <div className="text-6xl">
            🚑
          </div>
          <h2 className="mt-5 text-3xl font-bold text-slate-900">
            No Active Mission
          </h2>
          <p className="mt-3 text-slate-500">
            Your emergency unit is currently available.
            You'll automatically receive new missions when assigned by the administrator.
          </p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default UnitDashboard;