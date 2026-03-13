import {render, fireEvent, screen} from "@testing-library/react";

import {UserMenu} from "./UserMenu";
import {LOCAL_STORAGE_USER_KEY} from "../../../utils/constants";
import {UserMenuStore} from "../model/types";

let mockUserMenuStoreStatus: UserMenuStore = {
  username: "",
  anchorEl: null,
  handleMenu: jest.fn(),
  handleClose: jest.fn(),
  handleLogout: jest.fn(),
};

const mockReload = jest.fn();
Object.defineProperty(window, "location", {
  value: {reload: mockReload},
});

jest.mock("../../../features/usermenu/model/store", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useUserMenuStore: (selector: any) => selector(mockUserMenuStoreStatus),
}));

describe("UserMenu component", () => {
  beforeEach(() => {
    Storage.prototype.removeItem = jest.fn();
    jest.spyOn(window.location, "reload").mockImplementation(() => {});

    mockUserMenuStoreStatus = {
      username: "",
      anchorEl: null,
      handleMenu: jest.fn(),
      handleClose: jest.fn(),
      handleLogout: () => {
        (localStorage.removeItem(LOCAL_STORAGE_USER_KEY),
          window.location.reload());
      },
    };

    render(<UserMenu username="testuser" />);
  });

  it("renders username correctly", () => {
    expect(screen.getByText("testuser")).toBeInTheDocument();
  });

  it("opens the user menu when IconButton is clicked", () => {
    fireEvent.click(screen.getByLabelText("account of current user"));

    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("calls cookies.remove and reloads the window when Logout is clicked", () => {
    fireEvent.click(screen.getByLabelText("account of current user"));
    fireEvent.click(screen.getByText("Logout"));

    expect(localStorage.removeItem).toHaveBeenCalledWith(
      LOCAL_STORAGE_USER_KEY,
    );
    expect(mockReload).toHaveBeenCalled();
  });
});
