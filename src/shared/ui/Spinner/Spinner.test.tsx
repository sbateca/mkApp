import {render} from "@testing-library/react";
import {Spinner} from "./Spinner";

describe("Spinner", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders Spinner", () => {
    const {getByRole} = render(<Spinner />);

    const spinner = getByRole("progressbar");
    expect(spinner).toBeInTheDocument();
  });

  it("renders spinner with the default color style", () => {
    const {getByRole} = render(<Spinner />);

    const spinner = getByRole("progressbar");
    expect(spinner).toHaveClass("MuiCircularProgress-colorPrimary");
  });
});
