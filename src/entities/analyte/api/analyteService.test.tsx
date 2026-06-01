import {
  createAnalyteService,
  deleteAnalyteService,
  editAnalyteService,
  getAnalyteByIdService,
  getAnalytesByTestTypeIdService,
  getAnalytesService,
} from "./analyteService";
import {buildAnalytesData} from "../../../shared/test/builders";
import {Analyte} from "../model/Analyte";
import {apiClient} from "../../../shared/api/apliClient";

const mockAnalytes: Analyte[] = buildAnalytesData(2);

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

describe("analyteService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of analytes", async () => {
    const mockApiClientGet = apiClient.get as jest.Mock;
    mockApiClientGet.mockResolvedValueOnce({data: mockAnalytes});
    const expectedURL = "http://mockurl.com/api/analytes";

    const analytes = await getAnalytesService();

    expect(analytes).toEqual(mockAnalytes);
    expect(apiClient.get).toHaveBeenCalledWith(expectedURL);
  });

  it("should return an analyte by id", async () => {
    const mockApiClientGet = apiClient.get as jest.Mock;
    mockApiClientGet.mockResolvedValueOnce({data: mockAnalytes[0]});
    const expectedURL = "http://mockurl.com/api/analytes/1";

    const analyte = await getAnalyteByIdService("1");

    expect(analyte).toEqual(mockAnalytes[0]);
    expect(apiClient.get).toHaveBeenCalledWith(expectedURL);
  });

  it("should return analytes by test type id", async () => {
    const mockApiClientGet = apiClient.get as jest.Mock;
    mockApiClientGet.mockResolvedValueOnce({data: mockAnalytes});
    const expectedURL =
      "http://mockurl.com/api/analytes?testType.id=test-type-id";

    const analytes = await getAnalytesByTestTypeIdService("test-type-id");

    expect(analytes).toEqual(mockAnalytes);
    expect(mockApiClientGet).toHaveBeenCalledWith(expectedURL);
  });

  it("should create an analyte", async () => {
    const mockApiClientPost = apiClient.post as jest.Mock;
    mockApiClientPost.mockResolvedValueOnce({data: mockAnalytes[0]});
    const expectedURL = "http://mockurl.com/api/analytes";

    const analyte = await createAnalyteService(mockAnalytes[0]);

    expect(analyte).toEqual(mockAnalytes[0]);
    expect(mockApiClientPost).toHaveBeenCalledWith(
      expectedURL,
      mockAnalytes[0],
    );
  });

  it("should edit an analyte", async () => {
    const mockApiClientPut = apiClient.put as jest.Mock;
    mockApiClientPut.mockResolvedValueOnce({data: mockAnalytes[0]});
    const expectedURL = "http://mockurl.com/api/analytes/1";

    const analyte = await editAnalyteService(mockAnalytes[0], "1");

    expect(analyte).toEqual(mockAnalytes[0]);
    expect(mockApiClientPut).toHaveBeenCalledWith(expectedURL, mockAnalytes[0]);
  });

  it("should delete an analyte", async () => {
    const mockApiClientDelete = apiClient.delete as jest.Mock;
    mockApiClientDelete.mockResolvedValueOnce({data: mockAnalytes[0]});
    const expectedURL = "http://mockurl.com/api/analytes/1";

    const analyte = await deleteAnalyteService("1");

    expect(analyte).toEqual(mockAnalytes[0]);
    expect(mockApiClientDelete).toHaveBeenCalledWith(expectedURL);
  });

  it("should throw an error when an error occurs", async () => {
    const mockApiClientGet = apiClient.get as jest.Mock;
    const mockErrorMessage = "Mock error";
    mockApiClientGet.mockRejectedValueOnce(new Error(mockErrorMessage));

    try {
      await getAnalytesService();
    } catch (error) {
      expect((error as Error).message).toBe(mockErrorMessage);
    }
  });
});
