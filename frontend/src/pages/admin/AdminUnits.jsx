import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/layout/DashboardLayout";
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

      const res = await api.get(
        "/units"
      );

      setUnits(
        res.data.data
      );

    }

    catch {

      toast.error(
        "Failed to fetch units"
      );

    }

    finally {

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
        return "bg-slate-100 text-slate-700";

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

      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-4xl font-bold text-slate-900">

            Emergency Units

          </h1>

          <p className="mt-2 text-slate-500">

            Manage all deployed emergency response units across the city.

          </p>

        </div>

        <PrimaryButton
          onClick={() =>
            navigate(
              "/admin/create-unit"
            )
          }
        >
          ➕ Create Unit
        </PrimaryButton>

      </div>

      {

        units.length === 0 ? (

          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">

            <div className="text-6xl">

              🚑

            </div>

            <h2 className="mt-5 text-3xl font-bold">

              No Units Available

            </h2>

            <p className="mt-3 text-slate-500">

              Create your first emergency response unit to begin dispatching incidents.

            </p>

          </div>

        ) : (

          <div className="grid gap-6">

            {

              units.map((unit) => (

                <div
                  key={unit._id}
                  className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-lg"
                >

                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                    <div className="flex-1">

                      <h2 className="text-2xl font-bold text-slate-900">

                        {unit.unitName}

                      </h2>

                      <p className="mt-2 text-slate-500">

                        {unit.email}

                      </p>

                      <div className="mt-6 flex flex-wrap gap-3">

                        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

                          {unit.unitType}

                        </span>

                        <span
                          className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusColor(
                            unit.status
                          )}`}
                        >

                          {unit.status.replaceAll(
                            "_",
                            " "
                          )}

                        </span>

                        <span
                          className={`rounded-full px-4 py-2 text-sm font-semibold ${
                            unit.availability
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >

                          {

                            unit.availability
                              ? "Available"
                              : "Busy"

                          }

                        </span>

                      </div>

                    </div>

                    <div className="rounded-2xl bg-slate-50 px-5 py-3 text-center">

                      <p className="text-sm text-slate-500">

                        Current Area

                      </p>

                      <p className="mt-1 font-semibold">

                        📍 {unit.currentLocation.areaName}

                      </p>

                    </div>

                  </div>

                  <div className="mt-8 grid gap-6 md:grid-cols-2">

                    <div>

                      <p className="text-sm text-slate-500">

                        Current Mission

                      </p>

                      <p className="font-semibold">

                        {

                          unit.currentMission?.title ||

                          "None"

                        }

                      </p>

                    </div>

                    <div>

                      <p className="text-sm text-slate-500">

                        Created On

                      </p>

                      <p className="font-semibold">

                        {

                          new Date(
                            unit.createdAt
                          ).toLocaleDateString()

                        }

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

export default AdminUnits;