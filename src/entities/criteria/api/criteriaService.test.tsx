import {getCriteriaByIdService, getCriteriasService} from "./criteriaService";
import {buildCriteriasData} from "../../../shared/test/builders/criteriaBuilder";
import {Criteria} from "../model/Criteria";
import {apiClient} from "../../../shared/api/apliClient";

const mockCriterias: Criteria[] = buildCriteriasData(2);

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

describe("criteriaService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of criterias", async () => {
    const mockApiClientGet = apiClient.get as jest.Mock;
    mockApiClientGet.mockResolvedValueOnce({data: mockCriterias});
    const expectedURL = "http://mockurl.com/api/criterias";

    const criterias = await getCriteriasService();

    expect(criterias).toEqual(mockCriterias);
    expect(apiClient.get).toHaveBeenCalledWith(expectedURL);
  });

  it("should return a criteria by id", async () => {
    const mockApiClientGet = apiClient.get as jest.Mock;
    mockApiClientGet.mockResolvedValueOnce({data: mockCriterias[0]});
    const expectedURL = "http://mockurl.com/api/criterias/1";

    const criteria = await getCriteriaByIdService("1");

    expect(criteria).toEqual(mockCriterias[0]);
    expect(apiClient.get).toHaveBeenCalledWith(expectedURL);
  });

  it("should throw an error when an error occurs", async () => {
    const mockApiClientGet = apiClient.get as jest.Mock;
    const mockErrorMessage = "Mock error";
    mockApiClientGet.mockRejectedValueOnce(new Error(mockErrorMessage));

    try {
      await getCriteriasService();
    } catch (error) {
      expect((error as Error).message).toBe(mockErrorMessage);
    }
  });
});
