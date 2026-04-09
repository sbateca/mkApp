import {render, screen} from "@testing-library/react";
import {ReportTableActionButtons} from "./ReportTableActionButtons";
import {ReportStore} from "../../../../entities/report";
import {SideSectionStore} from "../../../sideSection";

let mockReportsStoreState: ReportStore = {
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
  setReports: jest.fn(),
};

let mockSideSectionStoreState: SideSectionStore = {
  isSideSectionOpen: false,
  sideSectionTitle: "",
  setIsSideSectionOpen: jest.fn(),
  setSideSectionTitle: jest.fn(),
};

jest.mock("../../../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://example.com/api",
  },
}));

jest.mock("../../../../entities/report/model/store", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useReportStore: (selector: any) => selector(mockReportsStoreState),
}));

jest.mock("../../../../features/sideSection/model/store", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSideSectionStore: (selector: any) => selector(mockSideSectionStoreState),
}));

describe("ReportTableActionButtons", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the actions buttons successfully", async () => {
    render(<ReportTableActionButtons reportId="1" />);
    const viewButton = screen.getByText("View");
    const deleteButton = screen.getByText("Delete");

    expect(viewButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  it("should not render the actions buttons and show the progressbar when isLoading is true", async () => {
    mockReportsStoreState = {
      ...mockReportsStoreState,
      isLoading: true,
    };
    mockSideSectionStoreState = {
      isSideSectionOpen: true,
      sideSectionTitle: "",
      setIsSideSectionOpen: jest.fn(),
      setSideSectionTitle: jest.fn(),
    };

    render(<ReportTableActionButtons reportId="1" />);
    const viewButton = screen.queryByText("View");
    const deleteButton = screen.queryByText("Delete");
    const progressBar = screen.getByRole("progressbar");

    expect(viewButton).not.toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();
    expect(progressBar).toBeInTheDocument();
  });
});
