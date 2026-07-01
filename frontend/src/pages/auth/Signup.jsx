import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";
import api from "../../services/api";
import AuthLayout from "../../components/layout/AuthLayout";
import PrimaryButton from "../../components/ui/PrimaryButton";
import FormField from "../../components/ui/FormField";
import { inputClasses } from "../../components/ui/inputStyles";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
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
      const res = await api.post("/auth/register", formData);
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Get started"
      title="Report emergencies in seconds, not minutes."
      subtitle="Create a citizen account to submit reports, track responders and stay informed until help arrives."
    >
      <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
      <p className="mt-1.5 text-sm text-slate-500">
        Join UrbanShield to report and track emergencies.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <FormField label="Full Name">
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </FormField>
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
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </FormField>
        <PrimaryButton type="submit" disabled={loading} icon={FaArrowRight}>
          {loading ? "Creating account..." : "Create Account"}
        </PrimaryButton>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-slate-500">Already have an account? </span>
        <Link
          to="/login"
          className="font-semibold text-[color:var(--color-aurora-600)] transition hover:text-[color:var(--color-aurora-700)]"
        >
          Sign in
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Signup;
