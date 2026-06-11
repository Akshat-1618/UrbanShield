import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import api from "../../services/api";

import { useAuth } from "../../context/AuthContext";

const UnitLogin = () => {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({

      email: "",

      password: "",

    });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const res =
          await api.post(

            "/units/login",

            formData

          );

        login(

          res.data.token,

          {

            ...res.data.unit,

            role: "unit",

          }

        );

        toast.success(

          res.data.message

        );

        navigate(
          "/unit/dashboard"
        );

      } catch (error) {

        toast.error(

          error.response?.data?.message ||

          "Login failed"

        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6">

          Unit Login

        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg"
          >

            {

              loading

                ? "Logging in..."

                : "Login"

            }

          </button>

        </form>

        <p className="text-center mt-5">

          Admin or Citizen?

          {" "}

          <Link
            to="/login"
            className="text-blue-600"
          >

            Login Here

          </Link>

        </p>

      </div>

    </div>

  );

};

export default UnitLogin;