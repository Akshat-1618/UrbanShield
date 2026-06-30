import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/layout/DashboardLayout";
import PrimaryButton from "../../components/ui/PrimaryButton";

import api from "../../services/api";

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

      const res = await api.post(
        "/units",
        formData
      );

      toast.success(
        res.data.message
      );

      navigate(
        "/admin/units"
      );

    }

    catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to create unit"
      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <DashboardLayout>

      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <h1 className="text-3xl font-bold text-slate-900">

          Create Emergency Unit

        </h1>

        <p className="mt-2 text-slate-500">

          Register a new emergency response unit and assign its initial deployment location.

        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">

              Unit Name

            </label>

            <input
              type="text"
              name="unitName"
              value={formData.unitName}
              onChange={handleChange}
              placeholder="e.g. Alpha Ambulance"
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">

              Email

            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="unit@email.com"
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">

              Password

            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 6 characters"
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">

              Unit Type

            </label>

            <select
              name="unitType"
              value={formData.unitType}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
            >

              <option value="AMBULANCE">
                Ambulance
              </option>

              <option value="POLICE">
                Police
              </option>

              <option value="FIRE_BRIGADE">
                Fire Brigade
              </option>

            </select>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">

              Initial Location

            </label>

            <select
              name="areaName"
              value={formData.areaName}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
            >

              <option value="Sector 18">Sector 18</option>
              <option value="Sector 16">Sector 16</option>
              <option value="Botanical Garden">Botanical Garden</option>
              <option value="Noida City Centre">Noida City Centre</option>
              <option value="Atta Market">Atta Market</option>
              <option value="District Hospital">District Hospital</option>
              <option value="Fire Headquarters">Fire Headquarters</option>
              <option value="Police Headquarters">Police Headquarters</option>
              <option value="Sector 62">Sector 62</option>
              <option value="Film City">Film City</option>
              <option value="Sector 137">Sector 137</option>
              <option value="Metro Depot">Metro Depot</option>
              <option value="Pari Chowk">Pari Chowk</option>
              <option value="Knowledge Park">Knowledge Park</option>
              <option value="Expo Mart">Expo Mart</option>
              <option value="Bus Terminal">Bus Terminal</option>

            </select>

          </div>

          <PrimaryButton
            type="submit"
            disabled={loading}
          >

            {

              loading
                ? "Creating Unit..."
                : "Create Emergency Unit"

            }

          </PrimaryButton>

        </form>

      </div>

    </DashboardLayout>

  );

};

export default CreateUnit;