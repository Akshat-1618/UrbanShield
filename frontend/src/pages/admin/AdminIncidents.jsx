import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PrimaryButton from "../../components/ui/PrimaryButton";

import api from "../../services/api";
import socket from "../../services/socket";

const AdminIncidents = () => {

  const [incidents, setIncidents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

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

  const fetchIncidents =
    async () => {

      try {

        const res =
          await api.get(
            "/incidents"
          );

        setIncidents(
          res.data.data
        );

      } catch {

        toast.error(
          "Failed to fetch incidents"
        );

      } finally {

        setLoading(false);

      }

    };

  const handleAutoAssign =
    async (id) => {

      try {

        const res =
          await api.patch(

            `/incidents/${id}/auto-assign`

          );

        toast.success(

          res.data.message

        );

        fetchIncidents();

      } catch (error) {

        toast.error(

          error.response?.data?.message ||

          "Auto assign failed"

        );

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

        All Incidents

      </h1>

      <div className="grid gap-6">

        {

          incidents.map(

            (incident) => (

              <div

                key={
                  incident._id
                }

                className="rounded-xl bg-white p-6 shadow"

              >

                <h2 className="text-2xl font-bold">

                  {

                    incident.title

                  }

                </h2>

                {

                  incident.description && (

                    <p className="mt-2 text-gray-600">

                      {incident.description}

                    </p>

                  )

                }

                <div className="mt-4 flex flex-wrap gap-3">

                  <span className="rounded bg-blue-100 px-3 py-1">

                    {

                      incident.type

                    }

                  </span>

                  <span className="rounded bg-red-100 px-3 py-1">

                    {

                      incident.status

                    }

                  </span>

                  <span className="rounded bg-green-100 px-3 py-1">

                    Severity:

                    {" "}

                    {

                      incident.severity

                    }

                  </span>

                  <span className="rounded bg-gray-100 px-3 py-1">

                    {

                      incident.location.areaName

                    }

                  </span>

                </div>

                <div className="mt-6 flex gap-4">

                  {

                    !incident.assignedUnit && (

                      <PrimaryButton

                        onClick={() =>

                          handleAutoAssign(

                            incident._id

                          )

                        }

                      >

                        Auto Assign

                      </PrimaryButton>

                    )

                  }

                </div>

              </div>

            )

          )

        }

      </div>

    </DashboardLayout>

  );

};

export default AdminIncidents;