import { Link } from "react-router-dom";
import {
  FaBolt,
  FaMapMarkedAlt,
  FaShieldAlt,
} from "react-icons/fa";
import Logo from "../common/Logo";

const highlights = [
  {
    icon: FaBolt,
    title: "Instant dispatch",
    description: "Nearest available unit assigned automatically.",
  },
  {
    icon: FaMapMarkedAlt,
    title: "Live situational awareness",
    description: "Track every incident and unit on a real-time city map.",
  },
  {
    icon: FaShieldAlt,
    title: "Reliable coordination",
    description: "Purpose-built for emergency operations at city scale.",
  },
];

/**
 * Shared split-screen shell for all authentication pages. `children`
 * renders the form itself; nothing about form fields or submission
 * logic lives in this component.
 */
const AuthLayout = ({ eyebrow, title, subtitle, children }) => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="relative hidden w-[44%] flex-col justify-between overflow-hidden bg-gradient-to-br from-[color:var(--color-aurora-900)] via-[color:var(--color-aurora-800)] to-[color:var(--color-aurora-700)] p-12 text-white lg:flex">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[color:var(--color-aurora-300)]/20 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-[color:var(--color-aurora-400)]/15 blur-3xl" />

        <div className="relative">
          <Link to="/">
            <Logo variant="light" />
          </Link>
        </div>

        <div className="relative">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--color-aurora-200)]">
            {eyebrow}
          </p>
          <h2 className="mt-4 max-w-md text-4xl font-bold leading-tight tracking-tight">
            {title}
          </h2>
          <p className="mt-4 max-w-sm text-slate-300">{subtitle}</p>

          <div className="mt-12 space-y-6">
            {highlights.map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[color:var(--color-aurora-200)]">
                  <item.icon aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="mt-0.5 text-sm text-slate-400">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-slate-500">
          © 2026 UrbanShield. All rights reserved.
        </p>
      </div>

      <div className="flex w-full flex-1 items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <div className="mb-8 flex justify-center lg:hidden">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[var(--shadow-soft-lg)] sm:p-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
