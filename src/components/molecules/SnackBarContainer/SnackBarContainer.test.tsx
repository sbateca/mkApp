import {render, screen} from "@testing-library/react";
import {SnackBarContainer} from "./SnackBarContainer";
import * as stores from "../../../stores/";
import {SnackBarSeverity} from "../../../utils/enums";

jest.mock("../../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://example.com/api",
  },
}));

jest.mock("../../../stores/snackBarStore", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("SnackBarContainer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays the snackbar message", () => {
    jest.spyOn(stores, "useSnackBarStore").mockReturnValue({
      isSnackBarOpen: true,
      snackBarText: "Test message",
      snackBarSeverity: SnackBarSeverity.INFO,
      showSnackBarMessage: jest.fn(),
      closeSnackBar: jest.fn(),
    });

    render(<SnackBarContainer />);
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  it("does not render the snackbar when isSnackBarOpen value is false", () => {
    jest.spyOn(stores, "useSnackBarStore").mockReturnValue({
      isSnackBarOpen: false,
      snackBarText: "Test message",
      snackBarSeverity: SnackBarSeverity.INFO,
      showSnackBarMessage: jest.fn(),
      closeSnackBar: jest.fn(),
    });

    render(<SnackBarContainer />);
    expect(screen.queryByText("Test message")).not.toBeInTheDocument();
  });
});
