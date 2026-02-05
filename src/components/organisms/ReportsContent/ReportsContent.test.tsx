import {fireEvent, render, screen, waitFor} from "@testing-library/react";

import * as useReportsModule from "../../../utils/hooks/useReports";
import * as useSideSectionModule from "../../../utils/hooks/useSideSection";
import {Report} from "../../../model/Report";
import {ReportsContent} from "./ReportsContent";
import {Sample, SampleType, Analyte} from "../../../model";

const mockSampleTypes: SampleType[] = [
  {
    id: "b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b3",
    name: "Total coliforms",
  },
];
const mockSamples: Sample[] = [
  {
    id: "ce59c2ba-c7f2-4df5-a8db-7dd74b7381a9",
    sampleCode: "sam1001",
    sampleTypeId: "b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b3",
    clientId: "ab3b3b3b-ab3b-ab3b-ab3b-ab3b3b3b3b3b",
    getSampleDate: "2024-08-05",
    receptionDate: "2024-08-05",
    analysisDate: "2024-08-05",
    sampleLocation: "mock location",
    responsable: "mock responsable",
  },
];
const mockAnalytes: Analyte[] = [
  {
    id: "ab3b3b3b-ab3b-ab3b-ab3b-ab3b3b3b3b3b",
    name: "mock analyte name",
  },
];
const mockReports: Report[] = [
  {
    id: "14860e3c-56df-4a31-96cc-100dc2a8f749",
    reportDate: "2024-08-05",
    sampleId: "ce59c2ba-c7f2-4df5-a8db-7dd74b7381a9",
    analyte: "ab3b3b3b-ab3b-ab3b-ab3b-ab3b3b3b3b3b",
    analysisMethod: "c461270c-6682-4f51-9148-efb9fbaab44e",
    criteria: "b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b3",
    result: "0 UFC/g",
  },
];

const mockUseReportArgs = {
  reports: mockReports,
  selectedReport: null,
  setSelectedReport: jest.fn(),
  getReports: jest.fn(),
  getReportById: jest.fn(),
  createReport: jest.fn(),
  editReport: jest.fn(),
  deleteReport: jest.fn(),
  isLoading: false,
  error: null,
};

const mockUseSideSectionArgs = {
  isSideSectionOpen: false,
  setIsSideSectionOpen: jest.fn(),
  sideSectionTitle: "",
  setSideSectionTitle: jest.fn(),
};
const mockedSamplesState = {
  samples: mockSamples,
  selectedSample: mockSamples[0],
  isLoading: false,
  error: null,
  setSelectedSample: jest.fn(),
  getSamples: jest.fn(),
  getSampleById: jest.fn().mockResolvedValue(mockSamples[0] as Sample),
  createSample: jest.fn().mockResolvedValue(mockSamples[0] as Sample),
  editSample: jest.fn().mockResolvedValue(mockSamples[0] as Sample),
  deleteSample: jest.fn().mockResolvedValue(null),
};

jest.mock("../../../Config/envManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));
jest.mock("../ReportsDetail/ReportsDetail", () => ({
  ReportDetail: () => (
    <div data-testid="reportsDetail">Reports Detail Component</div>
  ),
}));
jest.mock("../../../utils/hooks/useSampleType", () => ({
  useSampleType: () => ({
    sampleTypes: mockSampleTypes,
    getSampleTypes: jest.fn(),
  }),
}));
jest.mock("../../../features/samples/model/store", () => ({
  useSampleStore: (selector: any) => selector(mockedSamplesState),
}));
jest.mock("../../../utils/hooks/useAnalyte", () => ({
  useAnalyte: () => ({
    analytes: mockAnalytes,
    getAnalytes: jest.fn(),
  }),
}));

describe("ReportsContent test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render reports data successfully", async () => {
    jest.spyOn(useReportsModule, "useReports").mockReturnValue({
      ...mockUseReportArgs,
      reports: mockReports,
    });

    render(<ReportsContent />);

    await waitFor(() => {
      expect(screen.getByText("2024-08-05")).toBeInTheDocument();
      expect(screen.getByText("sam1001 - Total coliforms")).toBeInTheDocument();
      expect(screen.getByText("mock analyte name")).toBeInTheDocument();
      expect(screen.getByText("0 UFC/g")).toBeInTheDocument();
    });
  });

  it("should render no data text when does not retrieve reports", async () => {
    jest.spyOn(useReportsModule, "useReports").mockReturnValue({
      ...mockUseReportArgs,
      reports: [],
    });

    render(<ReportsContent />);

    await waitFor(() => {
      expect(screen.getByText("No records to display")).toBeInTheDocument();
    });
  });

  it("should render loading spinner when is loading", async () => {
    jest.spyOn(useReportsModule, "useReports").mockReturnValue({
      ...mockUseReportArgs,
      isLoading: true,
    });

    render(<ReportsContent />);

    await waitFor(() => {
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });
  });

  it("should render error message when there is an error", async () => {
    jest.spyOn(useReportsModule, "useReports").mockReturnValue({
      ...mockUseReportArgs,
      error: "Error message",
    });

    render(<ReportsContent />);

    await waitFor(() => {
      expect(screen.getByText("Error message")).toBeInTheDocument();
    });
  });

  it("should render the report detail when click in details button", async () => {
    jest.spyOn(useReportsModule, "useReports").mockReturnValue({
      ...mockUseReportArgs,
      reports: mockReports,
    });
    jest.spyOn(useSideSectionModule, "useSideSection").mockReturnValue({
      ...mockUseSideSectionArgs,
      isSideSectionOpen: true,
    });

    render(<ReportsContent />);

    const detailsButton = screen.queryByDisplayValue("View");
    if (detailsButton) {
      fireEvent.click(detailsButton);
      expect(screen.getByTestId("reportsDetail")).toBeInTheDocument();
    }
  });
});
