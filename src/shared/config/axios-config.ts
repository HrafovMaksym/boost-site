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

let refreshInFlight: Promise<void> | null = null;
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

export function resetAuthState() {
  // Drop any in-flight refresh promise / queued retries when the user
  // changes (logout, switch account). Prevents replaying requests from a
  // previous session against a new identity in the same tab.
  refreshInFlight = null;
  failedQueue.forEach(({ reject }) => {
    reject(new Error("Auth state reset"));
  });
  failedQueue = [];
}

export function refreshAuthToken(): Promise<void> {
  if (refreshInFlight) return refreshInFlight;

  refreshInFlight = api
    .post("/auth/refresh")
    .then(() => {
      processQueue(null);
    })
    .catch((err) => {
      processQueue(err);
      authFailedListeners.forEach((cb) => cb());
      throw err;
    })
    .finally(() => {
      refreshInFlight = null;
    });

  return refreshInFlight;
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

    if (refreshInFlight) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject, config: originalRequest });
      });
    }

    originalRequest._retry = true;

    try {
      await refreshAuthToken();
      return api(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  },
);
