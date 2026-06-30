import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PrimaryButton from "../../components/ui/PrimaryButton";

import api from "../../services/api";
import socket from "../../services/socket";

const AdminIncidents = () => {

  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIncidents();
    socket.on(
      "incidentUpdated",
      fetchIncidents
    );

    return () => {
      socket.off(
        "incidentUpdated",
        fetchIncidents
      );
    };
  }, []);

  const fetchIncidents = async () => {
    try {
      const res = await api.get("/incidents");
      setIncidents(res.data.data);
    } catch {
      toast.error(
        "Failed to fetch incidents"
      );
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
      toast.error( error.response?.data?.message || "Auto assign failed");
    }
  };

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
        return "bg-gray-100 text-gray-700";
    }
  };

  const getSeverityColor = (severity) => {
    if (severity >= 8) {
      return "bg-red-100 text-red-700";
    }
    if (severity >= 6) {
      return "bg-orange-100 text-orange-700";
    }
    return "bg-green-100 text-green-700";
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
      <h1 className="mb-8 text-4xl font-bold">
        Incident Management
      </h1>
      <div className="grid gap-6">
        {incidents.map((incident) => (
          <div
            key={incident._id}
            className="rounded-xl bg-white p-6 shadow"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  {incident.title}
                </h2>
                {incident.description && (
                  <p className="mt-2 text-gray-600">
                    {incident.description}
                  </p>
                )}
              </div>
              {!incident.assignedUnit &&
                incident.status === "REPORTED" && (
                <PrimaryButton
                  onClick={() =>
                    handleAutoAssign(
                      incident._id
                    )
                  }
                >
                  Auto Assign
                </PrimaryButton>
              )}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <span className="rounded px-3 py-1 bg-blue-100 text-blue-700">
                {incident.type}
              </span>
              <span
                className={`rounded px-3 py-1 ${getStatusColor(
                  incident.status
                )}`}
              >
                {incident.status}
              </span>
              <span
                className={`rounded px-3 py-1 ${getSeverityColor(
                  incident.severity
                )}`}
              >
                Severity {incident.severity}
              </span>
              <span className="rounded px-3 py-1 bg-gray-100 text-gray-700">
                📍 {incident.location.areaName}
              </span>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <div>
                <p className="text-sm text-gray-500">
                  Assigned Unit
                </p>
                <p className="font-medium">
                  {incident.assignedUnit
                    ? incident.assignedUnit.unitName
                    : "Not Assigned"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  Route Distance
                </p>
                <p className="font-medium">
                  {incident.routeDistance || 0}
                  {" "}KM
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  Reported By
                </p>
                <p className="font-medium">
                  {incident.createdBy?.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  Last Updated
                </p>
                <p className="font-medium">
                  {new Date(
                    incident.updatedAt
                  ).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};
export default AdminIncidents;