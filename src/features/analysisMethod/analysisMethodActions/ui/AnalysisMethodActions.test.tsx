import {render, screen} from "@testing-library/react";
import {
  AnalysisMethod,
  AnalysisMethodStore,
} from "../../../../entities/analysisMethod";
import {SnackBarSeverity} from "../../../../utils/enums";
import {SnackBarStore} from "../../../snackbar/model/types";
import {buildAnalysisMethodsData} from "../../../../shared/test/builders/analisysMethodBuilder";
import {AnalysisMethodTableActionButtons} from "./AnalysisMethodActions";

const mockAnalysisMethods: AnalysisMethod[] = buildAnalysisMethodsData(2);
let mockAnalysisMethodStoreState: AnalysisMethodStore;
let mockSnackBarStoreState: SnackBarStore;

jest.mock("../../../../entities/analysisMethod", () => ({
  selectIsLoadingAnalysisMethods: (store: AnalysisMethodStore) =>
    store.isLoading,
  selectGetAnalysisMethodsById: (store: AnalysisMethodStore) =>
    store.getAnalysisMethodById,
  selectSetSelectedAnalysisMethod: (store: AnalysisMethodStore) =>
    store.setSelectedAnalysisMethod,
  selectDeleteAnalysisMethod: (store: AnalysisMethodStore) =>
    store.deleteAnalysisMethod,
  selectGetAnalysisMethods: (store: AnalysisMethodStore) =>
    store.getAnalysisMethods,
  selectError: (store: AnalysisMethodStore) => store.error,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useAnalysisMethodsStore: (selector: any) =>
    selector(mockAnalysisMethodStoreState),
}));

jest.mock("../../../sideSection", () => ({
  useSideSection: () => ({
    onOpenSideSection: jest.fn(),
  }),
}));

jest.mock("../../../snackbar", () => ({
  selectShowSnackBarMessage: (store: SnackBarStore) =>
    store.showSnackBarMessage,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSnackBarStore: (selector: any) => selector(mockSnackBarStoreState),
}));

describe("AnalysisMethodTableActionButtons", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAnalysisMethodStoreState = {
      analysisMethods: mockAnalysisMethods,
      selectedAnalysisMethod: mockAnalysisMethods[0],
      isLoading: false,
      error: null,
      setAnalysisMethods: jest.fn(),
      setSelectedAnalysisMethod: jest.fn(),
      getAnalysisMethods: jest.fn().mockResolvedValue(mockAnalysisMethods),
      getAnalysisMethodById: jest
        .fn()
        .mockResolvedValue(mockAnalysisMethods[0]),
      createAnalysisMethod: jest.fn().mockResolvedValue(mockAnalysisMethods[0]),
      editAnalysisMethod: jest.fn().mockResolvedValue(mockAnalysisMethods[0]),
      deleteAnalysisMethod: jest.fn().mockResolvedValue(mockAnalysisMethods[0]),
    };
    mockSnackBarStoreState = {
      isSnackBarOpen: false,
      snackBarText: "",
      snackBarSeverity: SnackBarSeverity.INFO,
      callbackFunction: jest.fn(),
      showSnackBarMessage: jest.fn(),
      closeSnackBar: jest.fn(),
    };
  });

  it("should render the analysis method action buttons successfully", () => {
    render(<AnalysisMethodTableActionButtons analysisMethodId="1" />);

    expect(screen.getByText("View")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("should render loading spinner when analysis methods are loading", () => {
    mockAnalysisMethodStoreState.isLoading = true;

    render(<AnalysisMethodTableActionButtons analysisMethodId="1" />);

    expect(screen.queryByText("View")).not.toBeInTheDocument();
    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
