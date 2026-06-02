import {fireEvent} from "@testing-library/react";
import {renderMenu, updateUseMenu} from "./Menu.test.page";

describe("Menu component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the menu with the elements passed by arguments successfully", () => {
    updateUseMenu(true);
    const {reportsItem, samplesItem} = renderMenu();

    expect(reportsItem).toBeVisible();
    expect(samplesItem).toBeVisible();
  });

  it("should not show the menu items when it is closed", () => {
    updateUseMenu(false);
    const {reportsItem, samplesItem} = renderMenu();

    expect(reportsItem).not.toBeVisible();
    expect(samplesItem).not.toBeVisible();
  });

  it("should keep selected state for the current route", () => {
    updateUseMenu(true);
    const {samplesButton} = renderMenu();

    expect(samplesButton).toHaveClass("Mui-selected");
  });

  it("should update selected state when a menu item is clicked", () => {
    updateUseMenu(true);
    const {reportsButton} = renderMenu();

    fireEvent.click(reportsButton);

    expect(reportsButton).toHaveClass("Mui-selected");
  });
});
