import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaPlusCircle } from "react-icons/fa";

import DashboardLayout from "../../components/layout/DashboardLayout";
import PrimaryButton from "../../components/ui/PrimaryButton";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import FormField from "../../components/ui/FormField";
import { inputClasses } from "../../components/ui/inputStyles";

import api from "../../services/api";
import cityGraph from "../../data/cityGraph";

const areaOptions = Object.values(cityGraph.nodes).map((node) => node.name);

const CreateUnit = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    unitName: "",
    email: "",
    password: "",
    unitType: "AMBULANCE",
    areaName: "Sector 18",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/units", formData);
      toast.success(res.data.message);
      navigate("/admin/units");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create unit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <PageHeader
        eyebrow="Command Center"
        title="Create Emergency Unit"
        description="Register a new emergency response unit and assign its initial deployment location."
      />

      <Card className="mx-auto max-w-3xl animate-fade-in-up animate-delay-1">
        <form onSubmit={handleSubmit} className="space-y-5">
          <FormField label="Unit Name">
            <input
              type="text"
              name="unitName"
              value={formData.unitName}
              onChange={handleChange}
              placeholder="e.g. Alpha Ambulance"
              required
              className={inputClasses}
            />
          </FormField>

          <FormField label="Email">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="unit@example.com"
              required
              className={inputClasses}
            />
          </FormField>

          <FormField label="Password" hint="Minimum 6 characters.">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Set a login password"
              required
              className={inputClasses}
            />
          </FormField>

          <FormField label="Unit Type">
            <select
              name="unitType"
              value={formData.unitType}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="AMBULANCE">Ambulance</option>
              <option value="POLICE">Police</option>
              <option value="FIRE_BRIGADE">Fire Brigade</option>
            </select>
          </FormField>

          <FormField label="Initial Location">
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
            <PrimaryButton type="submit" disabled={loading} icon={FaPlusCircle}>
              {loading ? "Creating Unit..." : "Create Emergency Unit"}
            </PrimaryButton>
          </div>
        </form>
      </Card>
    </DashboardLayout>
  );
};

export default CreateUnit;
