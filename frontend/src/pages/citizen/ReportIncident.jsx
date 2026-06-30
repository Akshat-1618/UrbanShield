import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PrimaryButton from "../../components/ui/PrimaryButton";
import api from "../../services/api";

const ReportIncident = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "ACCIDENT",
    priority: "LOW",
    areaName: "Sector 18",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post(
        "/incidents",
        formData
      );
      toast.success(
        res.data.message
      );
      navigate(
        "/citizen/dashboard"
      );
    }
    catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to create incident"
      );
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">
            Report Emergency
          </h1>
          <p className="mt-2 text-slate-500">
            Provide accurate information so emergency responders can reach you as quickly as possible.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Incident Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Example: Major Road Accident"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Description
            </label>
            <textarea
              rows={5}
              name="description"
              placeholder="Describe what happened..."
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
            />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Emergency Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
              >
                <option value="ACCIDENT">Accident</option>
                <option value="FIRE">Fire</option>
                <option value="MEDICAL">Medical</option>
                <option value="CRIME">Crime</option>
                <option value="INFRASTRUCTURE">Infrastructure</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Incident Location
            </label>
            <select
              name="areaName"
              value={formData.areaName}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
            >
              <option>Sector 18</option>
              <option>Sector 16</option>
              <option>Botanical Garden</option>
              <option>Noida City Centre</option>
              <option>Atta Market</option>
              <option>District Hospital</option>
              <option>Fire Headquarters</option>
              <option>Police Headquarters</option>
              <option>Sector 62</option>
              <option>Film City</option>
              <option>Sector 137</option>
              <option>Metro Depot</option>
              <option>Pari Chowk</option>
              <option>Knowledge Park</option>
              <option>Expo Mart</option>
              <option>Bus Terminal</option>
            </select>
          </div>
          <div className="pt-2">
            <PrimaryButton
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Submitting..."
                : "🚨 Report Incident"}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default ReportIncident;