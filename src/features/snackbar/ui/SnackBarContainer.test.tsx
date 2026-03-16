import {render, screen} from "@testing-library/react";
import {SnackBarContainer} from "./SnackBarContainer";
import {SnackBarSeverity} from "../../../utils/enums";

let mockSnackBarStoreState = {
  isSnackBarOpen: false,
  snackBarText: "",
  snackBarSeverity: SnackBarSeverity.INFO,
  callbackFunction: jest.fn(),
  showSnackBarMessage: jest.fn(),
  closeSnackBar: jest.fn(),
};

jest.mock("../../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://example.com/api",
  },
}));

jest.mock("../../../features/snackbar/model/store", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSnackBarStore: (selector: any) => selector(mockSnackBarStoreState),
}));

describe("SnackBarContainer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays the snackbar message", () => {
    mockSnackBarStoreState = {
      isSnackBarOpen: true,
      snackBarText: "Test message",
      snackBarSeverity: SnackBarSeverity.INFO,
      callbackFunction: jest.fn(),
      showSnackBarMessage: jest.fn(),
      closeSnackBar: jest.fn(),
    };
    render(<SnackBarContainer />);
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  it("does not render the snackbar when isSnackBarOpen value is false", () => {
    mockSnackBarStoreState = {
      isSnackBarOpen: false,
      snackBarText: "Test message",
      snackBarSeverity: SnackBarSeverity.INFO,
      callbackFunction: jest.fn(),
      showSnackBarMessage: jest.fn(),
      closeSnackBar: jest.fn(),
    };

    render(<SnackBarContainer />);
    expect(screen.queryByText("Test message")).not.toBeInTheDocument();
  });
});
