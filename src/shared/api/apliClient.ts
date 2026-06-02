import axios from "axios";
import EnvManager from "../../config/EnvManager";
import {ApiErrorResponse, AppApiError} from "./errors";
import {
  UNEXPECTED_APPLICATION_ERROR,
  UNEXPECTED_SERVER_ERROR,
} from "../../utils/constants";
import {HttpStatus} from "../../utils/enums";

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

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
      const status = error.response?.status;
      if (status === HttpStatus.UNAUTHORIZED) {
        onUnauthorized?.();
      }

      const apiError = error.response?.data;
      const message =
        apiError?.message ?? error.message ?? UNEXPECTED_SERVER_ERROR;

      throw new AppApiError(message, status, apiError?.code);
    }
    throw new AppApiError(UNEXPECTED_APPLICATION_ERROR);
  },
);
