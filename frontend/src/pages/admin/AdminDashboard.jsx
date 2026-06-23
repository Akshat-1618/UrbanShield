import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PrimaryButton from "../../components/ui/PrimaryButton";
import StatCard from "../../components/ui/StatCard";
import { useAuth } from "../../context/AuthContext";
import CityMap from "../../components/map/CityMap";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import api from "../../services/api";
import socket from "../../services/socket";

const AdminDashboard = () => {

  const navigate = useNavigate();

  const { user } = useAuth();

  const [stats, setStats] = useState({

  totalIncidents: 0,

  activeIncidents: 0,

  resolvedIncidents: 0,

  availableUnits: 0,

  });

  const [units, setUnits] = useState([]);

  const [incidents, setIncidents] = useState([]);

  const [priorityQueue, setPriorityQueue] =
  useState([]);

const fetchDashboardData = async () => {

  try {

    const incidentsRes =
      await api.get("/incidents");

    const unitsRes =
      await api.get("/units");

    const incidents =
      incidentsRes.data.data;

    const units =
      unitsRes.data.data;

    const totalIncidents =
      incidents.length;

    const resolvedIncidents =
      incidents.filter(

        (incident) =>

          incident.status === "RESOLVED"

      ).length;

    const activeIncidents = incidents.filter((incident) => incident.status !== "RESOLVED").length;

    const availableUnits =units.filter(
        (unit) => unit.availability
      ).length;

    setStats({
      totalIncidents,
      activeIncidents,
      resolvedIncidents,
      availableUnits,
    });

    const pendingRes =
      await api.get(
        "/incidents/pending"
      );

    setPriorityQueue(
      pendingRes.data.data
    );

    setIncidents(incidents);

    setUnits(units);

  } catch {

    toast.error(
      "Failed to load dashboard"
    );

  }

};

useEffect(() => {

    fetchDashboardData();

    socket.on(
      "incidentUpdated",
      fetchDashboardData
    );

    return () => {

      socket.off(
        "incidentUpdated",
        fetchDashboardData
      );

    };

  }, []);

  return (

    <DashboardLayout>

      <div className="mb-8">

        <h1 className="text-4xl font-bold">

          Welcome,

          {" "}

          {user?.name}

          👋

        </h1>

        <p className="mt-2 text-gray-600">

          Monitor incidents, manage emergency
          units and coordinate city response.

        </p>

      </div>

      <div className="mt-10 rounded-xl bg-white p-6 shadow">

        <h2 className="mb-5 text-2xl font-semibold">

          City Map

        </h2>

        <CityMap

          units={units}

          incidents={incidents}

          showNodes={true}

        />

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard

          title="Total Incidents"

          value={stats.totalIncidents}

        />

        <StatCard

          title="Active Incidents"

          value={stats.activeIncidents}

        />

        <StatCard

          title="Resolved"

          value={stats.resolvedIncidents}

        />

        <StatCard

          title="Available Units"

          value={stats.availableUnits}

        />

      </div>

      <div className="mt-10 rounded-xl bg-white p-6 shadow">

      <h2 className="mb-5 text-2xl font-semibold">

        Priority Dispatch Queue

      </h2>

      {

        priorityQueue.length === 0 ? (

          <div className="rounded-lg border border-dashed p-8 text-center text-gray-500">

            No pending incidents.

          </div>

        ) : (

          <div className="space-y-4">

            {

              priorityQueue.map(

                (incident, index) => (

                  <div

                    key={incident._id}

                    className="flex items-center justify-between rounded-lg border p-4"

                  >

                    <div>

                      <h3 className="text-lg font-semibold">

                        #{index + 1}

                        {" "}

                        {incident.title}

                      </h3>

                      <p className="text-sm text-gray-500">

                        {incident.type}

                      </p>

                    </div>

                    <div className="text-right">

                      <p className="font-bold">

                        Severity

                      </p>

                      <p className="text-red-600">

                        {incident.severity}

                      </p>

                    </div>

                  </div>

                )

              )

            }

          </div>

        )

      }

    </div>

      <div className="mt-10 rounded-xl bg-white p-6 shadow">

        <h2 className="mb-5 text-2xl font-semibold">

          Quick Actions

        </h2>

        <div className="flex flex-wrap gap-4">

          <PrimaryButton
            onClick={() =>
              navigate(
                "/admin/incidents"
              )
            }
          >
            View Incidents
          </PrimaryButton>

          <PrimaryButton
            onClick={() =>
              navigate(
                "/admin/units"
              )
            }
          >
            Manage Units
          </PrimaryButton>

        </div>

      </div>

      <div className="mt-10 rounded-xl bg-white p-6 shadow">

        <h2 className="mb-4 text-2xl font-semibold">

          Recent Activity

        </h2>

        <div className="rounded-lg border border-dashed p-10 text-center text-gray-500">

          No recent activity.

        </div>

      </div>

    </DashboardLayout>

  );

};

export default AdminDashboard;