import {renderHook, act} from "@testing-library/react";

import {useUserMenu} from "./useUserMenu";

const mockSignOut = jest.fn();
const mockHandleClose = jest.fn();

jest.mock("../../auth/signOut/model/useSignOut", () => ({
  useSignOut: () => ({
    handleSignOut: mockSignOut,
  }),
}));

jest.mock("./store", () => ({
  useUserMenuStore: () => ({
    handleClose: mockHandleClose,
  }),
}));

describe("useUserMenu", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call signOut and handleClose when handleLogout is executed", () => {
    const {result} = renderHook(() => useUserMenu());

    act(() => {
      result.current.handleLogout();
    });

    expect(mockSignOut).toHaveBeenCalled();
    expect(mockHandleClose).toHaveBeenCalled();
  });
});
