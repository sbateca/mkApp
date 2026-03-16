import {renderMenu, updateUseMenu} from "./Menu.test.page";

describe("Menu component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the menu with the elements passed by arguments successfully", async () => {
    updateUseMenu(true);
    const {mainMenu} = await renderMenu();

    expect(mainMenu).toBeInTheDocument();
  });

  it("should not render the menu when it is closed", async () => {
    updateUseMenu(false);
    const {mainMenu} = await renderMenu();

    expect(mainMenu).not.toBeInTheDocument();
  });
});
