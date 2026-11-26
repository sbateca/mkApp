import {apiClient} from "../../../shared/api/apliClient";
import {getAuthTokens, setAuthTokens} from "../../../shared/api/authTokens";
import {sessionApi} from "./sessionApi";

jest.mock("../../../config/EnvManager", () => ({
  __esModule: true,
  default: {BACKEND_URL: "http://api.test"},
}));
jest.mock("../../../shared/api/apliClient", () => ({
  apiClient: {get: jest.fn(), post: jest.fn()},
}));

const tokens = {access_token: "access", refresh_token: "refresh"};
const user = {
  id: "user-id",
  name: "Name",
  username: "admin",
  roles: [{name: "ADMIN"}],
};

describe("sessionApi", () => {
  beforeEach(() => {
    sessionStorage.clear();
    jest.resetAllMocks();
  });

  it("stores tokens from login and loads the current user", async () => {
    (apiClient.post as jest.Mock).mockResolvedValueOnce({data: tokens});
    (apiClient.get as jest.Mock).mockResolvedValueOnce({data: user});
    const response = await sessionApi.login({
      username: "admin",
      password: "password",
    });
    expect(apiClient.post).toHaveBeenCalledWith("/auth/login", {
      username: "admin",
      password: "password",
    });
    expect(apiClient.get).toHaveBeenCalledWith("/auth/me");
    expect(response.user).toEqual({
      id: "user-id",
      name: "Name",
      username: "admin",
      role: "ADMIN",
    });
    expect(getAuthTokens()).toEqual(tokens);
  });

  it("does not request the current user without a saved session", async () => {
    await expect(sessionApi.getCurrentSession()).rejects.toThrow(
      "No saved session",
    );
    expect(apiClient.get).not.toHaveBeenCalled();
  });

  it("revokes and clears the refresh token on logout", async () => {
    setAuthTokens(tokens);
    (apiClient.post as jest.Mock).mockResolvedValueOnce({});
    await sessionApi.logout();
    expect(apiClient.post).toHaveBeenCalledWith("/auth/logout", {
      refresh_token: "refresh",
    });
    expect(getAuthTokens()).toBeNull();
  });
});
