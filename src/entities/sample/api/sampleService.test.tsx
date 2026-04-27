import {
  createSampleService,
  deleteSampleService,
  editSampleService,
  getSampleByIdService,
  getSamplesService,
} from "./sampleService";
import {SampleType} from "../../sampleType";
import {
  buildClientsData,
  buildSamplesData,
  buildSampleTypesData,
} from "../../../shared/test/builders";
import {Client} from "../../client";
import {Sample} from "../model/Sample";
import {apiClient} from "../../../shared/api/apliClient";

const mockSampleTypes: SampleType[] = buildSampleTypesData(2);
const mockClients: Client[] = buildClientsData(2);
const mockSamples: Sample[] = buildSamplesData(2, {
  clientId: mockClients[0].id,
  sampleTypeId: mockSampleTypes[0].id,
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

describe("sampleService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of samples", async () => {
    const mockApiClientGet = apiClient.get as jest.Mock;
    mockApiClientGet.mockResolvedValueOnce({data: mockSamples});
    const expectedURL = "http://mockurl.com/api/samples";

    const samples = await getSamplesService();

    expect(samples).toEqual(mockSamples);
    expect(apiClient.get).toHaveBeenCalledWith(expectedURL);
  });

  it("should return a sample by id", async () => {
    const mockApiClientGet = apiClient.get as jest.Mock;
    mockApiClientGet.mockResolvedValueOnce({data: mockSamples[0]});
    const expectedURL = "http://mockurl.com/api/samples/1";

    const sample = await getSampleByIdService("1");

    expect(sample).toEqual(mockSamples[0]);
    expect(apiClient.get).toHaveBeenCalledWith(expectedURL);
  });

  it("should create a sample", async () => {
    const mockApiClientGet = apiClient.post as jest.Mock;
    mockApiClientGet.mockResolvedValueOnce({data: mockSamples[0]});
    const expectedURL = "http://mockurl.com/api/samples";

    const sample = await createSampleService(mockSamples[0]);

    expect(sample).toEqual(mockSamples[0]);
    expect(apiClient.post).toHaveBeenCalledWith(expectedURL, mockSamples[0]);
  });

  it("should edit a sample", async () => {
    const mockApiClientGet = apiClient.put as jest.Mock;
    mockApiClientGet.mockResolvedValueOnce({data: mockSamples[0]});
    const expectedURL = "http://mockurl.com/api/samples/1";

    const sample = await editSampleService("1", mockSamples[0]);

    expect(sample).toEqual(mockSamples[0]);
    expect(apiClient.put).toHaveBeenCalledWith(expectedURL, mockSamples[0]);
  });

  it("should throw an error when an error occurs in get method", async () => {
    const mockErrorMessage = "Mock error";
    const mockApiClientGet = apiClient.get as jest.Mock;
    mockApiClientGet.mockRejectedValueOnce(new Error(mockErrorMessage));

    try {
      await getSamplesService();
    } catch (error) {
      expect((error as Error).message).toBe(mockErrorMessage);
    }
  });

  it("should throw an error when an error occurs in create", async () => {
    const mockErrorMessage = "Mock error";
    const mockApiClientGet = apiClient.post as jest.Mock;
    mockApiClientGet.mockRejectedValueOnce(new Error(mockErrorMessage));

    try {
      await createSampleService(mockSamples[0]);
    } catch (error) {
      expect((error as Error).message).toBe(mockErrorMessage);
    }
  });

  it("should throw an error when an error occurs in edit", async () => {
    const mockErrorMessage = "Mock error";
    const mockApiClientGet = apiClient.put as jest.Mock;
    mockApiClientGet.mockRejectedValueOnce(new Error(mockErrorMessage));

    try {
      await editSampleService("1", mockSamples[0]);
    } catch (error) {
      expect((error as Error).message).toBe(mockErrorMessage);
    }
  });

  it("should throw an error when an unknown error occurs in delete", async () => {
    const mockErrorMessage = "Mock error";
    const mockApiClientGet = apiClient.delete as jest.Mock;
    mockApiClientGet.mockRejectedValueOnce(new Error(mockErrorMessage));

    try {
      await deleteSampleService("1");
    } catch (error) {
      expect((error as Error).message).toBe(mockErrorMessage);
    }
  });
});
