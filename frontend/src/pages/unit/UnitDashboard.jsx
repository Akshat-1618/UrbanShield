import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/layout/DashboardLayout";
import PrimaryButton from "../../components/ui/PrimaryButton";

import api from "../../services/api";

const UnitDashboard = () => {

  const [unit, setUnit] = useState(null);

  const [mission, setMission] = useState(null);

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData = async () => {

    try {

      const profileRes =
        await api.get("/units/me");

      setUnit(profileRes.data.data);

      const missionRes =
        await api.get("/units/my-mission");

      console.log(
  missionRes.data.data
);

      setMission(missionRes.data.data);

    } catch {

      toast.error(
        "Failed to load dashboard"
      );

    }

  };

  const updateStatus = async (
  status
) => {

  try {

    await api.patch(

      `/incidents/${mission._id}/status`,

      {

        status,

      }

    );

    toast.success(
      "Status updated successfully"
    );

    fetchData();

  } catch (error) {

    toast.error(

      error.response?.data?.message ||

      "Failed to update status"

    );

  }

};

  return (

    <DashboardLayout>

      <div className="mb-8">

        <h1 className="text-4xl font-bold">

          Welcome,

          {" "}

          {unit?.unitName}

          🚑

        </h1>

        <p className="mt-2 text-gray-600">

          {unit?.unitType}

        </p>

      </div>

      <div className="rounded-xl bg-white p-6 shadow">

        <h2 className="text-2xl font-semibold">

          Current Unit Status

        </h2>

        <p className="mt-3">

          {unit?.status}

        </p>

      </div>

      <div className="mt-8 rounded-xl bg-white p-6 shadow">

        <h2 className="mb-5 text-2xl font-semibold">

          Current Mission

        </h2>

        {

          mission ? (

            <>

              <h3 className="text-xl font-bold">

                {mission.title}

              </h3>

              <p className="mt-2">

                {mission.description}

              </p>

              <div className="mt-4 flex gap-3 flex-wrap">

                <span className="rounded bg-blue-100 px-3 py-1">

                  {mission.type}

                </span>

                <span className="rounded bg-red-100 px-3 py-1">

                  Severity

                  {" "}

                  {mission.severity}

                </span>

              </div>

            </>

          ) : (

            <p>

              No active mission assigned.

            </p>

          )

        }

      </div>

      {

        mission && (

          <div className="mt-8 rounded-xl bg-white p-6 shadow">

            <h2 className="mb-5 text-2xl font-semibold">

              Quick Actions

            </h2>

            <div className="flex flex-wrap gap-4">

  {mission.status === "ASSIGNED" && (

    <PrimaryButton
      onClick={() =>
        updateStatus("EN_ROUTE")
      }
    >
      Start Journey
    </PrimaryButton>

  )}

  {mission.status === "EN_ROUTE" && (

    <PrimaryButton
      onClick={() =>
        updateStatus("ARRIVED")
      }
    >
      Arrived
    </PrimaryButton>

  )}

  {mission.status === "ARRIVED" && (

    <PrimaryButton
      onClick={() =>
        updateStatus("RESOLVED")
      }
    >
      Resolved
    </PrimaryButton>

  )}

</div>

          </div>

        )

      }

    </DashboardLayout>

  );

};

export default UnitDashboard;