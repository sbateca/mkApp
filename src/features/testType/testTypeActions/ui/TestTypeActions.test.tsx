import {render, screen} from "@testing-library/react";
import {SnackBarSeverity} from "../../../../utils/enums";
import {SnackBarStore} from "../../../snackbar/model/types";
import {TestType, TestTypeStore} from "../../../../entities/testType";
import {TestTypeTableActionButtons} from "./TestTypeActions";

const mockTestTypes: TestType[] = [
  {id: "1", name: "Physical"},
  {id: "2", name: "Microbiological"},
];
let mockTestTypeStoreState: TestTypeStore;
let mockSnackBarStoreState: SnackBarStore;

jest.mock("../../../../entities/testType", () => ({
  selectIsLoadingTestTypes: (store: TestTypeStore) => store.isLoading,
  selectGetTestTypeById: (store: TestTypeStore) => store.getTestTypeById,
  selectSetSelectedTestType: (store: TestTypeStore) =>
    store.setSelectedTestType,
  selectDeleteTestType: (store: TestTypeStore) => store.deleteTestType,
  selectGetTestTypes: (store: TestTypeStore) => store.getTestTypes,
  selectTestTypeError: (store: TestTypeStore) => store.error,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useTestTypeStore: (selector: any) => selector(mockTestTypeStoreState),
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

describe("TestTypeTableActionButtons", () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
  });

  it("should render the test type action buttons successfully", () => {
    render(<TestTypeTableActionButtons testTypeId="1" />);

    expect(screen.getByText("View")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("should render loading spinner when test types are loading", () => {
    mockTestTypeStoreState.isLoading = true;

    render(<TestTypeTableActionButtons testTypeId="1" />);

    expect(screen.queryByText("View")).not.toBeInTheDocument();
    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
