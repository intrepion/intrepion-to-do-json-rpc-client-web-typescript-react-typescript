import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL ?? "http://localhost:3000";

export const api = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("@Auth:access_token");
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
