import {
  createTestTypeService,
  deleteTestTypeService,
  editTestTypeService,
  getTestTypeByIdService,
  getTestTypesService,
} from "./testTypeService";
import {TestType} from "../model/TestType";
import {apiClient} from "../../../shared/api/apliClient";

const mockTestTypes: TestType[] = [
  {id: "1", name: "Physical"},
  {id: "2", name: "Microbiological"},
];

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

describe("testTypeService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of test types", async () => {
    const mockApiClientGet = apiClient.get as jest.Mock;
    mockApiClientGet.mockResolvedValueOnce({data: mockTestTypes});
    const expectedURL = "http://mockurl.com/api/testTypes";

    const testTypes = await getTestTypesService();

    expect(testTypes).toEqual(mockTestTypes);
    expect(mockApiClientGet).toHaveBeenCalledWith(expectedURL);
  });

  it("should return a test type by id", async () => {
    const mockApiClientGet = apiClient.get as jest.Mock;
    mockApiClientGet.mockResolvedValueOnce({data: mockTestTypes[0]});
    const expectedURL = "http://mockurl.com/api/testTypes/1";

    const testType = await getTestTypeByIdService("1");

    expect(testType).toEqual(mockTestTypes[0]);
    expect(mockApiClientGet).toHaveBeenCalledWith(expectedURL);
  });

  it("should create a test type", async () => {
    const mockApiClientPost = apiClient.post as jest.Mock;
    mockApiClientPost.mockResolvedValueOnce({data: mockTestTypes[0]});
    const expectedURL = "http://mockurl.com/api/testTypes";

    const testType = await createTestTypeService(mockTestTypes[0]);

    expect(testType).toEqual(mockTestTypes[0]);
    expect(mockApiClientPost).toHaveBeenCalledWith(
      expectedURL,
      mockTestTypes[0],
    );
  });

  it("should edit a test type", async () => {
    const mockApiClientPut = apiClient.put as jest.Mock;
    mockApiClientPut.mockResolvedValueOnce({data: mockTestTypes[0]});
    const expectedURL = "http://mockurl.com/api/testTypes/1";

    const testType = await editTestTypeService(mockTestTypes[0], "1");

    expect(testType).toEqual(mockTestTypes[0]);
    expect(mockApiClientPut).toHaveBeenCalledWith(
      expectedURL,
      mockTestTypes[0],
    );
  });

  it("should delete a test type", async () => {
    const mockApiClientDelete = apiClient.delete as jest.Mock;
    mockApiClientDelete.mockResolvedValueOnce({data: mockTestTypes[0]});
    const expectedURL = "http://mockurl.com/api/testTypes/1";

    const testType = await deleteTestTypeService("1");

    expect(testType).toEqual(mockTestTypes[0]);
    expect(mockApiClientDelete).toHaveBeenCalledWith(expectedURL);
  });
});
