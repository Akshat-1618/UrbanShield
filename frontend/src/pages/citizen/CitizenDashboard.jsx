import DashboardLayout from "../../components/layout/DashboardLayout";

import StatCard from "../../components/ui/StatCard";

import PrimaryButton from "../../components/ui/PrimaryButton";

import { useAuth } from "../../context/AuthContext";

import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import api from "../../services/api";

const CitizenDashboard = () => {

  const { user } = useAuth();

  const navigate = useNavigate();

  const [stats, setStats] = useState({

    total: 0,

    active: 0,

    resolved: 0,

  });

  const fetchStats = async () => {

      try {

        const res =
          await api.get(
            "/incidents/my-incidents"
          );

        const incidents =
          res.data.data;

        const total =
          incidents.length;

        const resolved =
          incidents.filter(

            (incident) =>

              incident.status ===
              "RESOLVED"

          ).length;

        const active =
          total - resolved;

        setStats({

          total,

          active,

          resolved,

        });

      } catch (error) {

        toast.error(
          "Failed to load dashboard"
        );

      }

    };

  useEffect(() => {

    fetchStats();

  }, []);

  return (

    <DashboardLayout>

      {/* Welcome */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold">

          Welcome,

          {" "}

          {user?.name}

          👋

        </h1>

        <p className="mt-2 text-gray-600">

          Report emergencies, monitor incident
          status and stay connected with
          UrbanShield.

        </p>

      </div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard

          title="Total Incidents"

          value={stats.total}

        />

        <StatCard

          title="Active Incidents"

          value={stats.active}

        />

        <StatCard

          title="Resolved"

          value={stats.resolved}

        />

        <StatCard

          title="Emergency Alerts"

          value="0"

        />

      </div>

      {/* Quick Actions */}

      <div className="mt-10 rounded-xl bg-white p-6 shadow">

        <h2 className="mb-4 text-2xl font-semibold">

          Quick Actions

        </h2>

        <div className="flex flex-wrap gap-4">

        <PrimaryButton
            onClick={() =>
                navigate("/citizen/report")
            }
        >
            Report New Incident
        </PrimaryButton>

        <PrimaryButton
            onClick={() =>
              navigate(
                "/citizen/my-incidents"
              )
            }
          >
            View My Incidents
        </PrimaryButton>

          <PrimaryButton>

            Track Incident

          </PrimaryButton>

        </div>

      </div>

      {/* Recent Incidents */}

      <div className="mt-10 rounded-xl bg-white p-6 shadow">

        <h2 className="mb-4 text-2xl font-semibold">

          Recent Activity

        </h2>

        <div className="rounded-lg border border-dashed p-10 text-center text-gray-500">

          No incidents available.

        </div>

      </div>

    </DashboardLayout>

  );

};

export default CitizenDashboard;