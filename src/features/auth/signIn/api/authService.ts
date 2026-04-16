import axios from "axios";
import {SignInRequest, SignInResponse} from "./signInRequest";
import EnvManager from "../../../../config/EnvManager";

export const signInRequest = async (
  signInRequest: SignInRequest,
): Promise<SignInResponse> => {
  try {
    const response = await axios.post<SignInResponse>(
      `${EnvManager.BACKEND_URL}/auth/login`,
      signInRequest,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error while login.");
    }

    throw new Error("An unknown error occurred when try to login.");
  }
};
