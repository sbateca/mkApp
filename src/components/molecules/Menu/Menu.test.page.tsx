import {render, screen} from "@testing-library/react";

import {Menu} from "../Menu/Menu";
import {SharedMenuItems} from "../../../utils/enums";
import {MenuProps} from "../Menu/Types";
import {MenuStore} from "../../../features/menu/model/types";

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
jest.mock("../../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://example.com/api",
  },
}));
let mockedMenuOpen: boolean = false;
jest.mock("../../../features/menu/model/store", () => ({
  __esModule: true,
  useMenuStore: (selector: (state: MenuStore) => MenuStore) =>
    selector({
      menuOpen: mockedMenuOpen,
      selectedMenuItem: SharedMenuItems.REPORTS,
      toggleMenu: jest.fn(),
      openMenu: jest.fn(),
      closeMenu: jest.fn(),
      setSelectedMenuItem: jest.fn(),
    }),
}));

export const updateUseMenu = (menuOpen: boolean) => {
  mockedMenuOpen = menuOpen;
};

export const renderMenu = async () => {
  render(<Menu {...mockMenuItems} />);
  return {
    mainMenu: await screen.queryByText("Reports"),
    screen,
  };
};
