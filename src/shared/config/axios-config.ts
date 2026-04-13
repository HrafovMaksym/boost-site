import axios, { type InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
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

    if (error.response?.status !== 401 || originalRequest._retry) {
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
