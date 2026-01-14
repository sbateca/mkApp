import {render, screen} from "@testing-library/react";
import {Header} from "./Header";
import {Menu} from "../Menu/Menu";
import {MenuProps} from "../Menu/Types";
import {SharedMenuItems} from "../../../utils/enums";

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
    {
      label: SharedMenuItems.REPORTS,
    },
    {
      label: SharedMenuItems.SAMPLES,
    },
  ],
};

export const setupMocks = () => {
  jest.mock("../UserMenu/UserMenu", () => ({
    UserMenu: () => <div data-testid="userMenu" />,
  }));
  jest.mock("../../../adapters/user", () => ({
    localStorageToUser: jest.fn(),
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
      <Menu {...mockMenuItems} />
    </>,
  );
  return {
    header: screen.getByTestId("header"),
    mainMenuButton: screen.getByTestId("toggleMainMenu"),
    screen,
  };
};
