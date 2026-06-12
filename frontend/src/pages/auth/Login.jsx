import { useState } from "react";

import {

  Link,

  useNavigate,

} from "react-router-dom";

import toast from "react-hot-toast";

import api from "../../services/api";

import {

  useAuth,

} from "../../context/AuthContext";

const Login = () => {

  const navigate =
    useNavigate();

  const {

    login,

  } = useAuth();

  const [

    loading,

    setLoading,

  ] = useState(false);

  const [

    formData,

    setFormData,

  ] = useState({

    email: "",

    password: "",

  });

  const handleChange = (

    e

  ) => {

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

            "/auth/login",

            formData

          );

        login(

          res.data.token,

          res.data.user

        );

        toast.success(

          "Login Successful"

        );

        const role =
          res.data.user.role;

        if (

          role ===
          "admin"

        ) {

          navigate(

            "/admin/dashboard"

          );

        }

        else if (

          role ===
          "unit"

        ) {

          navigate(

            "/unit/dashboard"

          );

        }

        else {

          navigate(

            "/citizen/dashboard"

          );

        }

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

          Login

        </h2>

        <form

          onSubmit={
            handleSubmit
          }

          className="space-y-4"

        >

          <input

            type="email"

            name="email"

            placeholder="Email"

            value={
              formData.email
            }

            onChange={
              handleChange
            }

            required

            className="w-full border p-3 rounded-lg"

          />

          <input

            type="password"

            name="password"

            placeholder="Password"

            value={
              formData.password
            }

            onChange={
              handleChange
            }

            required

            className="w-full border p-3 rounded-lg"

          />

          <button

            type="submit"

            disabled={
              loading
            }

            className="w-full bg-blue-600 text-white p-3 rounded-lg"

          >

            {

              loading

              ? "Logging in..."

              : "Login"

            }

          </button>

        </form>

        <p className="mt-5 text-center">

          Don't have an account?

          {" "}

          <Link

            to="/signup"

            className="text-blue-600"

          >

            Sign Up

          </Link>

        </p>

          <div className="mt-6 border-t pt-6 text-center">

            <p className="text-sm text-gray-600">

              Are you an Emergency Response Unit?

            </p>

            <button
              type="button"
              onClick={() => navigate("/unit/login")}
              className="mt-2 font-semibold text-blue-600 transition hover:text-blue-700"
            >
              Login as Emergency Unit
            </button>

          </div>

      </div>

    </div>

  );

};

export default Login;