import axios from "axios";
import {getCriteriaByIdService, getCriteriasService} from "./criteriaService";
import {buildCriteriasData} from "../../../shared/test/builders/criteriaBuilder";
import {Criteria} from "../model/Criteria";

const mockCriterias: Criteria[] = buildCriteriasData(2);

jest.mock("../../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));
jest.mock("axios");

describe("criteriaService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of criterias", async () => {
    jest.spyOn(axios, "get").mockResolvedValueOnce({data: mockCriterias});
    const expectedURL = "http://mockurl.com/api/criterias";

    const criterias = await getCriteriasService();

    expect(criterias).toEqual(mockCriterias);
    expect(axios.get).toHaveBeenCalledWith(expectedURL);
  });

  it("should return a criteria by id", async () => {
    jest.spyOn(axios, "get").mockResolvedValueOnce({data: mockCriterias[0]});
    const expectedURL = "http://mockurl.com/api/criterias/1";

    const criteria = await getCriteriaByIdService("1");

    expect(criteria).toEqual(mockCriterias[0]);
    expect(axios.get).toHaveBeenCalledWith(expectedURL);
  });

  it("should throw an error when an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValueOnce(new Error("Mock error"));

    try {
      await getCriteriasService();
    } catch (error) {
      expect((error as Error).message).toBe(
        "Error retrieving criterias: Mock error",
      );
    }
  });
});
