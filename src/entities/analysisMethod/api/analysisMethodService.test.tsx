import {
  getAnalysisMethodService,
  getAnalysisMethodByIdService,
} from "./analysisMethodService";
import {buildAnalysisMethodsData} from "../../../shared/test/builders/analisysMethodBuilder";
import {AnalysisMethod} from "../model/AnalysisMethod";
import {apiClient} from "../../../shared/api/apliClient";

const mockAnalysisMethods: AnalysisMethod[] = buildAnalysisMethodsData(3);

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

describe("analysisMethodService", () => {
  it("should return a list of analysis methods", async () => {
    const mockApiClientGet = apiClient.get as jest.Mock;
    mockApiClientGet.mockResolvedValueOnce({data: mockAnalysisMethods});
    const expectedURL = "http://mockurl.com/api/analysisMethods";

    const analysisMethods = await getAnalysisMethodService();

    expect(analysisMethods).toEqual(mockAnalysisMethods);
    expect(apiClient.get).toHaveBeenCalledWith(expectedURL);
  });

  it("should return an analysis method by id", async () => {
    const mockApiClientGet = apiClient.get as jest.Mock;
    mockApiClientGet.mockResolvedValueOnce({data: mockAnalysisMethods[0]});
    const expectedURL = "http://mockurl.com/api/analysisMethods/1";

    const analysisMethod = await getAnalysisMethodByIdService("1");

    expect(analysisMethod).toEqual(mockAnalysisMethods[0]);
    expect(apiClient.get).toHaveBeenCalledWith(expectedURL);
  });

  it("should throw an error when an error occurs", async () => {
    const mockApiClientGet = apiClient.get as jest.Mock;
    const mockErrorMessage = "Mock error";
    mockApiClientGet.mockRejectedValueOnce(new Error(mockErrorMessage));

    try {
      await getAnalysisMethodService();
    } catch (error) {
      expect((error as Error).message).toBe(mockErrorMessage);
    }
  });
});
