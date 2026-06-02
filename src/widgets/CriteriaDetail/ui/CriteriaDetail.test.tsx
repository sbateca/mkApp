import {render, screen} from "@testing-library/react";

import {Criteria, CriteriaStore} from "../../../entities/criteria";
import {SnackBarSeverity} from "../../../utils/enums";
import {SnackBarStore} from "../../../features/snackbar/model/types";
import {buildCriteriasData} from "../../../shared/test/builders/criteriaBuilder";
import {CriteriaDetail} from "./CriteriaDetail";

const mockCriterias: Criteria[] = buildCriteriasData(1, {
  name: "EPA Limit",
});

let mockCriteriaStoreState: CriteriaStore;
let mockSnackBarStoreState: SnackBarStore;
let mockIsReadOnlyMode = true;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let mockUseForm: any;

jest.mock("../../../utils/hooks", () => ({
  __esModule: true,
  useForm: jest.fn(() => mockUseForm),
}));

jest.mock("../../../entities/criteria", () => ({
  selectSelectedCriteria: (store: CriteriaStore) => store.selectedCriteria,
  selectCreateCriteria: (store: CriteriaStore) => store.createCriteria,
  selectEditCriteria: (store: CriteriaStore) => store.editCriteria,
  selectGetCriterias: (store: CriteriaStore) => store.getCriterias,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useCriteriaStore: (selector: any) => selector(mockCriteriaStoreState),
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

describe("CriteriaDetail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsReadOnlyMode = true;
    mockCriteriaStoreState = {
      criterias: mockCriterias,
      selectedCriteria: mockCriterias[0],
      isLoading: false,
      error: null,
      setCriterias: jest.fn(),
      setSelectedCriteria: jest.fn(),
      getCriterias: jest.fn().mockResolvedValue(mockCriterias),
      getCriteriaById: jest.fn().mockResolvedValue(mockCriterias[0]),
      createCriteria: jest.fn().mockResolvedValue(mockCriterias[0]),
      editCriteria: jest.fn().mockResolvedValue(mockCriterias[0]),
      deleteCriteria: jest.fn().mockResolvedValue(mockCriterias[0]),
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
      form: {name: mockCriterias[0].name},
      setForm: jest.fn(),
      handleChange: jest.fn(),
      cleanForm: jest.fn(),
      formFieldsErrors: {},
      getTextFieldHelperText: jest.fn(),
      setFormFieldsValidationFunctions: jest.fn(),
      isNotValidForm: false,
    };
  });

  it("should render selected criteria details successfully", () => {
    render(
      <CriteriaDetail
        handleCloseSideSection={jest.fn()}
        selectedCriteria={mockCriterias[0]}
        isLoading={false}
        isLessThanMediumScreen={false}
      />,
    );

    expect(screen.getByText("Mock title")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
    expect(screen.getByDisplayValue("EPA Limit")).toBeInTheDocument();
    expect(screen.getByText("Edit criteria")).toBeInTheDocument();
  });

  it("should render loading spinner when criteria detail is loading", () => {
    render(
      <CriteriaDetail
        handleCloseSideSection={jest.fn()}
        selectedCriteria={mockCriterias[0]}
        isLoading
        isLessThanMediumScreen={false}
      />,
    );

    expect(screen.getAllByRole("progressbar")).not.toHaveLength(0);
  });
});
