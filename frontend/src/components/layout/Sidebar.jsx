import { NavLink } from "react-router-dom";
import {
  FaChartPie,
  FaExclamationTriangle,
  FaClipboardList,
  FaMapMarkedAlt,
  FaTruck,
  FaPlusCircle,
  FaAmbulance,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

// Navigation is purely presentational — every `to` points at a route
// that already exists in App.jsx. No new routes are introduced here.
export const navByRole = {
  citizen: [
    { to: "/citizen/dashboard", label: "Overview", icon: FaChartPie },
    {
      to: "/citizen/report",
      label: "Report Emergency",
      icon: FaExclamationTriangle,
    },
    { to: "/citizen/my-incidents", label: "My Incidents", icon: FaClipboardList },
    { to: "/citizen/track", label: "Track Incident", icon: FaMapMarkedAlt },
  ],
  admin: [
    { to: "/admin/dashboard", label: "Command Center", icon: FaChartPie },
    { to: "/admin/incidents", label: "Incidents", icon: FaExclamationTriangle },
    { to: "/admin/units", label: "Units", icon: FaTruck },
    { to: "/admin/create-unit", label: "Create Unit", icon: FaPlusCircle },
  ],
  unit: [{ to: "/unit/dashboard", label: "Unit Console", icon: FaAmbulance }],
};

const linkClasses = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-150 ${
    isActive
      ? "bg-[color:var(--color-aurora-100)]/40 text-[color:var(--color-aurora-800)]"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  }`;

const Sidebar = () => {
  const { user } = useAuth();
  const items = navByRole[user?.role] || [];

  if (!items.length) return null;

  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white/60 lg:block">
      <nav className="sticky top-16 flex flex-col gap-1 p-4">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} end className={linkClasses}>
            <Icon className="text-base" aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export const MobileNav = () => {
  const { user } = useAuth();
  const items = navByRole[user?.role] || [];

  if (!items.length) return null;

  return (
    <div className="sticky top-16 z-[1050] flex gap-2 overflow-x-auto border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur-lg lg:hidden">
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end
          className={({ isActive }) =>
            `flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-[color:var(--color-aurora-600)] text-white"
                : "bg-slate-100 text-slate-600"
            }`
          }
        >
          <Icon className="text-sm" aria-hidden="true" />
          {label}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
