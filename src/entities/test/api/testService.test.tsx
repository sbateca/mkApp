import {apiClient} from "../../../shared/api/apliClient";
import {buildTestsData} from "../../../shared/test/builders";
import {Test} from "../model/Test";
import {
  createTestService,
  deleteTestService,
  editTestService,
  getTestByIdService,
  getTestsService,
} from "./testService";

const mockTests: Test[] = buildTestsData(3);

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

describe("testService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of tests", async () => {
    (apiClient.get as jest.Mock).mockResolvedValueOnce({data: mockTests});

    const tests = await getTestsService();

    expect(tests).toEqual(mockTests);
    expect(apiClient.get).toHaveBeenCalledWith("http://mockurl.com/api/tests");
  });

  it("should return a test by id", async () => {
    (apiClient.get as jest.Mock).mockResolvedValueOnce({data: mockTests[0]});

    const test = await getTestByIdService("1");

    expect(test).toEqual(mockTests[0]);
    expect(apiClient.get).toHaveBeenCalledWith(
      "http://mockurl.com/api/tests/1",
    );
  });

  it("should create a test", async () => {
    (apiClient.post as jest.Mock).mockResolvedValueOnce({data: mockTests[0]});

    const test = await createTestService(mockTests[0]);

    expect(test).toEqual(mockTests[0]);
    expect(apiClient.post).toHaveBeenCalledWith(
      "http://mockurl.com/api/tests",
      mockTests[0],
    );
  });

  it("should edit a test", async () => {
    (apiClient.get as jest.Mock).mockResolvedValueOnce({data: mockTests[0]});
    (apiClient.put as jest.Mock).mockResolvedValueOnce({data: mockTests[0]});

    const test = await editTestService("1", mockTests[0]);

    expect(test).toEqual(mockTests[0]);
    expect(apiClient.put).toHaveBeenCalledWith(
      "http://mockurl.com/api/tests/1",
      mockTests[0],
    );
  });

  it("should delete a test", async () => {
    (apiClient.get as jest.Mock).mockResolvedValueOnce({data: mockTests[0]});
    (apiClient.delete as jest.Mock).mockResolvedValueOnce({});

    const test = await deleteTestService("1");

    expect(test).toBeUndefined();
    expect(apiClient.delete).toHaveBeenCalledWith(
      `http://mockurl.com/api/tests/${mockTests[0].id}`,
    );
  });
});
