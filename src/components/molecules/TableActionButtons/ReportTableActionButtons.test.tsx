import {render, screen} from "@testing-library/react";
import {ReportTableActionButtons} from "./ReportTableActionButtons";
import * as hooks from "../../../utils/hooks";

jest.mock("../../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://example.com/api",
  },
}));

jest.mock("../../../stores", () => ({
  __esModule: true,
  useSnackBarStore: jest.fn(),
}));

jest.mock("../../../utils/hooks", () => ({
  useReports: jest.fn(),
  useSideSection: () => ({
    setIsSideSectionOpen: jest.fn(),
    setSideSectionTitle: jest.fn(),
  }),
}));

describe("ReportTableActionButtons", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render the actions buttons successfully", async () => {
    jest.spyOn(hooks, "useReports").mockReturnValue({
      isLoading: false,
      error: null,
      deleteReport: jest.fn(),
      getReportById: jest.fn(),
      getReports: jest.fn(),
      setSelectedReport: jest.fn(),
      reports: null,
      selectedReport: null,
      createReport: jest.fn(),
      editReport: jest.fn(),
    });

    render(<ReportTableActionButtons reportId="1" />);
    const viewButton = screen.getByText("View");
    const deleteButton = screen.getByText("Delete");

    expect(viewButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  it("should not render the actions buttons and show the progressbar when isLoading is true", async () => {
    jest.spyOn(hooks, "useReports").mockReturnValue({
      isLoading: true,
      error: null,
      deleteReport: jest.fn(),
      getReportById: jest.fn(),
      getReports: jest.fn(),
      setSelectedReport: jest.fn(),
      reports: null,
      selectedReport: null,
      createReport: jest.fn(),
      editReport: jest.fn(),
    });

    render(<ReportTableActionButtons reportId="1" />);
    const viewButton = screen.queryByText("View");
    const deleteButton = screen.queryByText("Delete");
    const progressBar = screen.getByRole("progressbar");

    expect(viewButton).not.toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();
    expect(progressBar).toBeInTheDocument();
  });
});
