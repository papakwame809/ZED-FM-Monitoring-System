import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user") || "null");
  });

  const [token, setToken] = useState(() => localStorage.getItem("auth_token"));

  useEffect(() => {
    const syncAuth = () => {
      setUser(JSON.parse(localStorage.getItem("user") || "null"));
      setToken(localStorage.getItem("auth_token"));
    };

    window.addEventListener("storage", syncAuth);
    window.addEventListener("auth-change", syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("auth-change", syncAuth);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    window.dispatchEvent(new Event("auth-change"));
  };

  return (
    <AuthContext.Provider value={{ user, token, logout }}>
      {children}
    </AuthContext.Provider>
  );
}