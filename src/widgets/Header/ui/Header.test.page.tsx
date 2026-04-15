import {render, screen} from "@testing-library/react";
import {Menu, MenuProps} from "../../../features/menu";
import {SharedMenuItems} from "../../../utils/enums";
import {Header} from "./Header";
import {MenuStore} from "../../../features/menu/model/types";
import {MemoryRouter} from "react-router-dom";

export const mockData = {
  companyName: "Test Company",
  userMenu: true,
  userData: {
    id: 1,
    name: "Test User",
    userName: "testuser",
  },
};

export const mockMenuItems: MenuProps = {
  menuItems: [
    {label: SharedMenuItems.REPORTS, actionPath: "/reports"},
    {label: SharedMenuItems.SAMPLES, actionPath: "/samples"},
  ],
};

const mockMenuStoreStatus: MenuStore = {
  menuOpen: false,
  toggleMenu: () => jest.fn(),
  openMenu: () => jest.fn(),
  closeMenu: () => jest.fn(),
};

export const setupMocks = () => {
  jest.mock("../../../features/UserMenu/ui", () => ({
    UserMenu: () => <div data-testid="userMenu" />,
  }));
  jest.mock("../../../entities/user", () => ({
    localStorageToUser: jest.fn(),
  }));
  jest.mock("../../../features/usermenu/model/store", () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useMenuStore: (selector: any) => selector(mockMenuStoreStatus),
  }));
};
jest.mock("../../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://example.com/api",
  },
}));

export const renderHeader = async () => {
  render(
    <>
      <Header companyName={mockData.companyName} />
      <MemoryRouter initialEntries={["/samples"]}>
        <Menu {...mockMenuItems} />
      </MemoryRouter>
      ,
    </>,
  );
  return {
    header: screen.getByTestId("header"),
    mainMenuButton: screen.getByTestId("toggleMainMenu"),
    screen,
  };
};
