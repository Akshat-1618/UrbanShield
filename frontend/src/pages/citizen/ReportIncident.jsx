import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaExclamationTriangle } from "react-icons/fa";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PrimaryButton from "../../components/ui/PrimaryButton";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import FormField from "../../components/ui/FormField";
import { inputClasses } from "../../components/ui/inputStyles";
import api from "../../services/api";
import cityGraph from "../../data/cityGraph";

const areaOptions = Object.values(cityGraph.nodes).map((node) => node.name);

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
      const res = await api.post("/incidents", formData);
      toast.success(res.data.message);
      navigate("/citizen/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create incident");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <PageHeader
        eyebrow="Citizen Portal"
        title="Report an Emergency"
        description="Provide accurate details so the nearest available unit can be dispatched to you as quickly as possible."
      />

      <Card className="mx-auto max-w-3xl animate-fade-in-up animate-delay-1">
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField label="Incident Title">
            <input
              type="text"
              name="title"
              placeholder="e.g. Major Road Accident"
              value={formData.title}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </FormField>

          <FormField label="Description" hint="Optional, but helpful for responders.">
            <textarea
              rows={5}
              name="description"
              placeholder="Describe what happened..."
              value={formData.description}
              onChange={handleChange}
              className={inputClasses}
            />
          </FormField>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField label="Emergency Type">
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={inputClasses}
              >
                <option value="ACCIDENT">Accident</option>
                <option value="FIRE">Fire</option>
                <option value="MEDICAL">Medical</option>
                <option value="CRIME">Crime</option>
                <option value="INFRASTRUCTURE">Infrastructure</option>
              </select>
            </FormField>

            <FormField label="Priority">
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className={inputClasses}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </FormField>
          </div>

          <FormField label="Incident Location">
            <select
              name="areaName"
              value={formData.areaName}
              onChange={handleChange}
              className={inputClasses}
            >
              {areaOptions.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </FormField>

          <div className="pt-2">
            <PrimaryButton
              type="submit"
              disabled={loading}
              variant="danger"
              icon={FaExclamationTriangle}
            >
              {loading ? "Submitting..." : "Report Incident"}
            </PrimaryButton>
          </div>
        </form>
      </Card>
    </DashboardLayout>
  );
};

export default ReportIncident;
