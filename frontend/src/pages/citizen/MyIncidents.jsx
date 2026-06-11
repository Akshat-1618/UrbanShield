import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import DashboardLayout from "../../components/layout/DashboardLayout";

import api from "../../services/api";

const MyIncidents = () => {

  const [incidents, setIncidents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchIncidents();

  }, []);

  const fetchIncidents =
    async () => {

      try {

        const res =
          await api.get(
            "/incidents/my-incidents"
          );

        setIncidents(
          res.data.data
        );

      } catch (error) {

        toast.error(
          "Failed to load incidents"
        );

      } finally {

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

      <h1 className="mb-6 text-3xl font-bold">

        My Incidents

      </h1>

      {

        incidents.length === 0 ? (

          <div className="rounded-xl bg-white p-8 shadow text-center">

            No incidents found.

          </div>

        ) : (

          <div className="grid gap-5">

            {

              incidents.map(

                (incident) => (

                  <div

                    key={
                      incident._id
                    }

                    className="rounded-xl bg-white p-6 shadow"

                  >

                    <h2 className="text-xl font-bold">

                      {

                        incident.title

                      }

                    </h2>

                    <p className="mt-2 text-gray-600">

                      {

                        incident.description

                      }

                    </p>

                    <div className="mt-4 flex flex-wrap gap-3">

                      <span className="rounded bg-blue-100 px-3 py-1 text-sm">

                        {

                          incident.type

                        }

                      </span>

                      <span className="rounded bg-red-100 px-3 py-1 text-sm">

                        {

                          incident.status

                        }

                      </span>

                      <span className="rounded bg-green-100 px-3 py-1 text-sm">

                        Severity:

                        {" "}

                        {

                          incident.severity

                        }

                      </span>

                    </div>

                  </div>

                )

              )

            }

          </div>

        )

      }

    </DashboardLayout>

  );

};

export default MyIncidents;