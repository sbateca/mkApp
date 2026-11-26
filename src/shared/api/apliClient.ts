import axios from "axios";
import EnvManager from "../../config/EnvManager";
import {ApiErrorResponse, AppApiError} from "./errors";
import {
  UNEXPECTED_APPLICATION_ERROR,
  UNEXPECTED_SERVER_ERROR,
} from "../../utils/constants";
import {HttpStatus} from "../../utils/enums";
import {
  AuthTokens,
  clearAuthTokens,
  getAuthTokens,
  setAuthTokens,
} from "./authTokens";

let refreshPromise: Promise<AuthTokens> | null = null;

let onUnauthorized: (() => void) | null = null;

export const setUnauthorizedHandler = (handler: (() => void) | null) => {
  onUnauthorized = handler;
};

export const apiClient = axios.create({
  baseURL: EnvManager.BACKEND_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getAuthTokens()?.access_token;
  if (token && !config.headers.has("Authorization")) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

const refreshTokens = (): Promise<AuthTokens> => {
  if (refreshPromise) return refreshPromise;
  const tokens = getAuthTokens();
  if (!tokens) return Promise.reject(new Error("No refresh token"));
  refreshPromise = axios
    .post<AuthTokens>(`${EnvManager.BACKEND_URL}/auth/refresh`, {
      refresh_token: tokens.refresh_token,
    })
    .then(({data}) => {
      setAuthTokens(data);
      return data;
    })
    .finally(() => {
      refreshPromise = null;
    });
  return refreshPromise;
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
      const status = error.response?.status;
      if (status === HttpStatus.UNAUTHORIZED) {
        const request = error.config as typeof error.config & {
          authRetried?: boolean;
        };
        const url = request?.url ?? "";
        const isAuthAction = /\/auth\/(login|refresh|logout)(?:\?|$)/.test(url);
        if (
          request &&
          !request.authRetried &&
          !isAuthAction &&
          getAuthTokens()
        ) {
          request.authRetried = true;
          let tokens: AuthTokens;
          try {
            const currentTokens = getAuthTokens();
            tokens =
              currentTokens &&
              request.headers.get("Authorization") !==
                `Bearer ${currentTokens.access_token}`
                ? currentTokens
                : await refreshTokens();
          } catch {
            clearAuthTokens();
            onUnauthorized?.();
            throw new AppApiError(error.message, status);
          }
          request.headers.set("Authorization", `Bearer ${tokens.access_token}`);
          return apiClient(request);
        } else if (!isAuthAction) {
          clearAuthTokens();
          onUnauthorized?.();
        }
      }

      const apiError = error.response?.data;
      const message =
        apiError?.message ?? error.message ?? UNEXPECTED_SERVER_ERROR;

      throw new AppApiError(message, status, apiError?.code);
    }
    throw new AppApiError(UNEXPECTED_APPLICATION_ERROR);
  },
);
