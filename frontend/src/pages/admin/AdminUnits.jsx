import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/ui/PrimaryButton";

import api from "../../services/api";
import socket from "../../services/socket";

const AdminUnits = () => {

  const navigate = useNavigate();
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUnits();
    socket.on(
      "incidentUpdated",
      fetchUnits
    );
    return () => {
      socket.off(
        "incidentUpdated",
        fetchUnits
      );
    };
  }, []);

  const fetchUnits = async () => {
    try {
      const res = await api.get("/units");
      setUnits(res.data.data);
    } catch {
      toast.error("Failed to fetch units");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "IDLE":
        return "bg-green-100 text-green-700";
      case "ASSIGNED":
        return "bg-yellow-100 text-yellow-700";
      case "ON_THE_WAY":
        return "bg-blue-100 text-blue-700";
      case "RESCUING":
        return "bg-red-100 text-red-700";
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
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">
          Emergency Units
        </h1>
        <PrimaryButton
          onClick={() =>
            navigate(
              "/admin/create-unit"
            )
          }
        >
          Create Unit
        </PrimaryButton>
      </div>
      {units.length === 0 ? (
        <div className="rounded-xl bg-white p-8 text-center shadow">
          No units found.
        </div>
      ) : (
        <div className="grid gap-6">
          {units.map((unit) => (
            <div
              key={unit._id}
              className="rounded-xl bg-white p-6 shadow"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {unit.unitName}
                  </h2>
                  <p className="text-gray-600">
                    {unit.email}
                  </p>
                </div>
                <span className="rounded bg-blue-100 px-3 py-1 text-blue-700">
                  {unit.unitType}
                </span>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <span
                  className={`rounded px-3 py-1 ${getStatusColor(
                    unit.status
                  )}`}
                >
                  {unit.status.replaceAll(
                    "_",
                    " "
                  )}
                </span>
                <span className="rounded bg-gray-100 px-3 py-1 text-gray-700">
                  📍 {unit.currentLocation.areaName}
                </span>
                <span
                  className={`rounded px-3 py-1 ${
                    unit.availability
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {unit.availability
                    ? "Available"
                    : "Busy"}
                </span>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-500">
                    Current Mission
                  </p>
                  <p className="font-medium">
                    {
                      unit.currentMission?.title ||
                      "None"
                    }
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    Created
                  </p>
                  <p className="font-medium">
                    {new Date(
                      unit.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};
export default AdminUnits;