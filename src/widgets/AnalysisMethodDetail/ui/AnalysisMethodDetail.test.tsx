import {render, screen} from "@testing-library/react";

import {
  AnalysisMethod,
  AnalysisMethodStore,
} from "../../../entities/analysisMethod";
import {SnackBarSeverity} from "../../../utils/enums";
import {SnackBarStore} from "../../../features/snackbar/model/types";
import {buildAnalysisMethodsData} from "../../../shared/test/builders/analisysMethodBuilder";
import {AnalysisMethodDetail} from "./AnalysisMethodDetail";

const mockAnalysisMethods: AnalysisMethod[] = buildAnalysisMethodsData(1, {
  name: "EPA 200.8",
});

let mockAnalysisMethodStoreState: AnalysisMethodStore;
let mockSnackBarStoreState: SnackBarStore;
let mockIsReadOnlyMode = true;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let mockUseForm: any;

jest.mock("../../../utils/hooks", () => ({
  __esModule: true,
  useForm: jest.fn(() => mockUseForm),
}));

jest.mock("../../../entities/analysisMethod", () => ({
  selectSelectedAnalysisMethod: (store: AnalysisMethodStore) =>
    store.selectedAnalysisMethod,
  selectCreateAnalysisMethod: (store: AnalysisMethodStore) =>
    store.createAnalysisMethod,
  selectEditAnalysisMethod: (store: AnalysisMethodStore) =>
    store.editAnalysisMethod,
  selectGetAnalysisMethods: (store: AnalysisMethodStore) =>
    store.getAnalysisMethods,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useAnalysisMethodsStore: (selector: any) =>
    selector(mockAnalysisMethodStoreState),
}));

jest.mock("../../../features/snackbar", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSnackBarStore: (selector?: any) =>
    selector ? selector(mockSnackBarStoreState) : mockSnackBarStoreState,
}));

jest.mock("../../../features/sideSection", () => ({
  useSideSection: () => ({
    onCloseSideSection: jest.fn(),
    sideSectionTitle: "Mock title",
  }),
}));

jest.mock("../../../features/readOnlyMode", () => ({
  useReadOnlyMode: () => ({
    isReadOnlyMode: mockIsReadOnlyMode,
    setIsReadOnlyMode: jest.fn(),
    handleSwitchReadOnlyMode: jest.fn(),
  }),
}));

describe("AnalysisMethodDetail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsReadOnlyMode = true;
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
    mockUseForm = {
      form: {name: mockAnalysisMethods[0].name},
      setForm: jest.fn(),
      handleChange: jest.fn(),
      cleanForm: jest.fn(),
      formFieldsErrors: {},
      getTextFieldHelperText: jest.fn(),
      setFormFieldsValidationFunctions: jest.fn(),
      isNotValidForm: false,
    };
  });

  it("should render selected analysis method details successfully", () => {
    render(
      <AnalysisMethodDetail
        handleCloseSideSection={jest.fn()}
        selectedAnalysisMethod={mockAnalysisMethods[0]}
        isLoading={false}
        isLessThanMediumScreen={false}
      />,
    );

    expect(screen.getByText("Mock title")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
    expect(screen.getByDisplayValue("EPA 200.8")).toBeInTheDocument();
    expect(screen.getByText("Edit analysis method")).toBeInTheDocument();
  });

  it("should render loading spinner when analysis method detail is loading", () => {
    render(
      <AnalysisMethodDetail
        handleCloseSideSection={jest.fn()}
        selectedAnalysisMethod={mockAnalysisMethods[0]}
        isLoading
        isLessThanMediumScreen={false}
      />,
    );

    expect(screen.getAllByRole("progressbar")).not.toHaveLength(0);
  });
});
