import {act, renderHook} from "@testing-library/react";

import {useViewSampleType} from "./viewSampleType";
import {SampleType, SampleTypeStore} from "../../../../entities/sampleType";
import {SideSectionStore} from "../../../sideSection/model/types";
import {buildSampleTypesData} from "../../../../shared/test/builders";
import {SAMPLE_TYPE_DETAILS_TITLE_TEXT} from "../../../../utils/constants";

const mockSampleTypes: SampleType[] = buildSampleTypesData(1);

let mockSampleTypeStoreState: SampleTypeStore;
let mockSideSectionStoreState: SideSectionStore;

jest.mock("../../../../entities/sampleType", () => ({
  selectGetSampleTypeById: (store: SampleTypeStore) => store.getSampleTypeById,
  selectSetSelectedSampleType: (store: SampleTypeStore) =>
    store.setSelectedSampleType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSampleTypeStore: (selector: any) => selector(mockSampleTypeStoreState),
}));

jest.mock("../../../sideSection", () => ({
  selectSetIsSideSectionOpen: (store: SideSectionStore) =>
    store.setIsSideSectionOpen,
  selectSetSideSectionTitle: (store: SideSectionStore) =>
    store.setSideSectionTitle,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSideSectionStore: (selector: any) => selector(mockSideSectionStoreState),
}));

describe("useViewSampleType", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSampleTypeStoreState = {
      sampleTypes: mockSampleTypes,
      selectedSampleType: null,
      isLoading: false,
      error: null,
      setSampleTypes: jest.fn(),
      setSelectedSampleType: jest.fn(),
      getSampleTypes: jest.fn(),
      getSampleTypeById: jest.fn().mockResolvedValue(mockSampleTypes[0]),
      createSampleType: jest.fn(),
      editSampleType: jest.fn(),
      deleteSampleType: jest.fn(),
    };
    mockSideSectionStoreState = {
      isSideSectionOpen: false,
      sideSectionTitle: "",
      setIsSideSectionOpen: jest.fn(),
      setSideSectionTitle: jest.fn(),
    };
  });

  it("should load the sample type and open the side section", async () => {
    const {result} = renderHook(() => useViewSampleType());

    await act(async () => {
      await result.current.viewSampleType(mockSampleTypes[0].id);
    });

    expect(mockSampleTypeStoreState.getSampleTypeById).toHaveBeenCalledWith(
      mockSampleTypes[0].id,
    );
    expect(mockSampleTypeStoreState.setSelectedSampleType).toHaveBeenCalledWith(
      mockSampleTypes[0],
    );
    expect(mockSideSectionStoreState.setSideSectionTitle).toHaveBeenCalledWith(
      SAMPLE_TYPE_DETAILS_TITLE_TEXT,
    );
    expect(mockSideSectionStoreState.setIsSideSectionOpen).toHaveBeenCalledWith(
      true,
    );
  });

  it("should not open the side section when the sample type is not found", async () => {
    mockSampleTypeStoreState.getSampleTypeById = jest
      .fn()
      .mockResolvedValue(null);
    const {result} = renderHook(() => useViewSampleType());

    await act(async () => {
      await result.current.viewSampleType("missing-id");
    });

    expect(
      mockSampleTypeStoreState.setSelectedSampleType,
    ).not.toHaveBeenCalled();
    expect(
      mockSideSectionStoreState.setIsSideSectionOpen,
    ).not.toHaveBeenCalled();
  });
});
