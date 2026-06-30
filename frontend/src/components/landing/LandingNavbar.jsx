import { Link } from "react-router-dom";
import Logo from "../common/Logo";

const LandingNavbar = () => {

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Logo />
        <div className="flex items-center gap-8">
          <a
            href="#features"
            className="hidden font-medium text-slate-600 transition hover:text-blue-600 md:block"
          >
            Features
          </a>
          <Link
            to="/login"
            className="rounded-lg px-5 py-2 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;