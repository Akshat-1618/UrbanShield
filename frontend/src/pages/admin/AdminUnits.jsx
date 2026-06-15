import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import DashboardLayout from "../../components/layout/DashboardLayout";

import api from "../../services/api";
import socket from "../../services/socket";

import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/ui/PrimaryButton";

const AdminUnits = () => {

  const navigate = useNavigate();

  const [units, setUnits] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

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

  const fetchUnits =
    async () => {

      try {

        const res =
          await api.get(
            "/units"
          );

        setUnits(
          res.data.data
        );

      } catch {

        toast.error(
          "Failed to fetch units"
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

      <div className="flex items-center justify-between mb-8">

        <h1 className="text-4xl font-bold">

          Emergency Units

        </h1>

        <PrimaryButton
          onClick={() =>
            navigate("/admin/create-unit")
          }
        >
          Create Unit
        </PrimaryButton>

      </div>

      {

        units.length === 0 ? (

          <div className="rounded-xl bg-white p-8 shadow text-center">

            No units found.

          </div>

        ) : (

          <div className="grid gap-6">

            {

              units.map(

                (unit) => (

                  <div

                    key={
                      unit._id
                    }

                    className="rounded-xl bg-white p-6 shadow"

                  >

                    <div className="flex items-center justify-between">

                      <div>

                        <h2 className="text-2xl font-bold">

                          {

                            unit.unitName

                          }

                        </h2>

                        <p className="text-gray-600">

                          {

                            unit.email

                          }

                        </p>

                      </div>

                      <div>

                        <span className="rounded bg-blue-100 px-3 py-1">

                          {

                            unit.unitType

                          }

                        </span>

                      </div>

                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">

                      <span className="rounded bg-green-100 px-3 py-1">

                        Status:

                        {" "}

                        {

                          unit.status

                        }

                      </span>

                      <span className="mt-2 text-gray-600">

                        Location:

                        {

                          unit.currentLocation.areaName

                        }

                      </span>

                      <span className="rounded bg-yellow-100 px-3 py-1">

                        Availability:

                        {" "}

                        {

                          unit.availability

                            ? "Available"

                            : "Busy"

                        }

                      </span>

                    </div>

                    <div className="mt-5 text-gray-700">

                      Current Mission:

                      {" "}

                      {

                        unit.currentMission

                          ? unit.currentMission.title

                          : "None"

                      }

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

export default AdminUnits;