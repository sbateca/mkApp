import {render, screen} from "@testing-library/react";
import {ListItemButton} from "./ListItemButton";
import {SharedMenuItems} from "../../../utils/enums";

export const mockData = {
  label: SharedMenuItems.SAMPLES,
  selectedMenuItem: SharedMenuItems.SAMPLES,
  setSelectedMenuItem: jest.fn(),
  toggleMenu: jest.fn(),
};

jest.mock("../../../Config/envManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

export const setupMocks = () => {
  jest.mock("../../../utils/hooks", () => ({
    useMenu: {
      selectedMenuItem: mockData.selectedMenuItem,
      setSelectedMenuItem: mockData.setSelectedMenuItem,
      toggleMenu: mockData.toggleMenu,
    },
  }));
};

export const renderListItemButton = async () => {
  render(<ListItemButton label={mockData.label} />);
  return {
    itemButton: screen.getByRole("button"),
  };
};
