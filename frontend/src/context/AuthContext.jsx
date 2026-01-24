import { createContext, useState } from "react";
import { api } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Load user from localStorage if exists
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (err) {
      console.error("Failed to parse user from localStorage", err);
      return null;
    }
  });

  // Login function
  const login = async ({ email, password }) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.data) {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      return res.data;
    } catch (err) {
      console.error("Login failed:", err.response || err);
      throw err;
    }
  };

  // Register function
  const register = async (data) => {
    try {
      await api.post("/auth/register", data);
    } catch (err) {
      console.error("Registration failed:", err.response || err);
      throw err;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

