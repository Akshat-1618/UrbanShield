import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaAmbulance, FaPlusCircle, FaMapMarkerAlt } from "react-icons/fa";

import DashboardLayout from "../../components/layout/DashboardLayout";
import PrimaryButton from "../../components/ui/PrimaryButton";
import PageLoader from "../../components/ui/PageLoader";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import EmptyState from "../../components/ui/EmptyState";

import api from "../../services/api";
import socket from "../../services/socket";
import { getUnitStatus } from "../../utils/statusMeta";

const AdminUnits = () => {
  const navigate = useNavigate();
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUnits();
    socket.on("incidentUpdated", fetchUnits);
    return () => {
      socket.off("incidentUpdated", fetchUnits);
    };
  }, []);

  const fetchUnits = async () => {
    try {
      const res = await api.get("/units");
      setUnits(res.data.data);
    } catch {
      toast.error("Failed to fetch units");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <PageLoader label="Loading units..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageHeader
        eyebrow="Command Center"
        title="Emergency Units"
        description="Manage all deployed emergency response units across the city."
        actions={
          <PrimaryButton
            icon={FaPlusCircle}
            fullWidth={false}
            onClick={() => navigate("/admin/create-unit")}
          >
            Create Unit
          </PrimaryButton>
        }
      />

      {units.length === 0 ? (
        <EmptyState
          icon={FaAmbulance}
          title="No units available"
          description="Create your first emergency response unit to begin dispatching incidents."
        />
      ) : (
        <div className="grid gap-6 animate-fade-in-up animate-delay-1">
          {units.map((unit) => {
            const status = getUnitStatus(unit.status);
            return (
              <Card
                key={unit._id}
                className="transition hover:shadow-[var(--shadow-soft-lg)]"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-slate-900">
                      {unit.unitName}
                    </h2>
                    <p className="mt-1.5 text-sm text-slate-500">{unit.email}</p>
                    <div className="mt-5 flex flex-wrap gap-2.5">
                      <Badge tone="blue">{unit.unitType.replaceAll("_", " ")}</Badge>
                      <Badge tone={status.tone} icon={status.icon}>
                        {status.label}
                      </Badge>
                      <Badge tone={unit.availability ? "green" : "orange"}>
                        {unit.availability ? "Available" : "Busy"}
                      </Badge>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 px-5 py-3.5 text-center">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Current Area
                    </p>
                    <p className="mt-1 flex items-center justify-center gap-1.5 font-semibold text-slate-800">
                      <FaMapMarkerAlt className="text-slate-400" aria-hidden="true" />
                      {unit.currentLocation.areaName}
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid gap-6 border-t border-slate-100 pt-6 md:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Current Mission
                    </p>
                    <p className="mt-1 font-semibold text-slate-800">
                      {unit.currentMission?.title || "None"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Created On
                    </p>
                    <p className="mt-1 font-semibold text-slate-800">
                      {new Date(unit.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminUnits;
