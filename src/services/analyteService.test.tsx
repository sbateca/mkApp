import axios from "axios";
import {getAnalyteByIdService, getAnalytesService} from "./analyteService";
import {buildAnalytesData} from "../shared/test/builders";
import {Analyte} from "../model";

const mockAnalytes: Analyte[] = buildAnalytesData(2);

jest.mock("../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));
jest.mock("axios");

describe("analyteService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of analytes", async () => {
    jest.spyOn(axios, "get").mockResolvedValueOnce({data: mockAnalytes});
    const expectedURL = "http://mockurl.com/api/analytes";

    const analytes = await getAnalytesService();

    expect(analytes).toEqual(mockAnalytes);
    expect(axios.get).toHaveBeenCalledWith(expectedURL);
  });

  it("should return an analyte by id", async () => {
    jest.spyOn(axios, "get").mockResolvedValueOnce({data: mockAnalytes[0]});
    const expectedURL = "http://mockurl.com/api/analytes/1";

    const analyte = await getAnalyteByIdService("1");

    expect(analyte).toEqual(mockAnalytes[0]);
    expect(axios.get).toHaveBeenCalledWith(expectedURL);
  });

  it("should throw an error when an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValueOnce(new Error("Mock error"));

    try {
      await getAnalytesService();
    } catch (error) {
      expect((error as Error).message).toBe(
        "Error retrieving analyte types: Mock error",
      );
    }
  });
});
