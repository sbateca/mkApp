import axios from "axios";
import {SignInRequest, SignInResponse, ErrorResponse} from "./types";
import {apiClient} from "../../../../shared/api/apliClient";

export const signInRequest = async (
  request: SignInRequest,
): Promise<SignInResponse> => {
  try {
    const response = await apiClient.post<SignInResponse>(
      "/auth/login",
      request,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ErrorResponse>(error)) {
      if (error.response?.status === 401) {
        throw new Error(error.response.data?.message || "Invalid credentials");
      }

      if (!error.response) {
        throw new Error("Connection error");
      }

      throw new Error("Unexpected server error");
    }

    throw new Error("An unknown error occurred while trying to login.");
  }
};
