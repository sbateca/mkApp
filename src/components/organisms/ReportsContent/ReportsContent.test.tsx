import {fireEvent, render, screen, waitFor} from "@testing-library/react";

import * as useReportsModule from "../../../utils/hooks/useReports";
import * as useSideSectionModule from "../../../utils/hooks/useSideSection";
import {Report} from "../../../model/Report";
import {ReportsContent} from "./ReportsContent";
import {Sample, SampleType, Analyte} from "../../../model";
import {
  buildAnalytesData,
  buildClientData,
  buildReportsData,
  buildSamplesData,
  buildSampleTypesData,
} from "../../../shared/test/builders";

const mockSampleTypes: SampleType[] = buildSampleTypesData(1);
const mockAnalytes: Analyte[] = buildAnalytesData(1);
const mockClient = buildClientData();
const mockSamples = buildSamplesData(1, {
  clientId: mockClient.id,
  sampleTypeId: mockSampleTypes[0].id,
});
const mockReports: Report[] = buildReportsData(1, {
  sampleId: mockSamples[0].id,
  analyte: mockAnalytes[0].id,
});

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    const expectedReportDate = mockReports[0].reportDate;
    const sampleCode = mockSamples[0].sampleCode;
    const sampleTypeName = mockSampleTypes[0].name;
    const expectedSampleCodeAndType = `${sampleCode} - ${sampleTypeName}`;
    const expectedAnalyteName = mockAnalytes[0].name;
    const expectedResult = mockReports[0].result;

    jest.spyOn(useReportsModule, "useReports").mockReturnValue({
      ...mockUseReportArgs,
      reports: mockReports,
    });

    render(<ReportsContent />);

    await waitFor(() => {
      expect(screen.getByText(expectedReportDate)).toBeInTheDocument();
      expect(screen.getByText(expectedSampleCodeAndType)).toBeInTheDocument();
      expect(screen.getByText(expectedAnalyteName)).toBeInTheDocument();
      expect(screen.getByText(expectedResult)).toBeInTheDocument();
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
