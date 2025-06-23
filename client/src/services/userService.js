// client/src/services/userService.js

import axios from "axios";

// Use the environment variable for the base URL
const API_URL = `${import.meta.env.VITE_API_URL}/api/users`;

const getToken = () => {
  try {
    const user = JSON.parse(localStorage.getItem("flowbitUser"));
    return user ? `Bearer ${user.token}` : "";
  } catch (error) {
    return "";
  }
};

// Create an axios instance with default headers
const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = getToken();
  return config;
});

const updateProfile = (userData) => {
  return api.put("/profile", userData);
};

const changePassword = (passwordData) => {
  return api.put("/password", passwordData);
};

const userService = {
  updateProfile,
  changePassword,
};

export default userService;
