import {render, screen} from "@testing-library/react";

import {MenuProvider} from "../../../context";
import {Content} from "./Content";
import {MenuStore} from "../../../features/menu/model/types";
import {SharedMenuItems} from "../../../utils/enums";

jest.mock("../../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://example.com/api",
  },
}));
jest.mock("../../organisms/SamplesContent/SamplesContent", () => ({
  SamplesContent: () => <div data-testid="samples-content" />,
}));
jest.mock("../../organisms/ReportsContent/ReportsContent", () => ({
  ReportsContent: () => <div data-testid="reports-content" />,
}));

let mockedSelectedMenuItem: SharedMenuItems;

jest.mock("../../../features/menu/model/store", () => ({
  __esModule: true,
  useMenuStore: (selector: (state: MenuStore) => MenuStore) =>
    selector({
      menuOpen: false,
      selectedMenuItem: mockedSelectedMenuItem,
      toggleMenu: jest.fn(),
      openMenu: jest.fn(),
      closeMenu: jest.fn(),
      setSelectedMenuItem: jest.fn(),
    }),
}));

export const updateUseMenu = (menuItem: SharedMenuItems) => {
  mockedSelectedMenuItem = menuItem;
};

export const renderContent = async () => {
  render(
    <MenuProvider>
      <Content />
    </MenuProvider>,
  );
  return {
    screen,
  };
};
