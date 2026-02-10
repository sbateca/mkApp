import axios from "axios";
import {
  getSampleTypeByIdService,
  getSampleTypesService,
} from "./sampleTypeService";
import {SampleType} from "../model";
import {buildSampleTypesData} from "../shared/test/builders";

const mockSampleTypes: SampleType[] = buildSampleTypesData(2);

jest.mock("../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));
jest.mock("axios");

describe("sampleTypeService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of sample types", async () => {
    jest.spyOn(axios, "get").mockResolvedValueOnce({data: mockSampleTypes});
    const expectedURL = "http://mockurl.com/api/sampleTypes";

    const sampleTypes = await getSampleTypesService();

    expect(sampleTypes).toEqual(mockSampleTypes);
    expect(axios.get).toHaveBeenCalledWith(expectedURL);
  });

  it("should return a sample type by id", async () => {
    jest.spyOn(axios, "get").mockResolvedValueOnce({data: mockSampleTypes[0]});
    const expectedURL = "http://mockurl.com/api/sampleTypes/1";

    const sampleType = await getSampleTypeByIdService("1");

    expect(sampleType).toEqual(mockSampleTypes[0]);
    expect(axios.get).toHaveBeenCalledWith(expectedURL);
  });

  it("should throw an error when an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValueOnce(new Error("Mock error"));

    try {
      await getSampleTypesService();
    } catch (error) {
      expect((error as Error).message).toBe(
        "Error retrieving sample types: Mock error",
      );
    }
  });
});
