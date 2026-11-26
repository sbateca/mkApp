import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import {apiClient, setUnauthorizedHandler} from "./apliClient";
import {getAuthTokens, setAuthTokens} from "./authTokens";

jest.mock("../../config/EnvManager", () => ({
  __esModule: true,
  default: {BACKEND_URL: "http://api.test"},
}));

describe("apiClient authentication", () => {
  const originalAdapter = apiClient.defaults.adapter;
  beforeEach(() => {
    sessionStorage.clear();
    jest.restoreAllMocks();
  });
  afterEach(() => {
    apiClient.defaults.adapter = originalAdapter;
    setUnauthorizedHandler(null);
  });

  it("attaches the access token to requests", async () => {
    setAuthTokens({access_token: "access", refresh_token: "refresh"});
    const adapter = jest.fn(async (config: InternalAxiosRequestConfig) => ({
      data: {},
      status: 200,
      statusText: "OK",
      headers: {},
      config,
    }));
    apiClient.defaults.adapter = adapter;
    await apiClient.get("/clients");
    expect(adapter.mock.calls[0][0].headers.get("Authorization")).toBe(
      "Bearer access",
    );
  });

  it("refreshes an expired token and retries the request", async () => {
    setAuthTokens({access_token: "old", refresh_token: "refresh"});
    const adapter = jest.fn(
      async (config: InternalAxiosRequestConfig): Promise<AxiosResponse> => {
        if (config.headers.get("Authorization") === "Bearer old") {
          throw new AxiosError(
            "Unauthorized",
            "ERR_BAD_REQUEST",
            config,
            undefined,
            {
              data: {},
              status: 401,
              statusText: "Unauthorized",
              headers: {},
              config,
            },
          );
        }
        return {data: "ok", status: 200, statusText: "OK", headers: {}, config};
      },
    );
    apiClient.defaults.adapter = adapter;
    const refresh = jest.spyOn(axios, "post").mockResolvedValueOnce({
      data: {access_token: "new", refresh_token: "rotated"},
    });
    const response = await apiClient.get("/clients");
    expect(refresh).toHaveBeenCalledWith("http://api.test/auth/refresh", {
      refresh_token: "refresh",
    });
    expect(adapter).toHaveBeenCalledTimes(2);
    expect(response.data).toBe("ok");
    expect(getAuthTokens()?.refresh_token).toBe("rotated");
  });
});
