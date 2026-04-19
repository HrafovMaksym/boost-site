import axios, { type InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: "https://carryme.cc/api",
  // baseURL: "http://localhost:3000/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean };

type FailedRequest = {
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
  config: RetryConfig;
};

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

function processQueue(error: unknown) {
  failedQueue.forEach(({ resolve, reject, config }) => {
    if (error) {
      reject(error);
    } else {
      resolve(api(config));
    }
  });
  failedQueue = [];
}

type AuthFailedCallback = () => void;
const authFailedListeners = new Set<AuthFailedCallback>();

export function onAuthRefreshFailed(cb: AuthFailedCallback): () => void {
  authFailedListeners.add(cb);
  return () => {
    authFailedListeners.delete(cb);
  };
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as RetryConfig;

    const isAuthPath =
      originalRequest.url?.includes("auth/login") ||
      originalRequest.url?.includes("auth/register") ||
      originalRequest.url?.includes("auth/refresh") ||
      originalRequest.url?.includes("auth/validate-token") ||
      originalRequest.url?.includes("auth/verify-register") ||
      originalRequest.url?.includes("auth/forgot-password") ||
      originalRequest.url?.includes("auth/reset-password");

    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      isAuthPath
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject, config: originalRequest });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      await api.post("/auth/refresh");
      processQueue(null);
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);
      authFailedListeners.forEach((cb) => cb());
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
