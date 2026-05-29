import {render, screen} from "@testing-library/react";
import {SampleTypeTableActionButtons} from "./SampleTypeActions";
import {SampleType, SampleTypeStore} from "../../../../entities/sampleType";
import {SnackBarSeverity} from "../../../../utils/enums";
import {SnackBarStore} from "../../../snackbar/model/types";
import {buildSampleTypesData} from "../../../../shared/test/builders";

const mockSampleTypes: SampleType[] = buildSampleTypesData(2);

let mockSampleTypeStoreState: SampleTypeStore;
let mockSnackBarStoreState: SnackBarStore;
const mockSetIsSideSectionOpen = jest.fn();
const mockSetSideSectionTitle = jest.fn();

jest.mock("../../../../entities/sampleType", () => ({
  selectIsLoadingSampleTypes: (store: SampleTypeStore) => store.isLoading,
  selectGetSampleTypeById: (store: SampleTypeStore) => store.getSampleTypeById,
  selectSetSelectedSampleType: (store: SampleTypeStore) =>
    store.setSelectedSampleType,
  selectDeleteSampleType: (store: SampleTypeStore) => store.deleteSampleType,
  selectGetSampleTypes: (store: SampleTypeStore) => store.getSampleTypes,
  selectError: (store: SampleTypeStore) => store.error,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSampleTypeStore: (selector: any) => selector(mockSampleTypeStoreState),
}));

jest.mock("../../../sideSection", () => ({
  selectSetIsSideSectionOpen: () => mockSetIsSideSectionOpen,
  selectSetSideSectionTitle: () => mockSetSideSectionTitle,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSideSectionStore: (selector: any) => selector({}),
}));

jest.mock("../../../snackbar", () => ({
  selectShowSnackBarMessage: (store: SnackBarStore) =>
    store.showSnackBarMessage,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSnackBarStore: (selector: any) => selector(mockSnackBarStoreState),
}));

describe("SampleTypeTableActionButtons", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSampleTypeStoreState = {
      sampleTypes: mockSampleTypes,
      selectedSampleType: mockSampleTypes[0],
      isLoading: false,
      error: null,
      setSampleTypes: jest.fn(),
      setSelectedSampleType: jest.fn(),
      getSampleTypes: jest.fn().mockResolvedValue(mockSampleTypes),
      getSampleTypeById: jest.fn().mockResolvedValue(mockSampleTypes[0]),
      createSampleType: jest.fn().mockResolvedValue(mockSampleTypes[0]),
      editSampleType: jest.fn().mockResolvedValue(mockSampleTypes[0]),
      deleteSampleType: jest.fn().mockResolvedValue(mockSampleTypes[0]),
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

  it("should render the sample type action buttons successfully", () => {
    render(<SampleTypeTableActionButtons sampleTypeId="1" />);

    expect(screen.getByText("View")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("should render loading spinner when sample types are loading", () => {
    mockSampleTypeStoreState.isLoading = true;

    render(<SampleTypeTableActionButtons sampleTypeId="1" />);

    expect(screen.queryByText("View")).not.toBeInTheDocument();
    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
