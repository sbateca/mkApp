import {fireEvent} from "@testing-library/react";
import {useMenuStore} from "../../../features/menu";
import {renderHeader, setupMocks} from "./Header.test.page";

describe("Header", () => {
  beforeEach(() => {
    setupMocks();
    useMenuStore.getState().closeMenu();
  });
  it("should render the header", async () => {
    const {header, mainMenuButton} = await renderHeader();

    expect(header).toBeInTheDocument();
    expect(mainMenuButton).toBeInTheDocument();
  });

  it("keeps the main menu toggle accessible in both states", async () => {
    const {mainMenuButton, screen} = await renderHeader();

    expect(mainMenuButton).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("combobox", {name: "Language"})).toBeVisible();

    fireEvent.click(mainMenuButton);
    expect(mainMenuButton).toBeVisible();
    expect(mainMenuButton).toHaveAccessibleName("Collapse menu");
    expect(mainMenuButton).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(mainMenuButton);
    expect(mainMenuButton).toBeVisible();
    expect(mainMenuButton).toHaveAccessibleName("Expand menu");
    expect(mainMenuButton).toHaveAttribute("aria-expanded", "false");
  });
});
