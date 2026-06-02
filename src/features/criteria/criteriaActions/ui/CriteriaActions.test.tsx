import {render, screen} from "@testing-library/react";
import {Criteria, CriteriaStore} from "../../../../entities/criteria";
import {SnackBarSeverity} from "../../../../utils/enums";
import {SnackBarStore} from "../../../snackbar/model/types";
import {buildCriteriasData} from "../../../../shared/test/builders/criteriaBuilder";
import {CriteriaTableActionButtons} from "./CriteriaActions";

const mockCriterias: Criteria[] = buildCriteriasData(2);
let mockCriteriaStoreState: CriteriaStore;
let mockSnackBarStoreState: SnackBarStore;

jest.mock("../../../../entities/criteria", () => ({
  selectIsLoadingCriterias: (store: CriteriaStore) => store.isLoading,
  selectGetCriteriaById: (store: CriteriaStore) => store.getCriteriaById,
  selectSetSelectedCriteria: (store: CriteriaStore) =>
    store.setSelectedCriteria,
  selectDeleteCriteria: (store: CriteriaStore) => store.deleteCriteria,
  selectGetCriterias: (store: CriteriaStore) => store.getCriterias,
  selectError: (store: CriteriaStore) => store.error,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useCriteriaStore: (selector: any) => selector(mockCriteriaStoreState),
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

describe("CriteriaTableActionButtons", () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
  });

  it("should render the criteria action buttons successfully", () => {
    render(<CriteriaTableActionButtons criteriaId="1" />);

    expect(screen.getByText("View")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("should render loading spinner when criterias are loading", () => {
    mockCriteriaStoreState.isLoading = true;

    render(<CriteriaTableActionButtons criteriaId="1" />);

    expect(screen.queryByText("View")).not.toBeInTheDocument();
    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
