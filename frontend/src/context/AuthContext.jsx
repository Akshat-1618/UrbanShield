import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import socket from "../services/socket";
const AuthContext = createContext();

export const AuthProvider = ({
  children,
}) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");
    if (storedUser) {
      setUser(
        JSON.parse(storedUser)
      );
      socket.connect();
    }
    setLoading(false);
  }, []);

  const login = (
    token,
    userData
  ) => {

    localStorage.setItem(
      "token",
      token
    );
    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );
    socket.connect();
    setUser(userData);
  };

  const logout = () => {
    socket.disconnect();
    localStorage.removeItem(
      "token"
    );
    localStorage.removeItem(
      "user"
    );
    setUser(null);
  };

  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);