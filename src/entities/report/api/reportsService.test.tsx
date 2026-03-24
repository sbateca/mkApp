import axios from "axios";
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
import {
  AnalysisMethod,
  Analyte,
  Client,
  Criteria,
  Sample,
  SampleType,
} from "../../../model";
import {buildAnalysisMethodsData} from "../../../shared/test/builders/analisysMethodBuilder";
import {buildCriteriasData} from "../../../shared/test/builders/criteriaBuilder";

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
jest.mock("axios");

describe("reportsService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of reports", async () => {
    jest.spyOn(axios, "get").mockResolvedValueOnce({data: mockReports});
    const expectedURL = "http://mockurl.com/api/reports";

    const reports = await getReportsService();

    expect(reports).toEqual(mockReports);
    expect(axios.get).toHaveBeenCalledWith(expectedURL);
  });

  it("should return a report by id", async () => {
    jest.spyOn(axios, "get").mockResolvedValueOnce({data: mockReports[0]});
    const expectedURL = "http://mockurl.com/api/reports/1";

    const report = await getReportByIdService("1");

    expect(report).toEqual(mockReports[0]);
    expect(axios.get).toHaveBeenCalledWith(expectedURL);
  });

  it("should create a report", async () => {
    jest.spyOn(axios, "post").mockResolvedValueOnce({data: mockReports[0]});
    const expectedURL = "http://mockurl.com/api/reports";

    const report = await createReportService(mockReports[0]);

    expect(report).toEqual(mockReports[0]);
    expect(axios.post).toHaveBeenCalledWith(expectedURL, mockReports[0]);
  });

  it("should edit a report", async () => {
    jest.spyOn(axios, "put").mockResolvedValueOnce({data: mockReports[0]});
    const expectedURL = "http://mockurl.com/api/reports/1";

    const report = await editReportService("1", mockReports[0]);

    expect(report).toEqual(mockReports[0]);
    expect(axios.put).toHaveBeenCalledWith(expectedURL, mockReports[0]);
  });

  it("should throw an error when an error occurs in get method", async () => {
    jest.spyOn(axios, "get").mockRejectedValueOnce(new Error("Mock error"));

    try {
      await getReportsService();
    } catch (error) {
      expect((error as Error).message).toBe(
        "Error retrieving reports: Mock error",
      );
    }
  });

  it("should throw an error when an error occurs in create method", async () => {
    jest.spyOn(axios, "post").mockRejectedValueOnce(new Error("Mock error"));

    try {
      await createReportService(mockReports[0]);
    } catch (error) {
      expect((error as Error).message).toBe(
        "Error creating report: Mock error",
      );
    }
  });

  it("should throw an error when an error occurs in edit method", async () => {
    jest.spyOn(axios, "put").mockRejectedValueOnce(new Error("Mock error"));

    try {
      await editReportService("1", mockReports[0]);
    } catch (error) {
      expect((error as Error).message).toBe("Error editing report: Mock error");
    }
  });
});
