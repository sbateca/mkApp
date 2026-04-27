import {apiClient} from "../../../shared/api/apliClient";
import {Routes} from "../../../utils/constants/baseRoutes";
import {SessionUser} from "../../user";

export type LoginRequest = {
  username: string;
  password: string;
};

export type SessionResponse = {
  user: SessionUser;
};

export const sessionApi = {
  login: async (loginRequest: LoginRequest): Promise<SessionResponse> => {
    const {username, password} = loginRequest;

    const response = await apiClient.post(Routes.LOGIN, {
      username,
      password,
    });

    return response.data;
  },

  getCurrentSession: async (): Promise<SessionResponse> => {
    const response = await apiClient.get(Routes.ME);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post(Routes.LOGOUT);
  },
};
