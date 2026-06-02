import {buildCriteriasData} from "../../../shared/test/builders/criteriaBuilder";
import {CRITERIA_NOT_PROVIDED} from "../../../utils/constants";
import {
  createCriteriaService,
  deleteCriteriaService,
  editCriteriaService,
  getCriteriaByIdService,
  getCriteriasService,
} from "../api/criteriaService";
import {useCriteriaStore} from "./store";

jest.mock("../api/criteriaService", () => ({
  getCriteriasService: jest.fn(),
  getCriteriaByIdService: jest.fn(),
  createCriteriaService: jest.fn(),
  editCriteriaService: jest.fn(),
  deleteCriteriaService: jest.fn(),
}));

describe("useCriteriaStore", () => {
  const mockCriterias = buildCriteriasData(2);

  beforeEach(() => {
    jest.clearAllMocks();
    useCriteriaStore.setState({
      criterias: null,
      selectedCriteria: null,
      isLoading: false,
      error: null,
    });
  });

  it("should set criterias", () => {
    useCriteriaStore.getState().setCriterias(mockCriterias);

    expect(useCriteriaStore.getState().criterias).toEqual(mockCriterias);
  });

  it("should get criterias and update the store", async () => {
    (getCriteriasService as jest.Mock).mockResolvedValueOnce(mockCriterias);

    const criterias = await useCriteriaStore.getState().getCriterias();

    expect(criterias).toEqual(mockCriterias);
    expect(useCriteriaStore.getState().criterias).toEqual(mockCriterias);
    expect(useCriteriaStore.getState().isLoading).toBe(false);
  });

  it("should get criteria by id", async () => {
    (getCriteriaByIdService as jest.Mock).mockResolvedValueOnce(
      mockCriterias[0],
    );

    const criteria = await useCriteriaStore.getState().getCriteriaById("1");

    expect(criteria).toEqual(mockCriterias[0]);
    expect(getCriteriaByIdService).toHaveBeenCalledWith("1");
  });

  it("should create a criteria", async () => {
    (createCriteriaService as jest.Mock).mockResolvedValueOnce(
      mockCriterias[0],
    );

    const criteria = await useCriteriaStore
      .getState()
      .createCriteria(mockCriterias[0]);

    expect(criteria).toEqual(mockCriterias[0]);
    expect(createCriteriaService).toHaveBeenCalledWith(mockCriterias[0]);
  });

  it("should edit a criteria", async () => {
    (editCriteriaService as jest.Mock).mockResolvedValueOnce(mockCriterias[0]);

    const criteria = await useCriteriaStore
      .getState()
      .editCriteria(mockCriterias[0], "1");

    expect(criteria).toEqual(mockCriterias[0]);
    expect(editCriteriaService).toHaveBeenCalledWith(mockCriterias[0], "1");
  });

  it("should delete a criteria", async () => {
    (deleteCriteriaService as jest.Mock).mockResolvedValueOnce(
      mockCriterias[0],
    );

    const criteria = await useCriteriaStore.getState().deleteCriteria("1");

    expect(criteria).toEqual(mockCriterias[0]);
    expect(deleteCriteriaService).toHaveBeenCalledWith("1");
  });

  it("should set an error when criteria data is not provided", async () => {
    const criteria = await useCriteriaStore.getState().deleteCriteria("");

    expect(criteria).toBeNull();
    expect(useCriteriaStore.getState().error).toBe(CRITERIA_NOT_PROVIDED);
  });

  it("should set an error when a service fails", async () => {
    (getCriteriasService as jest.Mock).mockRejectedValueOnce(
      new Error("Mock error"),
    );

    const criterias = await useCriteriaStore.getState().getCriterias();

    expect(criterias).toBeNull();
    expect(useCriteriaStore.getState().error).toBe("Mock error");
  });
});
