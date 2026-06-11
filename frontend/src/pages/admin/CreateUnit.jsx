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

      currentLocation: {

        nodeId: "",

        areaName: "",

        coordinates: {

          lat: "",

          lng: "",

        },

      },

    });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const handleLocation = (e) => {

    setFormData({

      ...formData,

      currentLocation: {

        ...formData.currentLocation,

        [e.target.name]:
          e.target.value,

      },

    });

  };

  const handleCoordinates =
    (e) => {

      setFormData({

        ...formData,

        currentLocation: {

          ...formData.currentLocation,

          coordinates: {

            ...formData.currentLocation
              .coordinates,

            [e.target.name]:
              Number(
                e.target.value
              ),

          },

        },

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

          <input
            className="w-full rounded border p-3"
            placeholder="Node ID"
            name="nodeId"
            onChange={handleLocation}
            required
          />

          <input
            className="w-full rounded border p-3"
            placeholder="Area Name"
            name="areaName"
            onChange={handleLocation}
            required
          />

          <input
            className="w-full rounded border p-3"
            placeholder="Latitude"
            name="lat"
            type="number"
            step="any"
            onChange={handleCoordinates}
            required
          />

          <input
            className="w-full rounded border p-3"
            placeholder="Longitude"
            name="lng"
            type="number"
            step="any"
            onChange={handleCoordinates}
            required
          />

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