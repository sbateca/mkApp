import {render, screen, waitFor} from "@testing-library/react";

import {SampleTypesContent} from "./SampleTypesContent";
import {SampleType, SampleTypeStore} from "../../../../entities/sampleType";
import {SideSectionStore} from "../../../sideSection/model/types";
import {buildSampleTypesData} from "../../../../shared/test/builders";

const mockSampleTypes: SampleType[] = buildSampleTypesData(1, {
  id: "sample-type-id",
  name: "Water sample",
});

let mockSampleTypeStoreState: SampleTypeStore;
let mockSideSectionStoreState: SideSectionStore;

jest.mock("../../../../entities/sampleType", () => ({
  selectGetSampleTypes: (store: SampleTypeStore) => store.getSampleTypes,
  selectIsLoadingSampleTypes: (store: SampleTypeStore) => store.isLoading,
  selectSelectedSampleType: (store: SampleTypeStore) =>
    store.selectedSampleType,
  selectSetSelectedSampleType: (store: SampleTypeStore) =>
    store.setSelectedSampleType,
  selectSetSampleTypes: (store: SampleTypeStore) => store.setSampleTypes,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSampleTypeStore: (selector: any) => selector(mockSampleTypeStoreState),
}));

jest.mock("../../../../features/sideSection/model/store", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSideSectionStore: (selector: any) => selector(mockSideSectionStoreState),
}));

jest.mock("../../../sideSection", () => ({
  selectIsSideSectionOpen: (store: SideSectionStore) => store.isSideSectionOpen,
  selectSetIsSideSectionOpen: (store: SideSectionStore) =>
    store.setIsSideSectionOpen,
  selectSetSideSectionTitle: (store: SideSectionStore) =>
    store.setSideSectionTitle,
  useSideSection: () => ({
    isSideSectionOpen: mockSideSectionStoreState.isSideSectionOpen,
    sideSectionTitle: mockSideSectionStoreState.sideSectionTitle,
    onCloseSideSection: jest.fn(),
    onOpenSideSection: jest.fn(),
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSideSectionStore: (selector: any) => selector(mockSideSectionStoreState),
}));

jest.mock("../../../../widgets/SampleTypeDetail", () => ({
  SampleTypeDetail: () => (
    <div data-testid="sampleTypeDetail">Sample Type Detail Component</div>
  ),
}));

jest.mock("../../sampleTypeActions", () => ({
  SampleTypeTableActionButtons: () => <button>Actions</button>,
}));

describe("SampleTypesContent", () => {
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
    mockSideSectionStoreState = {
      isSideSectionOpen: true,
      sideSectionTitle: "Mock title",
      setIsSideSectionOpen: jest.fn(),
      setSideSectionTitle: jest.fn(),
    };
  });

  it("should render sample type rows successfully", async () => {
    render(<SampleTypesContent />);

    await waitFor(() => {
      expect(screen.getByText("sample-type-id")).toBeInTheDocument();
      expect(screen.getByText("Water sample")).toBeInTheDocument();
    });
  });

  it("should render no data text when no sample types are returned", async () => {
    mockSampleTypeStoreState.getSampleTypes = jest.fn().mockResolvedValue([]);

    render(<SampleTypesContent />);

    await waitFor(() => {
      expect(screen.getByText("No records to display")).toBeInTheDocument();
    });
  });

  it("should render loading spinner when sample types are loading", () => {
    mockSampleTypeStoreState.isLoading = true;
    mockSampleTypeStoreState.getSampleTypes = jest.fn(
      () => new Promise(() => {}),
    );

    render(<SampleTypesContent />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
