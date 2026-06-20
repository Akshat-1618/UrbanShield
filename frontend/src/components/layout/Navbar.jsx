import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import Logo from "../common/Logo";

const Navbar = () => {

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {

    logout();

    navigate("/login");

  };

  return (

    <nav className="flex items-center justify-between border-b bg-white px-8 py-4 shadow-sm">

      <Logo />

      <div className="flex items-center gap-6">

        {

          user && (

            <span className="text-gray-700 font-medium">

              Welcome, {user?.name || user?.unitName}

            </span>

          )

        }

        <button

          onClick={handleLogout}

          className="rounded-lg bg-red-500 px-5 py-2 font-medium text-white transition hover:bg-red-600"

        >

          Logout

        </button>

      </div>

    </nav>

  );

};

export default Navbar;