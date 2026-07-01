import { Link } from "react-router-dom";
import Logo from "../common/Logo";

const Footer = () => {
  return (
    <footer className="bg-[color:var(--color-aurora-900)] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col gap-10 border-b border-white/10 pb-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo variant="light" />
            <p className="mt-5 leading-relaxed text-white/60">
              A unified platform for reporting, dispatching and tracking
              emergency response across your city.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-white/50">
                Product
              </p>
              <div className="mt-4 flex flex-col gap-3 text-white/70">
                <a href="#platform" className="transition hover:text-white">
                  Platform
                </a>
                <a href="#how-it-works" className="transition hover:text-white">
                  How It Works
                </a>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-white/50">
                Access
              </p>
              <div className="mt-4 flex flex-col gap-3 text-white/70">
                <Link to="/login" className="transition hover:text-white">
                  Citizen Sign In
                </Link>
                <Link to="/unit/login" className="transition hover:text-white">
                  Unit Sign In
                </Link>
                <Link to="/signup" className="transition hover:text-white">
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-sm text-white/50 md:flex-row">
          <p>© 2026 UrbanShield. All rights reserved.</p>
          <p>Built for faster, safer cities.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
