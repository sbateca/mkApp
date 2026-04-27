import {renderHook, act} from "@testing-library/react";

import {useSignOut} from "./useSignOut";
import {BaseRoutes} from "../../../../utils/constants/baseRoutes";
import {useSessionStore} from "../../../../entities/auth/model/store";

const mockNavigate = jest.fn();
const mockLogout = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../../../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

jest.mock("../../../../entities/auth/model/store", () => ({
  useSessionStore: jest.fn(),
}));

describe("useSignOut", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockLogout.mockResolvedValue(undefined);

    (useSessionStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        logout: mockLogout,
      }),
    );
  });

  it("should logout and navigate to login", async () => {
    const {result} = renderHook(() => useSignOut());

    await act(async () => {
      await result.current.handleSignOut();
    });

    expect(mockLogout).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(BaseRoutes.LOGIN, {
      replace: true,
    });
  });
});
