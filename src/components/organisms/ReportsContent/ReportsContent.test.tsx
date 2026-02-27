import {fireEvent, render, screen, waitFor} from "@testing-library/react";

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
import {ReportStore} from "../../../features/reports/model/types";
import {AnalyteStore} from "../../../features/analyte/model/types";

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
let mockedReportsState: ReportStore = {
  reports: mockReports,
  selectedReport: mockReports[0],
  isLoading: false,
  error: null,
  setReports: jest.fn(),
  setSelectedReport: jest.fn(),
  getReports: jest.fn().mockReturnValue(mockReports),
  getReportById: jest.fn().mockReturnValue(mockReports[0]),
  createReport: jest.fn().mockReturnValue(mockReports[0]),
  editReport: jest.fn().mockReturnValue(mockReports[0]),
  deleteReport: jest.fn().mockReturnValue(mockReports[0]),
};
const mockSampleTypeStoreState = {
  sampleTypes: mockSampleTypes,
  selectedSampleType: mockSampleTypes[0],
  isLoading: false,
  error: null,
  setSampleTypes: jest.fn(),
  setSelectedSampleType: jest.fn(),
  getSampleTypes: jest.fn().mockResolvedValue(mockSampleTypes),
  getSampleTypeById: jest.fn(),
};

const mockAnalyteStoreState: AnalyteStore = {
  analytes: mockAnalytes,
  selectedAnalyte: mockAnalytes[0],
  setSelectedAnalyte: jest.fn(),
  setAnalytes: jest.fn(),
  getAnalytes: jest.fn().mockReturnValue(mockAnalytes),
  getAnalyteById: jest.fn().mockReturnValue(mockAnalytes[0]),
  isLoading: false,
  error: null,
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

jest.mock("../../../features/reports/model/store", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useReportStore: (selector: any) => selector(mockedReportsState),
}));

jest.mock("../../../features/samples/model/store", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSampleStore: (selector: any) => selector(mockedSamplesState),
}));

jest.mock("../../../features/sampleType/model/store", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSampleTypeStore: (selector: any) => selector(mockSampleTypeStoreState),
}));

jest.mock("../../../features/analyte/model/store", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useAnalyteStore: (selector: any) => selector(mockAnalyteStoreState),
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

    render(<ReportsContent />);

    await waitFor(() => {
      expect(screen.getByText(expectedReportDate)).toBeInTheDocument();
      expect(screen.getByText(expectedSampleCodeAndType)).toBeInTheDocument();
      expect(screen.getByText(expectedAnalyteName)).toBeInTheDocument();
      expect(screen.getByText(expectedResult)).toBeInTheDocument();
    });
  });

  it("should render no data text when does not retrieve reports", async () => {
    mockedReportsState = {
      ...mockedReportsState,
      reports: [],
    };

    render(<ReportsContent />);

    await waitFor(() => {
      expect(screen.getByText("No records to display")).toBeInTheDocument();
    });
  });

  it("should render loading spinner when is loading", async () => {
    mockedReportsState = {
      ...mockedReportsState,
      isLoading: true,
    };

    render(<ReportsContent />);

    await waitFor(() => {
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });
  });

  it("should render error message when there is an error", async () => {
    mockedReportsState = {
      ...mockedReportsState,
      isLoading: false,
      error: "Error message",
    };

    render(<ReportsContent />);

    await waitFor(() => {
      expect(screen.getByText("Error message")).toBeInTheDocument();
    });
  });

  it("should render the report detail when click in details button", async () => {
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
