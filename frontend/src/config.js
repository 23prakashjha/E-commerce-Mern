const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500'%3E%3Crect fill='%23f3f4f6' width='400' height='500'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='16' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E";

const DEV = import.meta.env.DEV;

const config = {
  API_URL: DEV ? "http://localhost:8080" : "https://e-commerce-mern-1-0har.onrender.com",
  API_BASE: DEV ? "http://localhost:8080/api" : "https://e-commerce-mern-1-0har.onrender.com/api",
  FALLBACK_IMAGE,
};

export default config;
