import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import toast from "react-hot-toast";

import api from "../../services/api";

const Signup = () => {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({

      name: "",

      email: "",

      password: "",

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
        "/auth/register",
        formData
      );

      toast.success(
        res.data.message
      );

      navigate("/login");

    } catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Registration failed"

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6">

          Create Account

        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input

            type="text"

            name="name"

            placeholder="Full Name"

            value={formData.name}

            onChange={handleChange}

            required

            className="w-full border p-3 rounded-lg"

          />

          <input

            type="email"

            name="email"

            placeholder="Email"

            value={formData.email}

            onChange={handleChange}

            required

            className="w-full border p-3 rounded-lg"

          />

          <input

            type="password"

            name="password"

            placeholder="Password"

            value={formData.password}

            onChange={handleChange}

            required

            className="w-full border p-3 rounded-lg"

          />

          <button

            type="submit"

            disabled={loading}

            className="w-full bg-blue-600 text-white p-3 rounded-lg"

          >

            {

              loading

              ? "Creating..."

              : "Sign Up"

            }

          </button>

        </form>

        <p className="mt-5 text-center">

          Already have an account?

          {" "}

          <Link

            to="/login"

            className="text-blue-600"

          >

            Login

          </Link>

        </p>

      </div>

    </div>

  );

};

export default Signup;