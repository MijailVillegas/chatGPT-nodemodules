import axios from "axios";
const gptInstance = axios.create({
  baseURL:  process.env.API_URL,
  timeout: 1200000,
  headers: {
    "Content-Type": "application/json",
  },
});

gptInstance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${process.env.API_KEY}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default gptInstance;
