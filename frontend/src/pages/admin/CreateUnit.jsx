import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import DashboardLayout from "../../components/layout/DashboardLayout";

import api from "../../services/api";

const CreateUnit = () => {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({

      unitName: "",

      email: "",

      password: "",

      unitType: "AMBULANCE",

      availability: true,

      areaName: "Sector 18",

    });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const res =
          await api.post(

            "/units",

            formData

          );

        toast.success(

          res.data.message

        );

        navigate(
          "/admin/units"
        );

      } catch (error) {

        toast.error(

          error.response?.data?.message ||

          "Failed to create unit"

        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <DashboardLayout>

      <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow">

        <h1 className="mb-6 text-3xl font-bold">

          Create Emergency Unit

        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            className="w-full rounded border p-3"
            placeholder="Unit Name"
            name="unitName"
            onChange={handleChange}
            required
          />

          <input
            className="w-full rounded border p-3"
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleChange}
            required
          />

          <input
            className="w-full rounded border p-3"
            placeholder="Password"
            name="password"
            type="password"
            onChange={handleChange}
            required
          />

          <select
            className="w-full rounded border p-3"
            name="unitType"
            onChange={handleChange}
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

          <select
            className="w-full rounded border p-3"
            name="areaName"
            value={formData.areaName}
            onChange={handleChange}
          >

            <option value="Sector 18">Sector 18</option>

            <option value="Sector 16">Sector 16</option>

            <option value="Botanical Garden">
              Botanical Garden
            </option>

            <option value="Noida City Centre">
              Noida City Centre
            </option>

            <option value="Atta Market">
              Atta Market
            </option>

            <option value="District Hospital">
              District Hospital
            </option>

            <option value="Fire Headquarters">
              Fire Headquarters
            </option>

            <option value="Police Headquarters">
              Police Headquarters
            </option>

            <option value="Sector 62">
              Sector 62
            </option>

            <option value="Film City">
              Film City
            </option>

            <option value="Sector 137">
              Sector 137
            </option>

            <option value="Metro Depot">
              Metro Depot
            </option>

            <option value="Pari Chowk">
              Pari Chowk
            </option>

            <option value="Knowledge Park">
              Knowledge Park
            </option>

            <option value="Expo Mart">
              Expo Mart
            </option>

            <option value="Bus Terminal">
              Bus Terminal
            </option>

          </select>

          <button
            disabled={loading}
            className="w-full rounded bg-blue-600 p-3 text-white"
          >

            {

              loading

                ? "Creating..."

                : "Create Unit"

            }

          </button>

        </form>

      </div>

    </DashboardLayout>

  );

};

export default CreateUnit;