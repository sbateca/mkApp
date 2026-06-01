import {act, renderHook} from "@testing-library/react";

import {useCreateSampleType} from "./useCreateSampleType";
import {SampleTypeStore} from "../../../../entities/sampleType";
import {SnackBarSeverity} from "../../../../utils/enums";
import {SnackBarStore} from "../../../snackbar/model/types";
import {
  SAMPLE_TYPE_SUCCESSFULLY_CREATED_TEXT,
  FormProps,
} from "../../../../utils/constants";
import {buildSampleTypeData} from "../../../../shared/test/builders";

let mockSampleTypeStoreState: SampleTypeStore;
let mockSnackBarStoreState: SnackBarStore;
const mockOnCloseSideSection = jest.fn();

jest.mock("../../../../entities/sampleType", () => ({
  selectCreateSampleType: (store: SampleTypeStore) => store.createSampleType,
  selectGetSampleTypes: (store: SampleTypeStore) => store.getSampleTypes,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSampleTypeStore: (selector: any) => selector(mockSampleTypeStoreState),
}));

jest.mock("../../../sideSection", () => ({
  useSideSection: () => ({
    onCloseSideSection: mockOnCloseSideSection,
  }),
}));

jest.mock("../../../snackbar", () => ({
  useSnackBarStore: () => mockSnackBarStoreState,
}));

describe("useCreateSampleType", () => {
  const sampleType = buildSampleTypeData({
    id: "sample-type-id",
    name: "Water sample",
  });
  const form: FormProps = {name: sampleType.name};

  beforeEach(() => {
    jest.clearAllMocks();
    mockSampleTypeStoreState = {
      sampleTypes: [sampleType],
      selectedSampleType: null,
      isLoading: false,
      error: null,
      setSampleTypes: jest.fn(),
      setSelectedSampleType: jest.fn(),
      getSampleTypes: jest.fn().mockResolvedValue([sampleType]),
      getSampleTypeById: jest.fn().mockResolvedValue(sampleType),
      createSampleType: jest.fn().mockResolvedValue(sampleType),
      editSampleType: jest.fn().mockResolvedValue(sampleType),
      deleteSampleType: jest.fn().mockResolvedValue(sampleType),
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

  it("should create a sample type, close side section, and notify", async () => {
    const {result} = renderHook(() => useCreateSampleType(form));

    await act(async () => {
      await result.current.handleCreateSampleType();
    });

    expect(mockSampleTypeStoreState.createSampleType).toHaveBeenCalledWith(
      expect.objectContaining({name: sampleType.name}),
    );
    expect(mockOnCloseSideSection).toHaveBeenCalledTimes(1);
    expect(mockSnackBarStoreState.showSnackBarMessage).toHaveBeenCalledWith(
      SAMPLE_TYPE_SUCCESSFULLY_CREATED_TEXT,
      SnackBarSeverity.SUCCESS,
      mockSampleTypeStoreState.getSampleTypes,
    );
  });

  it("should not close or notify when the sample type is not created", async () => {
    mockSampleTypeStoreState.createSampleType = jest
      .fn()
      .mockResolvedValue(null);
    const {result} = renderHook(() => useCreateSampleType(form));

    await act(async () => {
      await result.current.handleCreateSampleType();
    });

    expect(mockOnCloseSideSection).not.toHaveBeenCalled();
    expect(mockSnackBarStoreState.showSnackBarMessage).not.toHaveBeenCalled();
  });
});
