import {buildAnalytesData} from "../../../shared/test/builders";
import {ANALYTE_NOT_PROVIDED} from "../../../utils/constants";
import {
  createAnalyteService,
  deleteAnalyteService,
  editAnalyteService,
  getAnalyteByIdService,
  getAnalytesByTestTypeIdService,
  getAnalytesService,
} from "../api/analyteService";
import {useAnalyteStore} from "./store";

jest.mock("../api/analyteService", () => ({
  getAnalytesService: jest.fn(),
  getAnalyteByIdService: jest.fn(),
  getAnalytesByTestTypeIdService: jest.fn(),
  createAnalyteService: jest.fn(),
  editAnalyteService: jest.fn(),
  deleteAnalyteService: jest.fn(),
}));

describe("useAnalyteStore", () => {
  const mockAnalytes = buildAnalytesData(2);

  beforeEach(() => {
    jest.clearAllMocks();
    useAnalyteStore.setState({
      analytes: null,
      selectedAnalyte: null,
      isLoading: false,
      error: null,
    });
  });

  it("should set analytes", () => {
    useAnalyteStore.getState().setAnalytes(mockAnalytes);

    expect(useAnalyteStore.getState().analytes).toEqual(mockAnalytes);
  });

  it("should get analytes and update the store", async () => {
    (getAnalytesService as jest.Mock).mockResolvedValueOnce(mockAnalytes);

    const analytes = await useAnalyteStore.getState().getAnalytes();

    expect(analytes).toEqual(mockAnalytes);
    expect(useAnalyteStore.getState().analytes).toEqual(mockAnalytes);
    expect(useAnalyteStore.getState().isLoading).toBe(false);
  });

  it("should get analyte by id", async () => {
    (getAnalyteByIdService as jest.Mock).mockResolvedValueOnce(mockAnalytes[0]);

    const analyte = await useAnalyteStore.getState().getAnalyteById("1");

    expect(analyte).toEqual(mockAnalytes[0]);
    expect(getAnalyteByIdService).toHaveBeenCalledWith("1");
  });

  it("should get analytes by test type id", async () => {
    (getAnalytesByTestTypeIdService as jest.Mock).mockResolvedValueOnce(
      mockAnalytes,
    );

    const analytes = await useAnalyteStore
      .getState()
      .getAnalytesByTestTypeId("test-type-id");

    expect(analytes).toEqual(mockAnalytes);
    expect(getAnalytesByTestTypeIdService).toHaveBeenCalledWith("test-type-id");
  });

  it("should create an analyte", async () => {
    (createAnalyteService as jest.Mock).mockResolvedValueOnce(mockAnalytes[0]);

    const analyte = await useAnalyteStore
      .getState()
      .createAnalyte(mockAnalytes[0]);

    expect(analyte).toEqual(mockAnalytes[0]);
    expect(createAnalyteService).toHaveBeenCalledWith(mockAnalytes[0]);
  });

  it("should edit an analyte", async () => {
    (editAnalyteService as jest.Mock).mockResolvedValueOnce(mockAnalytes[0]);

    const analyte = await useAnalyteStore
      .getState()
      .editAnalyte(mockAnalytes[0], "1");

    expect(analyte).toEqual(mockAnalytes[0]);
    expect(editAnalyteService).toHaveBeenCalledWith(mockAnalytes[0], "1");
  });

  it("should delete an analyte", async () => {
    (deleteAnalyteService as jest.Mock).mockResolvedValueOnce(mockAnalytes[0]);

    const analyte = await useAnalyteStore.getState().deleteAnalyte("1");

    expect(analyte).toEqual(mockAnalytes[0]);
    expect(deleteAnalyteService).toHaveBeenCalledWith("1");
  });

  it("should set an error when analyte data is not provided", async () => {
    const analyte = await useAnalyteStore.getState().deleteAnalyte("");

    expect(analyte).toBeNull();
    expect(useAnalyteStore.getState().error).toBe(ANALYTE_NOT_PROVIDED);
  });

  it("should set an error when a service fails", async () => {
    (getAnalytesService as jest.Mock).mockRejectedValueOnce(
      new Error("Mock error"),
    );

    const analytes = await useAnalyteStore.getState().getAnalytes();

    expect(analytes).toBeNull();
    expect(useAnalyteStore.getState().error).toBe("Mock error");
  });
});
