import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import DashboardLayout from "../../components/layout/DashboardLayout";

import api from "../../services/api";

const ReportIncident = () => {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({

      title: "",

      description: "",

      type: "ACCIDENT",

      priority: "LOW",

      areaName: "Sector 18",

  });

  const handleChange = (e) => {

    const {

      name,

      value,

    } = e.target;

    setFormData({

      ...formData,

      [name]: value,

    });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const res =
          await api.post(

            "/incidents",

            formData

          );

        toast.success(

          res.data.message

        );

        navigate(
          "/citizen/dashboard"
        );

      } catch (error) {

        toast.error(

          error.response?.data?.message ||

          "Failed to create incident"

        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <DashboardLayout>

      <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow">

        <h1 className="mb-6 text-3xl font-bold">

          Report Emergency

        </h1>

        <form

          onSubmit={handleSubmit}

          className="space-y-4"

        >

          <input

            className="w-full rounded border p-3"

            placeholder="Title"

            name="title"

            value={formData.title}

            onChange={handleChange}

            required

          />

          <textarea

            className="w-full rounded border p-3"

            rows={4}

            placeholder="Description (Optional)"

            name="description"

            value={formData.description}

            onChange={handleChange}

          />

          <select

            name="type"

            value={formData.type}

            onChange={handleChange}

            className="w-full rounded border p-3"

          >

            <option value="ACCIDENT">

              Accident

            </option>

            <option value="FIRE">

              Fire

            </option>

            <option value="MEDICAL">

              Medical

            </option>

            <option value="CRIME">

              Crime

            </option>

            <option value="INFRASTRUCTURE">

              Infrastructure

            </option>

          </select>

          <select

            name="priority"

            value={formData.priority}

            onChange={handleChange}

            className="w-full rounded border p-3"

          >

            <option value="LOW">

              LOW

            </option>

            <option value="MEDIUM">

              MEDIUM

            </option>

            <option value="HIGH">

              HIGH

            </option>

            <option value="CRITICAL">

              CRITICAL

            </option>

          </select>

          <select

            name="areaName"

            value={formData.areaName}

            onChange={handleChange}

            className="w-full rounded border p-3"

          >

            <option>
              Sector 18
            </option>

            <option>
              Sector 16
            </option>

            <option>
              Botanical Garden
            </option>

            <option>
              Noida City Centre
            </option>

            <option>
              Atta Market
            </option>

            <option>
              District Hospital
            </option>

            <option>
              Fire Headquarters
            </option>

            <option>
              Police Headquarters
            </option>

            <option>
              Sector 62
            </option>

            <option>
              Film City
            </option>

            <option>
              Sector 137
            </option>

            <option>
              Metro Depot
            </option>

            <option>
              Pari Chowk
            </option>

            <option>
              Knowledge Park
            </option>

            <option>
              Expo Mart
            </option>

            <option>
              Bus Terminal
            </option>

          </select>

          <button

            disabled={loading}

            className="w-full rounded bg-blue-600 p-3 text-white"

          >

            {

              loading

              ? "Submitting..."

              : "Report Incident"

            }

          </button>

        </form>

      </div>

    </DashboardLayout>

  );

};

export default ReportIncident;