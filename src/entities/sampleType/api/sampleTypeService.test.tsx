import {
  getSampleTypeByIdService,
  getSampleTypesService,
} from "./sampleTypeService";
import {SampleType} from "../model/SampleType";
import {buildSampleTypesData} from "../../../shared/test/builders";
import {apiClient} from "../../../shared/api/apliClient";

const mockSampleTypes: SampleType[] = buildSampleTypesData(2);

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

describe("sampleTypeService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of sample types", async () => {
    const mockApiClientGet = apiClient.get as jest.Mock;
    mockApiClientGet.mockResolvedValueOnce({data: mockSampleTypes});
    const expectedURL = "http://mockurl.com/api/sampleTypes";

    const sampleTypes = await getSampleTypesService();

    expect(sampleTypes).toEqual(mockSampleTypes);
    expect(mockApiClientGet).toHaveBeenCalledWith(expectedURL);
  });

  it("should return a sample type by id", async () => {
    const mockApiClientGet = apiClient.get as jest.Mock;
    mockApiClientGet.mockResolvedValueOnce({data: mockSampleTypes});
    const expectedURL = "http://mockurl.com/api/sampleTypes/1";

    const sampleType = await getSampleTypeByIdService("1");

    expect(sampleType).toEqual(mockSampleTypes[0]);
    expect(mockApiClientGet).toHaveBeenCalledWith(expectedURL);
  });

  it("should throw an error when an error occurs", async () => {
    const mockApiClientGet = apiClient.get as jest.Mock;
    mockApiClientGet.mockRejectedValueOnce(new Error("Mock error"));

    try {
      await getSampleTypesService();
    } catch (error) {
      expect((error as Error).message).toBe("Mock error");
    }
  });
});
