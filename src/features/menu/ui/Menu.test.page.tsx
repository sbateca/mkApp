import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";

import {Menu} from "./Menu";
import {SharedMenuItems} from "../../../utils/enums";
import {MenuProps} from "./MenuProps";
import {MenuStore} from "../model/types";

export const mockMenuItems: MenuProps = {
  menuItems: [
    {label: SharedMenuItems.REPORTS, actionPath: "/reports"},
    {label: SharedMenuItems.SAMPLES, actionPath: "/samples"},
  ],
};

jest.mock("../../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://example.com/api",
  },
}));

let mockedMenuOpen = false;

jest.mock("../../../features/menu/model/store", () => ({
  __esModule: true,
  useMenuStore: (selector: (state: MenuStore) => unknown) =>
    selector({
      menuOpen: mockedMenuOpen,
      toggleMenu: jest.fn(),
      openMenu: jest.fn(),
      closeMenu: jest.fn(),
    }),
}));

export const updateUseMenu = (menuOpen: boolean) => {
  mockedMenuOpen = menuOpen;
};

export const renderMenu = () => {
  render(
    <MemoryRouter initialEntries={["/samples"]}>
      <Menu {...mockMenuItems} />
    </MemoryRouter>,
  );

  return {
    reportsItem: screen.queryByText("Reports"),
    samplesItem: screen.queryByText("Samples"),
  };
};
