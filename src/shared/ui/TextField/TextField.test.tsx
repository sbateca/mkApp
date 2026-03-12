import {fireEvent} from "@testing-library/react";
import {renderTextField} from "./TextField.test.page";

describe("TextField", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with the given label", async () => {
    const {textField} = await renderTextField();

    expect(textField).toBeInTheDocument();
  });

  it("textField has the selected class when is clicked", async () => {
    const {textField} = await renderTextField();

    fireEvent.click(textField);

    expect(textField).toHaveClass("Mui-focused");
  });
});
