import {
  createReportService,
  editReportService,
  getReportByIdService,
  getReportsService,
} from "./reportsService";
import {
  buildAnalytesData,
  buildClientsData,
  buildReportsData,
  buildSamplesData,
  buildSampleTypesData,
} from "../../../shared/test/builders";

import {buildAnalysisMethodsData} from "../../../shared/test/builders/analisysMethodBuilder";
import {buildCriteriasData} from "../../../shared/test/builders/criteriaBuilder";
import {SampleType} from "../../sampleType";
import {Client} from "../../client";
import {Sample} from "../../sample";
import {Analyte} from "../../analyte/model/Analyte";
import {AnalysisMethod} from "../../analysisMethod/model/AnalysisMethod";
import {Criteria} from "../../criteria";
import {apiClient} from "../../../shared/api/apliClient";

const mockSampleTypes: SampleType[] = buildSampleTypesData(2);
const mockAnalytes: Analyte[] = buildAnalytesData(2);
const mockAnalysisMethods: AnalysisMethod[] = buildAnalysisMethodsData(2);
const mockClients: Client[] = buildClientsData(2);
const mockCriterias: Criteria[] = buildCriteriasData(2);
const mockSamples: Sample[] = buildSamplesData(2, {
  clientId: mockClients[0].id,
  sampleTypeId: mockSampleTypes[0].id,
});
const mockReports = buildReportsData(2, {
  sampleId: mockSamples[0].id,
  analyte: mockAnalytes[0].id,
  analysisMethod: mockAnalysisMethods[0].id,
  criteria: mockCriterias[0].id,
});

jest.mock("../../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

jest.mock("../../../shared/api/apliClient", () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("reportsService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of reports", async () => {
    const mockApiClientGet = apiClient.get as jest.Mock;
    mockApiClientGet.mockResolvedValueOnce({data: mockReports});
    const expectedURL = "http://mockurl.com/api/reports";

    const reports = await getReportsService();

    expect(reports).toEqual(mockReports);
    expect(apiClient.get).toHaveBeenCalledWith(expectedURL);
  });

  it("should return a report by id", async () => {
    const mockApiClientGet = apiClient.get as jest.Mock;
    mockApiClientGet.mockResolvedValueOnce({data: mockReports[0]});
    const expectedURL = "http://mockurl.com/api/reports/1";

    const report = await getReportByIdService("1");

    expect(report).toEqual(mockReports[0]);
    expect(apiClient.get).toHaveBeenCalledWith(expectedURL);
  });

  it("should create a report", async () => {
    const mockApiClientGet = apiClient.post as jest.Mock;
    mockApiClientGet.mockResolvedValueOnce({data: mockReports[0]});
    const expectedURL = "http://mockurl.com/api/reports";

    const report = await createReportService(mockReports[0]);

    expect(report).toEqual(mockReports[0]);
    expect(apiClient.post).toHaveBeenCalledWith(expectedURL, mockReports[0]);
  });

  it("should edit a report", async () => {
    const mockApiClientGet = apiClient.put as jest.Mock;
    mockApiClientGet.mockResolvedValueOnce({data: mockReports[0]});
    const expectedURL = "http://mockurl.com/api/reports/1";

    const report = await editReportService("1", mockReports[0]);

    expect(report).toEqual(mockReports[0]);
    expect(apiClient.put).toHaveBeenCalledWith(expectedURL, mockReports[0]);
  });

  it("should throw an error when an error occurs in get method", async () => {
    const mockErrorMessage = "Mock error";
    const mockApiClientGet = apiClient.get as jest.Mock;
    mockApiClientGet.mockRejectedValueOnce(new Error(mockErrorMessage));

    try {
      await getReportsService();
    } catch (error) {
      expect((error as Error).message).toBe("Mock error");
    }
  });

  it("should throw an error when an error occurs in create method", async () => {
    const mockErrorMessage = "Mock error";
    const mockApiClientGet = apiClient.post as jest.Mock;
    mockApiClientGet.mockRejectedValueOnce(new Error(mockErrorMessage));

    try {
      await createReportService(mockReports[0]);
    } catch (error) {
      expect((error as Error).message).toBe(mockErrorMessage);
    }
  });

  it("should throw an error when an error occurs in edit method", async () => {
    const mockErrorMessage = "Mock error";
    const mockApiClientGet = apiClient.put as jest.Mock;
    mockApiClientGet.mockRejectedValueOnce(new Error(mockErrorMessage));

    try {
      await editReportService("1", mockReports[0]);
    } catch (error) {
      expect((error as Error).message).toBe(mockErrorMessage);
    }
  });
});
