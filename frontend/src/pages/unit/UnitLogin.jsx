import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../components/layout/AuthLayout";
import PrimaryButton from "../../components/ui/PrimaryButton";
import FormField from "../../components/ui/FormField";
import { inputClasses } from "../../components/ui/inputStyles";

const UnitLogin = () => {
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
      const res = await api.post("/units/login", formData);
      login(res.data.token, {
        ...res.data.unit,
        role: "unit",
      });
      toast.success("Welcome Unit!");
      navigate("/unit/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Unit access"
      title="Your next mission, one tap away."
      subtitle="Sign in to view assigned incidents, follow the optimized route and update mission status in real time."
    >
      <h1 className="text-2xl font-bold text-slate-900">
        Emergency Unit Login
      </h1>
      <p className="mt-1.5 text-sm text-slate-500">
        Access your response dashboard and mission queue.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <FormField label="Email">
          <input
            type="email"
            name="email"
            placeholder="unit@example.com"
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
        <span className="text-slate-500">Admin or Citizen? </span>
        <Link
          to="/login"
          className="font-semibold text-[color:var(--color-aurora-600)] transition hover:text-[color:var(--color-aurora-700)]"
        >
          Sign in here
        </Link>
      </div>
    </AuthLayout>
  );
};

export default UnitLogin;
