import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../common/Logo";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const displayName =
    user?.name || user?.unitName;

  const role =
    user?.role === "admin"
      ? "ADMIN"
      : user?.role === "citizen"
      ? "CITIZEN"
      : "UNIT";

  const roleColor =
    user?.role === "admin"
      ? "bg-red-100 text-red-700"
      : user?.role === "citizen"
      ? "bg-green-100 text-green-700"
      : "bg-blue-100 text-blue-700";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur shadow-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Logo />
        {user && (
          <div className="flex items-center gap-5">
            <div className="text-right">
              <p className="font-semibold text-slate-800">
                {displayName}
              </p>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${roleColor}`}
              >
                {role}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-500 px-4 py-2 font-medium text-white transition-all duration-200 hover:bg-red-600 hover:shadow-md"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;