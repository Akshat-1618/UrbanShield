import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import DashboardLayout from "../../components/layout/DashboardLayout";

import api from "../../services/api";
import socket from "../../services/socket";

const TrackIncident = () => {

  const [incident, setIncident] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchLatestIncident();

    socket.on(
      "incidentUpdated",
      fetchLatestIncident
    );

    return () => {

      socket.off(
        "incidentUpdated",
        fetchLatestIncident
      );

    };

  }, []);

  const fetchLatestIncident = async () => {

    try {

      const res =
        await api.get(
          "/incidents/my-incidents"
        );

      const incidents =
        res.data.data;

      if (
        incidents &&
        incidents.length > 0
      ) {

        // Latest incident

        setIncident(
          incidents[0]
        );

      }

    }

    catch {

      toast.error(
        "Failed to fetch incident"
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

      {

        !incident ? (

          <div className="rounded-xl bg-white p-8 shadow text-center">

            No incidents found.

          </div>

        ) : (

          <div className="rounded-xl bg-white p-8 shadow">

            <h2 className="text-2xl font-bold">

              {incident.title}

            </h2>

            {
              incident.description && (

                <p className="mt-3 text-gray-600">

                  {incident.description}

                </p>

              )
            }

            <div className="mt-6 flex flex-wrap gap-3">

              <span className="rounded bg-blue-100 px-3 py-1">

                {incident.type}

              </span>

              <span className="rounded bg-red-100 px-3 py-1">

                {incident.status}

              </span>

              <span className="rounded bg-green-100 px-3 py-1">

                Severity {incident.severity}

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
                    incident.statusHistory?.some(
                      (item) =>
                        item.status ===
                        step
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

                  incident.location
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
                    incident.updatedAt
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