import {buildAnalysisMethodsData} from "../../../shared/test/builders/analisysMethodBuilder";
import {ANALYSIS_METHOD_NOT_PROVIDED} from "../../../utils/constants";
import {
  createAnalysisMethodService,
  deleteAnalysisMethodService,
  editAnalysisMethodService,
  getAnalysisMethodByIdService,
  getAnalysisMethodService,
} from "../api/analysisMethodService";
import {useAnalysisMethodsStore} from "./store";

jest.mock("../api/analysisMethodService", () => ({
  getAnalysisMethodService: jest.fn(),
  getAnalysisMethodByIdService: jest.fn(),
  createAnalysisMethodService: jest.fn(),
  editAnalysisMethodService: jest.fn(),
  deleteAnalysisMethodService: jest.fn(),
}));

describe("useAnalysisMethodsStore", () => {
  const mockAnalysisMethods = buildAnalysisMethodsData(2);

  beforeEach(() => {
    jest.clearAllMocks();
    useAnalysisMethodsStore.setState({
      analysisMethods: null,
      selectedAnalysisMethod: null,
      isLoading: false,
      error: null,
    });
  });

  it("should set analysis methods", () => {
    useAnalysisMethodsStore.getState().setAnalysisMethods(mockAnalysisMethods);

    expect(useAnalysisMethodsStore.getState().analysisMethods).toEqual(
      mockAnalysisMethods,
    );
  });

  it("should get analysis methods and update the store", async () => {
    (getAnalysisMethodService as jest.Mock).mockResolvedValueOnce(
      mockAnalysisMethods,
    );

    const analysisMethods = await useAnalysisMethodsStore
      .getState()
      .getAnalysisMethods();

    expect(analysisMethods).toEqual(mockAnalysisMethods);
    expect(useAnalysisMethodsStore.getState().analysisMethods).toEqual(
      mockAnalysisMethods,
    );
    expect(useAnalysisMethodsStore.getState().isLoading).toBe(false);
  });

  it("should get analysis method by id", async () => {
    (getAnalysisMethodByIdService as jest.Mock).mockResolvedValueOnce(
      mockAnalysisMethods[0],
    );

    const analysisMethod = await useAnalysisMethodsStore
      .getState()
      .getAnalysisMethodById("1");

    expect(analysisMethod).toEqual(mockAnalysisMethods[0]);
    expect(getAnalysisMethodByIdService).toHaveBeenCalledWith("1");
  });

  it("should create an analysis method", async () => {
    (createAnalysisMethodService as jest.Mock).mockResolvedValueOnce(
      mockAnalysisMethods[0],
    );

    const analysisMethod = await useAnalysisMethodsStore
      .getState()
      .createAnalysisMethod(mockAnalysisMethods[0]);

    expect(analysisMethod).toEqual(mockAnalysisMethods[0]);
    expect(createAnalysisMethodService).toHaveBeenCalledWith(
      mockAnalysisMethods[0],
    );
  });

  it("should edit an analysis method", async () => {
    (editAnalysisMethodService as jest.Mock).mockResolvedValueOnce(
      mockAnalysisMethods[0],
    );

    const analysisMethod = await useAnalysisMethodsStore
      .getState()
      .editAnalysisMethod(mockAnalysisMethods[0], "1");

    expect(analysisMethod).toEqual(mockAnalysisMethods[0]);
    expect(editAnalysisMethodService).toHaveBeenCalledWith(
      mockAnalysisMethods[0],
      "1",
    );
  });

  it("should delete an analysis method", async () => {
    (deleteAnalysisMethodService as jest.Mock).mockResolvedValueOnce(
      mockAnalysisMethods[0],
    );

    const analysisMethod = await useAnalysisMethodsStore
      .getState()
      .deleteAnalysisMethod("1");

    expect(analysisMethod).toEqual(mockAnalysisMethods[0]);
    expect(deleteAnalysisMethodService).toHaveBeenCalledWith("1");
  });

  it("should set an error when analysis method data is not provided", async () => {
    const analysisMethod = await useAnalysisMethodsStore
      .getState()
      .deleteAnalysisMethod("");

    expect(analysisMethod).toBeNull();
    expect(useAnalysisMethodsStore.getState().error).toBe(
      ANALYSIS_METHOD_NOT_PROVIDED,
    );
  });

  it("should set an error when a service fails", async () => {
    (getAnalysisMethodService as jest.Mock).mockRejectedValueOnce(
      new Error("Mock error"),
    );

    const analysisMethods = await useAnalysisMethodsStore
      .getState()
      .getAnalysisMethods();

    expect(analysisMethods).toBeNull();
    expect(useAnalysisMethodsStore.getState().error).toBe("Mock error");
  });
});
