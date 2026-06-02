import {render, screen} from "@testing-library/react";

import {Analyte, AnalyteStore} from "../../../entities/analyte";
import {SnackBarSeverity} from "../../../utils/enums";
import {SnackBarStore} from "../../../features/snackbar/model/types";
import {TestTypeStore} from "../../../entities/testType/model/types";
import {buildAnalytesData} from "../../../shared/test/builders";
import {AnalyteDetail} from "./AnalyteDetail";

const mockTestTypes = [
  {
    id: "test-type-id",
    name: "Metals",
  },
];
const mockAnalytes: Analyte[] = buildAnalytesData(1, {
  name: "Lead",
  testType: mockTestTypes[0],
});

let mockAnalyteStoreState: AnalyteStore;
let mockTestTypeStoreState: TestTypeStore;
let mockSnackBarStoreState: SnackBarStore;
let mockIsReadOnlyMode = true;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let mockUseForm: any;

jest.mock("../../../utils/hooks", () => ({
  __esModule: true,
  useForm: jest.fn(() => mockUseForm),
}));

jest.mock("../../../entities/analyte", () => ({
  selectSelectedAnaliye: (store: AnalyteStore) => store.selectedAnalyte,
  selectCreateAnalyte: (store: AnalyteStore) => store.createAnalyte,
  selectEditAnalyte: (store: AnalyteStore) => store.editAnalyte,
  selectGetAnalytes: (store: AnalyteStore) => store.getAnalytes,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useAnalyteStore: (selector: any) => selector(mockAnalyteStoreState),
}));

jest.mock("../../../entities/testType", () => ({
  selectTestTypes: (store: TestTypeStore) => store.testTypes,
  selectGetTestTypes: (store: TestTypeStore) => store.getTestTypes,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useTestTypeStore: (selector: any) => selector(mockTestTypeStoreState),
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

describe("AnalyteDetail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsReadOnlyMode = true;
    mockAnalyteStoreState = {
      analytes: mockAnalytes,
      selectedAnalyte: mockAnalytes[0],
      isLoading: false,
      error: null,
      setAnalytes: jest.fn(),
      setSelectedAnalyte: jest.fn(),
      getAnalytes: jest.fn().mockResolvedValue(mockAnalytes),
      getAnalyteById: jest.fn().mockResolvedValue(mockAnalytes[0]),
      getAnalytesByTestTypeId: jest.fn().mockResolvedValue(mockAnalytes),
      createAnalyte: jest.fn().mockResolvedValue(mockAnalytes[0]),
      editAnalyte: jest.fn().mockResolvedValue(mockAnalytes[0]),
      deleteAnalyte: jest.fn().mockResolvedValue(mockAnalytes[0]),
    };
    mockTestTypeStoreState = {
      testTypes: mockTestTypes,
      selectedTestType: mockTestTypes[0],
      isLoading: false,
      error: null,
      setTestTypes: jest.fn(),
      setSelectedTestType: jest.fn(),
      getTestTypes: jest.fn().mockResolvedValue(mockTestTypes),
      getTestTypeById: jest.fn().mockResolvedValue(mockTestTypes[0]),
      createTestType: jest.fn().mockResolvedValue(mockTestTypes[0]),
      editTestType: jest.fn().mockResolvedValue(mockTestTypes[0]),
      deleteTestType: jest.fn().mockResolvedValue(undefined),
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
      form: {name: mockAnalytes[0].name, testType: mockTestTypes[0].id},
      setForm: jest.fn(),
      handleChange: jest.fn(),
      handleAutoCompleteChange: jest.fn(),
      cleanForm: jest.fn(),
      formFieldsErrors: {},
      getTextFieldHelperText: jest.fn(),
      setFormFieldsValidationFunctions: jest.fn(),
      isNotValidForm: false,
    };
  });

  it("should render selected analyte details successfully", () => {
    render(
      <AnalyteDetail
        handleCloseSideSection={jest.fn()}
        selectedAnalyte={mockAnalytes[0]}
        isLoading={false}
        isLessThanMediumScreen={false}
      />,
    );

    expect(screen.getByText("Mock title")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Lead")).toBeInTheDocument();
    expect(screen.getByText("Edit analyte")).toBeInTheDocument();
  });

  it("should render loading spinner when analyte detail is loading", () => {
    render(
      <AnalyteDetail
        handleCloseSideSection={jest.fn()}
        selectedAnalyte={mockAnalytes[0]}
        isLoading
        isLessThanMediumScreen={false}
      />,
    );

    expect(screen.getAllByRole("progressbar")).not.toHaveLength(0);
  });
});
