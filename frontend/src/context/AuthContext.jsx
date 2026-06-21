import { createContext, useState, useCallback } from "react";
import { api } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback(async ({ email, password }) => {
    const res = await api.post("/auth/login", { email, password });
    if (res.data) {
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    }
    return res.data;
  }, []);

  const register = useCallback(async (data) => {
    const res = await api.post("/auth/register", data);
    if (res.data) {
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    }
    return res.data;
  }, []);

  const adminLogin = useCallback(async ({ email, password }) => {
    const res = await api.post("/auth/login-admin", { email, password });
    if (res.data) {
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    }
    return res.data;
  }, []);

  const registerAdmin = useCallback(async (data) => {
    const res = await api.post("/auth/register-admin", data);
    if (res.data) {
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    }
    return res.data;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, adminLogin, registerAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
