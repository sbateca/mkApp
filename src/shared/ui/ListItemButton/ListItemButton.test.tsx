import {setupMocks, renderListItemButton} from "./ListItemButton.test.page";
import {fireEvent} from "@testing-library/react";

describe("ListItemButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setupMocks();
  });

  it("renders correctly with the given label", async () => {
    const {itemButton} = await renderListItemButton();

    expect(itemButton).toBeInTheDocument();
  });

  it("adds a tooltip with the menu item label", async () => {
    const {tooltipTarget} = await renderListItemButton();

    expect(tooltipTarget).toBeInTheDocument();
  });

  it("renders an icon when it is provided", async () => {
    const {menuIcon} = await renderListItemButton(
      <span data-testid="menu-icon" />,
    );

    expect(menuIcon).toBeInTheDocument();
  });

  it("itemButton has the selected class when is clicked", async () => {
    const {itemButton} = await renderListItemButton();

    fireEvent.click(itemButton);

    expect(itemButton).toHaveClass("MuiListItemButton-root");
  });
});
