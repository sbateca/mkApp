import {render, fireEvent, screen} from "@testing-library/react";

import {UserMenu} from "./UserMenu";
import {UserMenuStore} from "../model/types";

const mockHandleLogout = jest.fn();

let mockUserMenuStoreStatus: UserMenuStore = {
  username: "",
  anchorEl: null,
  handleMenu: jest.fn(),
  handleClose: jest.fn(),
};

jest.mock("../model/store", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useUserMenuStore: (selector: any) => selector(mockUserMenuStoreStatus),
}));

jest.mock("../model/useUserMenu", () => ({
  useUserMenu: () => ({
    handleLogout: mockHandleLogout,
  }),
}));

describe("UserMenu component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUserMenuStoreStatus = {
      username: "",
      anchorEl: null,
      handleMenu: jest.fn(),
      handleClose: jest.fn(),
    };
  });

  it("renders username correctly", () => {
    render(<UserMenu username="testuser" />);

    expect(screen.getByText("testuser")).toBeInTheDocument();
  });

  it("calls handleMenu when account button is clicked", () => {
    render(<UserMenu username="testuser" />);

    fireEvent.click(screen.getByLabelText(/account of current user/i));

    expect(mockUserMenuStoreStatus.handleMenu).toHaveBeenCalled();
  });

  it("calls handleLogout when logout is clicked", () => {
    mockUserMenuStoreStatus.anchorEl = document.createElement("div");

    render(<UserMenu username="testuser" />);

    fireEvent.click(screen.getByText(/logout/i));

    expect(mockHandleLogout).toHaveBeenCalled();
  });
});
