import axios from "axios";

// Create axios instance
//
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL_PROD}`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Request interceptor 
api.interceptors.request.use(
  (config) => {
    console.log("config request ", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log("response ", response);
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

export default api;