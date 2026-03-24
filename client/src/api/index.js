import Axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

export const STORAGE_URL = `${API_BASE_URL}/storage`;

export const axios = Axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    withCredentials: true,
  },
});

axios.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
