import {renderHook, act} from "@testing-library/react";

import {useSignOut} from "./useSignOut";
import {BaseRoutes} from "../../../../utils/constants/baseRoutes";

const mockNavigate = jest.fn();
const mockClearSession = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../../../../entities/session/model/store", () => ({
  useSessionStore: jest.fn(),
}));

import {useSessionStore} from "../../../../entities/session/model/store";

describe("useSignOut", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useSessionStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        clearSession: mockClearSession,
      }),
    );
  });

  it("should clear session and navigate to login", () => {
    const {result} = renderHook(() => useSignOut());

    act(() => {
      result.current.signOut();
    });

    expect(mockClearSession).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith(BaseRoutes.LOGIN, {
      replace: true,
    });
  });
});
