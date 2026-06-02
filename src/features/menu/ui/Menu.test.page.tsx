import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";

import {Menu} from "./Menu";
import {SharedMenuItemIcons, SharedMenuItems} from "../../../utils/enums";
import {MenuProps} from "./MenuProps";
import {MenuStore} from "../model/types";

export const mockMenuItems: MenuProps = {
  menuItems: [
    {
      label: SharedMenuItems.REPORTS,
      actionPath: "/reports",
      icon: SharedMenuItemIcons.REPORTS,
    },
    {
      label: SharedMenuItems.SAMPLES,
      actionPath: "/samples",
      icon: SharedMenuItemIcons.SAMPLES,
    },
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

  const reportsButton = screen
    .getByText("Reports")
    .closest(".MuiListItemButton-root") as HTMLElement;
  const samplesButton = screen
    .getByText("Samples")
    .closest(".MuiListItemButton-root") as HTMLElement;

  return {
    reportsItem: screen.queryByText("Reports"),
    samplesItem: screen.queryByText("Samples"),
    reportsIcon: screen.queryByTestId("AssessmentIcon"),
    samplesIcon: screen.queryByTestId("Inventory2Icon"),
    reportsButton,
    samplesButton,
  };
};
