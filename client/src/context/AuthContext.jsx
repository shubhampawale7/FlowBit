// client/src/context/AuthContext.jsx

import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userString = localStorage.getItem("flowbitUser");
    if (userString) {
      const userData = JSON.parse(userString);
      setUser(userData);
    }
    setLoading(false);
  }, []);

  // Use the environment variable for the base URL
  const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/auth`,
  });

  const register = async (name, email, password) => {
    const response = await api.post("/register", { name, email, password });
    localStorage.setItem("flowbitUser", JSON.stringify(response.data));
    setUser(response.data);
    return response.data;
  };

  const login = async (email, password) => {
    const response = await api.post("/login", { email, password });
    localStorage.setItem("flowbitUser", JSON.stringify(response.data));
    setUser(response.data);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem("flowbitUser");
    setUser(null);
  };

  const value = {
    user,
    setUser, // Make sure setUser is exported if you use it in ProfilePage
    loading,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
