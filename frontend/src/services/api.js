import axios from "axios";
import config from "../config";

export const api = axios.create({
  baseURL: config.API_BASE,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem("user");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.token) {
        config.headers.Authorization = `Bearer ${parsed.token}`;
      }
    }
  } catch {
    /* ignore */
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config?.url?.includes("/auth/")) {
      localStorage.removeItem("user");
      window.dispatchEvent(new CustomEvent("auth:logout"));
    }
    return Promise.reject(error);
  }
);

export const getImageUrl = (product) => {
  let path = product?.image || product?.images?.[0];
  if (!path) return config.FALLBACK_IMAGE;
  if (!path.startsWith("uploads")) path = `uploads/${path}`;
  return `${config.API_URL}/${path}`;
};

export default config;
