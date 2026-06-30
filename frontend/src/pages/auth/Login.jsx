import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../components/common/Logo";
import PrimaryButton from "../../components/ui/PrimaryButton";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
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
        "/auth/login",
        formData
      );
      login(
        res.data.token,
        res.data.user
      );
      toast.success("Login Successful");
      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      }
      else {
        navigate("/citizen/dashboard");
      }
    }
    catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Login failed"
      );
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 p-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <h1 className="text-center text-3xl font-bold text-slate-900">
          Welcome Back
        </h1>
        <p className="mt-2 text-center text-slate-500">
          Login to continue to UrbanShield
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
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
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
            />
          </div>
          <PrimaryButton
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </PrimaryButton>
        </form>
        <div className="mt-8 text-center text-sm">
          <span className="text-slate-600">
            Don't have an account?
          </span>
          {" "}
          <Link
            to="/signup"
            className="font-semibold text-blue-600 transition hover:text-blue-700"
          >
            Create Account
          </Link>
        </div>
        <div className="my-8 flex items-center">
          <div className="h-px flex-1 bg-slate-200"></div>
          <span className="px-4 text-sm text-slate-400">
            OR
          </span>
          <div className="h-px flex-1 bg-slate-200"></div>
        </div>
        <div className="text-center">
          <p className="text-sm text-slate-600">
            Emergency Response Unit?
          </p>
          <button
            type="button"
            onClick={() => navigate("/unit/login")}
            className="mt-3 w-full rounded-xl border border-blue-600 px-5 py-3 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
          >
            Login as Emergency Unit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;