import {fireEvent} from "@testing-library/react";
import {renderHeader, setupMocks} from "./Header.test.page";

describe("Header", () => {
  beforeEach(() => {
    setupMocks();
  });
  it("should render the header", async () => {
    const {header, mainMenuButton} = await renderHeader();

    expect(header).toBeInTheDocument();
    expect(mainMenuButton).toBeInTheDocument();
  });

  it("should appear the main menu when click in menu button", async () => {
    const {mainMenuButton, screen} = await renderHeader();

    fireEvent.click(mainMenuButton);
    const mainMenuComponent = screen.getByTestId("mainMenu");

    expect(mainMenuComponent).toBeInTheDocument();
  });
});
