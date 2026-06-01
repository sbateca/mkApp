import {render, screen} from "@testing-library/react";
import {Analyte, AnalyteStore} from "../../../../entities/analyte";
import {SnackBarSeverity} from "../../../../utils/enums";
import {SnackBarStore} from "../../../snackbar/model/types";
import {buildAnalytesData} from "../../../../shared/test/builders";
import {AnalyteTableActionButtons} from "./AnalyteActions";

const mockAnalytes: Analyte[] = buildAnalytesData(2);
let mockAnalyteStoreState: AnalyteStore;
let mockSnackBarStoreState: SnackBarStore;

jest.mock("../../../../entities/analyte", () => ({
  selectIsLoadingAnalytes: (store: AnalyteStore) => store.isLoading,
  selectGetAnalyteById: (store: AnalyteStore) => store.getAnalyteById,
  selectSetSelectedAnalyte: (store: AnalyteStore) => store.setSelectedAnalyte,
  selectDeleteAnalyte: (store: AnalyteStore) => store.deleteAnalyte,
  selectGetAnalytes: (store: AnalyteStore) => store.getAnalytes,
  selectError: (store: AnalyteStore) => store.error,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useAnalyteStore: (selector: any) => selector(mockAnalyteStoreState),
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

describe("AnalyteTableActionButtons", () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
    mockSnackBarStoreState = {
      isSnackBarOpen: false,
      snackBarText: "",
      snackBarSeverity: SnackBarSeverity.INFO,
      callbackFunction: jest.fn(),
      showSnackBarMessage: jest.fn(),
      closeSnackBar: jest.fn(),
    };
  });

  it("should render the analyte action buttons successfully", () => {
    render(<AnalyteTableActionButtons analyteId="1" />);

    expect(screen.getByText("View")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("should render loading spinner when analytes are loading", () => {
    mockAnalyteStoreState.isLoading = true;

    render(<AnalyteTableActionButtons analyteId="1" />);

    expect(screen.queryByText("View")).not.toBeInTheDocument();
    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
