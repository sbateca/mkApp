import {render, screen} from "@testing-library/react";
import {Menu, MenuProps} from "../../../components/molecules/Menu";
import {SharedMenuItems} from "../../../utils/enums";
import {Header} from "./Header";

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
  jest.mock("../../../components/molecules/UserMenu/UserMenu", () => ({
    UserMenu: () => <div data-testid="userMenu" />,
  }));
  jest.mock("../../../entities/user", () => ({
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
