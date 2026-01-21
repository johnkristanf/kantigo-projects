import axios, { AxiosError } from "axios";
import type { ApiError } from "~/types/api-error";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_V1_BASE_URL,
  timeout: 15000,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    let normalizedError: ApiError = {
      message: "Something went wrong",
    };

    if (error.response) {
      const { status, data } = error.response;

      normalizedError = {
        message:
          data?.message ||
          data?.detail || // FastAPI
          "Request failed",
        statusCode: status,
        errors:
          data?.errors || // Laravel
          data?.detail?.errors, // FastAPI validation
      };

      // Global auth handling
      if (status === 401) {
        // logout or refresh token
        console.warn("Unauthorized");
      }
    } else if (error.request) {
      normalizedError = {
        message: "Network error. Please check your connection.",
      };
    }

    return Promise.reject(normalizedError);
  }
);

export default api;
