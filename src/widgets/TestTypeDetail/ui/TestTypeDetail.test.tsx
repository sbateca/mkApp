import {render, screen} from "@testing-library/react";

import {SnackBarSeverity} from "../../../utils/enums";
import {SnackBarStore} from "../../../features/snackbar/model/types";
import {TestType, TestTypeStore} from "../../../entities/testType";
import {TestTypeDetail} from "./TestTypeDetail";

const mockTestTypes: TestType[] = [{id: "1", name: "Physical"}];

let mockTestTypeStoreState: TestTypeStore;
let mockSnackBarStoreState: SnackBarStore;
let mockIsReadOnlyMode = true;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let mockUseForm: any;

jest.mock("../../../utils/hooks", () => ({
  __esModule: true,
  useForm: jest.fn(() => mockUseForm),
}));

jest.mock("../../../entities/testType", () => ({
  selectSelectedTestType: (store: TestTypeStore) => store.selectedTestType,
  selectCreateTestType: (store: TestTypeStore) => store.createTestType,
  selectEditTestType: (store: TestTypeStore) => store.editTestType,
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

describe("TestTypeDetail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsReadOnlyMode = true;
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
      deleteTestType: jest.fn().mockResolvedValue(mockTestTypes[0]),
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
      form: {name: mockTestTypes[0].name},
      setForm: jest.fn(),
      handleChange: jest.fn(),
      cleanForm: jest.fn(),
      formFieldsErrors: {},
      getTextFieldHelperText: jest.fn(),
      setFormFieldsValidationFunctions: jest.fn(),
      isNotValidForm: false,
    };
  });

  it("should render selected test type details successfully", () => {
    render(
      <TestTypeDetail
        handleCloseSideSection={jest.fn()}
        selectedTestType={mockTestTypes[0]}
        isLoading={false}
        isLessThanMediumScreen={false}
      />,
    );

    expect(screen.getByText("Mock title")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Physical")).toBeInTheDocument();
    expect(screen.getByText("Edit test type")).toBeInTheDocument();
  });

  it("should render loading spinner when test type detail is loading", () => {
    render(
      <TestTypeDetail
        handleCloseSideSection={jest.fn()}
        selectedTestType={mockTestTypes[0]}
        isLoading
        isLessThanMediumScreen={false}
      />,
    );

    expect(screen.getAllByRole("progressbar")).not.toHaveLength(0);
  });
});
