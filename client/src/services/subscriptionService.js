// client/src/services/subscriptionService.js

import axios from "axios";

// Use the environment variable for the base URL
const API_URL = `${import.meta.env.VITE_API_URL}/api/subscriptions`;

const getToken = () => {
  try {
    const user = JSON.parse(localStorage.getItem("flowbitUser"));
    return user ? `Bearer ${user.token}` : "";
  } catch (error) {
    return "";
  }
};

const getSubscriptions = () => {
  return axios.get(API_URL, {
    headers: { Authorization: getToken() },
  });
};

const addSubscription = (subscriptionData) => {
  return axios.post(API_URL, subscriptionData, {
    headers: { Authorization: getToken() },
  });
};

const updateSubscription = (id, subscriptionData) => {
  return axios.put(`${API_URL}/${id}`, subscriptionData, {
    headers: { Authorization: getToken() },
  });
};

const deleteSubscription = (id) => {
  return axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: getToken() },
  });
};

const getStats = () => {
  return axios.get(`${API_URL}/stats`, {
    headers: { Authorization: getToken() },
  });
};

const subscriptionService = {
  getSubscriptions,
  addSubscription,
  updateSubscription,
  deleteSubscription,
  getStats,
};

export default subscriptionService;
