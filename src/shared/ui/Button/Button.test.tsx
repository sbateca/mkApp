import "@testing-library/jest-dom";
import {mockButtonConfig, renderListItemButton} from "./Button.test.page";
import {fireEvent} from "@testing-library/react";

describe("Button Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render with the label passed in props", async () => {
    const {button} = await renderListItemButton();

    expect(button).toBeInTheDocument();
  });

  it("should handle click event successfuly", async () => {
    const {button} = await renderListItemButton();

    fireEvent.click(button);

    expect(mockButtonConfig.onClick).toHaveBeenCalledTimes(1);
  });

  it("should apply the correct styles passed in its parameters", async () => {
    const {button} = await renderListItemButton();

    expect(button).toHaveStyle("font-size: 20px");
  });

  it("should render with the correct variant", async () => {
    const expectedClass = "MuiButton-contained";
    const {button} = await renderListItemButton();

    expect(button).toHaveClass(expectedClass);
  });

  it("should render with the correct size", async () => {
    const expectedClass = "MuiButton-sizeSmall";
    const {button} = await renderListItemButton();

    expect(button).toHaveClass(expectedClass);
  });

  it("should render with the correct color", async () => {
    const expectedClass = "MuiButton-containedPrimary";
    const {button} = await renderListItemButton();

    expect(button).toHaveClass(expectedClass);
  });
});
