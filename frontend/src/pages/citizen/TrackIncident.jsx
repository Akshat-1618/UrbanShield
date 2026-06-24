import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import DashboardLayout from "../../components/layout/DashboardLayout";

import api from "../../services/api";
import socket from "../../services/socket";

import CityMap from "../../components/map/CityMap";

const TrackIncident = () => {

  const [incidents, setIncidents] = useState([]);

  const [selectedIncident, setSelectedIncident] =
  useState(null);

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

        const res =
          await api.get(
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

        Track Active Incident

      </h1>

      <CityMap
        incidents={incidents}
        route={selectedIncident?.route || []}
        showNodes={true}
      />

      <div className="mb-6 mt-6 flex flex-wrap gap-3">

        {incidents?.map((incident) => (

          <button
            key={incident._id}
            onClick={() =>
              setSelectedIncident(incident)
            }
            className={`rounded-lg border px-4 py-2 ${
              selectedIncident?._id === incident._id
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >

            {incident.title}

            {" - "}

            {incident.status}

          </button>

        ))}

      </div>

      {

        !selectedIncident ? (

          <div className="rounded-xl bg-white p-8 shadow text-center">

            No active incidents found.

          </div>

        ) : (

          <div className="rounded-xl bg-white p-8 shadow">

            <h2 className="text-2xl font-bold">

              {selectedIncident.title}

            </h2>

            {

              selectedIncident.description && (

                <p className="mt-3 text-gray-600">

                  {selectedIncident.description}

                </p>

              )

            }

            <div className="mt-6 flex flex-wrap gap-3">

              <span className="rounded bg-blue-100 px-3 py-1">

                {selectedIncident.type}

              </span>

              <span className="rounded bg-red-100 px-3 py-1">

                {selectedIncident.status}

              </span>

              <span className="rounded bg-green-100 px-3 py-1">

                Severity {selectedIncident.severity}

              </span>

            </div>

            <div className="mt-8">

              <h3 className="mb-4 text-xl font-semibold">

                Progress

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
                      className={`rounded-full px-4 py-2 text-sm font-medium ${
                        completed
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >

                      {

                        completed

                          ? "✅"

                          : "⬜"

                      }

                      {" "}

                      {

                        step.replace(
                          "_",
                          " "
                        )

                      }

                    </div>

                  );

                })}

              </div>

            </div>

            <div className="mt-8 rounded-lg bg-slate-50 p-5">

              <h3 className="mb-3 text-lg font-semibold">

                Incident Details

              </h3>

              <p>

                <strong>

                  Area:

                </strong>

                {" "}

                {

                  selectedIncident.location
                    ?.areaName

                }

              </p>

              <p className="mt-2">

                <strong>

                  Last Updated:

                </strong>

                {" "}

                {

                  new Date(
                    selectedIncident.updatedAt
                  ).toLocaleString()

                }

              </p>

            </div>

          </div>

        )

      }

    </DashboardLayout>

  );

};

export default TrackIncident;