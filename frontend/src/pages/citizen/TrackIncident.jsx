import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import CityMap from "../../components/map/CityMap";
import api from "../../services/api";
import socket from "../../services/socket";

const TrackIncident = () => {
  const [incidents, setIncidents] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState(null);
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
      const res = await api.get(
        "/incidents/my-incidents"
      );
      const activeIncidents =
        res.data.data.filter(
          (incident) =>
            incident.status !== "RESOLVED"
        );
      setIncidents(activeIncidents);
      setSelectedIncident(
        activeIncidents[0] || null
      );
    }
    catch {
      toast.error(
        "Failed to fetch incidents"
      );
    }
    finally {
      setLoading(false);
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
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            <p className="font-medium text-slate-600">
              Loading Incident...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-bold text-slate-900">
          Track Active Incident
        </h1>
        <p className="mt-2 text-slate-500">
          Monitor your emergency request in real time.
        </p>
      </div>
      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-2xl font-bold">
          Live Incident Map
        </h2>
        <CityMap
          incidents={incidents}
          route={selectedIncident?.route || []}
          showNodes={true}
        />
      </div>
      {incidents.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-3">
          {incidents.map((incident) => (
            <button
              key={incident._id}
              onClick={() =>
                setSelectedIncident(
                  incident
                )
              }
              className={`rounded-xl border px-5 py-3 font-medium transition ${
                selectedIncident?._id === incident._id
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-200 bg-white hover:bg-slate-100"
              }`}
            >
              {incident.title}
            </button>
          ))}
        </div>
      )}
      {!selectedIncident ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <div className="text-6xl">
            🚨
          </div>
          <h2 className="mt-5 text-3xl font-bold">
            No Active Incident
          </h2>
          <p className="mt-3 text-slate-500">
            You currently have no ongoing emergency requests.
          </p>
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-bold">
            {selectedIncident.title}
          </h2>
          {selectedIncident.description && (
            <p className="mt-3 text-slate-600">
              {selectedIncident.description}
            </p>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              {selectedIncident.type}
            </span>
            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusColor(
                selectedIncident.status
              )}`}
            >
              {selectedIncident.status.replaceAll(
                "_",
                " "
              )}
            </span>
            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              Severity {selectedIncident.severity}
            </span>
          </div>
          <div className="mt-10">
            <h3 className="mb-5 text-xl font-bold">
              Incident Progress
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                "REPORTED",
                "ASSIGNED",
                "ON_THE_WAY",
                "ARRIVED",
                "RESOLVED",
              ].map((step) => {
                const completed =
                  selectedIncident.statusHistory?.some(
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
          <div className="mt-10 grid gap-6 rounded-2xl bg-slate-50 p-6 md:grid-cols-3">
            <div>
              <p className="text-sm text-slate-500">
                Area
              </p>
              <p className="mt-1 font-semibold">
                📍 {selectedIncident.location?.areaName}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500">
                Route Distance
              </p>
              <p className="mt-1 font-semibold">
                {selectedIncident.routeDistance
                  ? `${selectedIncident.routeDistance} KM`
                  : "Pending"}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500">
                Last Updated
              </p>
              <p className="mt-1 font-semibold">
                {new Date(
                  selectedIncident.updatedAt
                ).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default TrackIncident;