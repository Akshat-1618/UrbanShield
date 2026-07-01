import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import Logo from "../common/Logo";

const roleMeta = {
  admin: { label: "Admin", classes: "bg-red-50 text-red-700 ring-red-600/10" },
  citizen: {
    label: "Citizen",
    classes: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
  },
  unit: { label: "Unit", classes: "bg-[color:var(--color-aurora-100)]/40 text-[color:var(--color-aurora-800)] ring-[color:var(--color-aurora-500)]/15" },
};

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "U";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const displayName = user?.name || user?.unitName || "";
  const meta = roleMeta[user?.role] || roleMeta.citizen;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-[1100] border-b border-slate-200/80 bg-white/90 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-10">
        <Logo compact />
        {user && (
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold leading-tight text-slate-800">
                {displayName}
              </p>
              <span
                className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ring-1 ring-inset ${meta.classes}`}
              >
                {meta.label}
              </span>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--color-aurora-300)] to-[color:var(--color-aurora-600)] text-sm font-bold text-white shadow-sm">
              {getInitials(displayName)}
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-slate-800 hover:shadow-md"
            >
              <FaSignOutAlt className="text-xs" aria-hidden="true" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
