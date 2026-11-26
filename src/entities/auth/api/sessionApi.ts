import {apiClient} from "../../../shared/api/apliClient";
import {Routes} from "../../../utils/constants/baseRoutes";
import {SessionUser} from "../../user";
import {
  AuthTokens,
  clearAuthTokens,
  getAuthTokens,
  setAuthTokens,
} from "../../../shared/api/authTokens";

export type LoginRequest = {
  username: string;
  password: string;
};

export type SessionResponse = {
  user: SessionUser;
};

type ApiUser = {
  id: string;
  username: string;
  name: string;
  roles: {name: string}[];
};

const getCurrentSession = async (): Promise<SessionResponse> => {
  if (!getAuthTokens()) throw new Error("No saved session");
  const {data} = await apiClient.get<ApiUser>(Routes.ME);
  return {
    user: {
      id: data.id,
      username: data.username,
      name: data.name,
      role: data.roles[0]?.name ?? "",
    },
  };
};

export const sessionApi = {
  login: async (loginRequest: LoginRequest): Promise<SessionResponse> => {
    const {username, password} = loginRequest;

    clearAuthTokens();
    const response = await apiClient.post<AuthTokens>(Routes.LOGIN, {
      username,
      password,
    });

    try {
      setAuthTokens(response.data);
      return await getCurrentSession();
    } catch (error) {
      clearAuthTokens();
      throw error;
    }
  },

  getCurrentSession,

  logout: async (): Promise<void> => {
    const tokens = getAuthTokens();
    try {
      if (tokens)
        await apiClient.post(Routes.LOGOUT, {
          refresh_token: tokens.refresh_token,
        });
    } finally {
      clearAuthTokens();
    }
  },
};
