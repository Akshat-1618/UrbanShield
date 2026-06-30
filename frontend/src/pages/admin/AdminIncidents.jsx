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

      const res = await api.get(
        "/incidents"
      );

      setIncidents(
        res.data.data
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

  const handleAutoAssign = async (id) => {

    try {

      const res = await api.patch(
        `/incidents/${id}/auto-assign`
      );

      toast.success(
        res.data.message
      );

      fetchIncidents();

    }

    catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Auto assign failed"
      );

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
        return "bg-slate-100 text-slate-700";

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

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-900">

          Incident Management

        </h1>

        <p className="mt-2 text-slate-500">

          Monitor reported emergencies, assign the nearest response units and track incident progress in real time.

        </p>

      </div>

      {

        incidents.length === 0 ? (

          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">

            <div className="text-6xl">

              🚨

            </div>

            <h2 className="mt-5 text-3xl font-bold">

              No Incidents Found

            </h2>

            <p className="mt-3 text-slate-500">

              No emergency incidents have been reported yet.

            </p>

          </div>

        ) : (

          <div className="grid gap-6">

            {

              incidents.map((incident) => (

                <div
                  key={incident._id}
                  className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-lg"
                >

                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                    <div className="flex-1">

                      <h2 className="text-2xl font-bold text-slate-900">

                        {incident.title}

                      </h2>

                      {

                        incident.description && (

                          <p className="mt-3 text-slate-600">

                            {incident.description}

                          </p>

                        )

                      }

                      <div className="mt-6 flex flex-wrap gap-3">

                        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

                          {incident.type}

                        </span>

                        <span
                          className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusColor(
                            incident.status
                          )}`}
                        >

                          {incident.status}

                        </span>

                        <span
                          className={`rounded-full px-4 py-2 text-sm font-semibold ${getSeverityColor(
                            incident.severity
                          )}`}
                        >

                          Severity {incident.severity}

                        </span>

                        <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">

                          📍 {incident.location.areaName}

                        </span>

                      </div>

                    </div>

                    {

                      !incident.assignedUnit &&
                      incident.status === "REPORTED" && (

                        <PrimaryButton
                          onClick={() =>
                            handleAutoAssign(
                              incident._id
                            )
                          }
                        >

                          🚑 Auto Assign

                        </PrimaryButton>

                      )

                    }

                  </div>

                  <div className="mt-8 grid gap-6 md:grid-cols-2">

                    <div>

                      <p className="text-sm text-slate-500">

                        Assigned Unit

                      </p>

                      <p className="font-semibold">

                        {

                          incident.assignedUnit
                            ? incident.assignedUnit.unitName
                            : "Not Assigned"

                        }

                      </p>

                    </div>

                    <div>

                      <p className="text-sm text-slate-500">

                        Route Distance

                      </p>

                      <p className="font-semibold">

                        {incident.routeDistance || 0} KM

                      </p>

                    </div>

                    <div>

                      <p className="text-sm text-slate-500">

                        Reported By

                      </p>

                      <p className="font-semibold">

                        {incident.createdBy?.name}

                      </p>

                    </div>

                    <div>

                      <p className="text-sm text-slate-500">

                        Last Updated

                      </p>

                      <p className="font-semibold">

                        {new Date(
                          incident.updatedAt
                        ).toLocaleString()}

                      </p>

                    </div>

                  </div>

                </div>

              ))

            }

          </div>

        )

      }

    </DashboardLayout>

  );

};

export default AdminIncidents;