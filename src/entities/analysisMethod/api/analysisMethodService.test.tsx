import {
  createAnalysisMethodService,
  deleteAnalysisMethodService,
  editAnalysisMethodService,
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

  it("should create an analysis method", async () => {
    const mockApiClientPost = apiClient.post as jest.Mock;
    mockApiClientPost.mockResolvedValueOnce({data: mockAnalysisMethods[0]});
    const expectedURL = "http://mockurl.com/api/analysisMethods";

    const analysisMethod = await createAnalysisMethodService(
      mockAnalysisMethods[0],
    );

    expect(analysisMethod).toEqual(mockAnalysisMethods[0]);
    expect(mockApiClientPost).toHaveBeenCalledWith(
      expectedURL,
      mockAnalysisMethods[0],
    );
  });

  it("should edit an analysis method", async () => {
    const mockApiClientPut = apiClient.put as jest.Mock;
    mockApiClientPut.mockResolvedValueOnce({data: mockAnalysisMethods[0]});
    const expectedURL = "http://mockurl.com/api/analysisMethods/1";

    const analysisMethod = await editAnalysisMethodService(
      mockAnalysisMethods[0],
      "1",
    );

    expect(analysisMethod).toEqual(mockAnalysisMethods[0]);
    expect(mockApiClientPut).toHaveBeenCalledWith(
      expectedURL,
      mockAnalysisMethods[0],
    );
  });

  it("should delete an analysis method", async () => {
    const mockApiClientDelete = apiClient.delete as jest.Mock;
    mockApiClientDelete.mockResolvedValueOnce({data: mockAnalysisMethods[0]});
    const expectedURL = "http://mockurl.com/api/analysisMethods/1";

    const analysisMethod = await deleteAnalysisMethodService("1");

    expect(analysisMethod).toEqual(mockAnalysisMethods[0]);
    expect(mockApiClientDelete).toHaveBeenCalledWith(expectedURL);
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
