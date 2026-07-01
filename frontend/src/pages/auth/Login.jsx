import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaArrowRight, FaAmbulance } from "react-icons/fa";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../components/layout/AuthLayout";
import PrimaryButton from "../../components/ui/PrimaryButton";
import FormField from "../../components/ui/FormField";
import { inputClasses } from "../../components/ui/inputStyles";

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
      const res = await api.post("/auth/login", formData);
      login(res.data.token, res.data.user);
      toast.success("Login Successful");
      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/citizen/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Sign in to keep your city responding faster."
      subtitle="Access incident reporting, live tracking and dispatch tools from a single, unified platform."
    >
      <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
      <p className="mt-1.5 text-sm text-slate-500">
        Sign in to continue to your UrbanShield dashboard.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <FormField label="Email">
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </FormField>
        <FormField label="Password">
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </FormField>
        <PrimaryButton type="submit" disabled={loading} icon={FaArrowRight}>
          {loading ? "Signing in..." : "Sign In"}
        </PrimaryButton>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-slate-500">Don't have an account? </span>
        <Link
          to="/signup"
          className="font-semibold text-[color:var(--color-aurora-600)] transition hover:text-[color:var(--color-aurora-700)]"
        >
          Create one
        </Link>
      </div>

      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Or
        </span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <button
        type="button"
        onClick={() => navigate("/unit/login")}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-[color:var(--color-aurora-300)]/40 bg-[color:var(--color-aurora-100)]/25 px-5 py-3 font-semibold text-[color:var(--color-aurora-800)] transition hover:bg-[color:var(--color-aurora-100)]/45"
      >
        <FaAmbulance aria-hidden="true" />
        Sign in as an Emergency Unit
      </button>
    </AuthLayout>
  );
};

export default Login;
