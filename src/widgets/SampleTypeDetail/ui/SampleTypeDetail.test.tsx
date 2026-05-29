import {render, screen} from "@testing-library/react";

import {SampleTypeDetail} from "./SampleTypeDetail";
import {SampleType} from "../../../entities/sampleType/model/SampleType";
import {SampleTypeStore} from "../../../entities/sampleType/model/types";
import {SnackBarSeverity} from "../../../utils/enums";
import {SnackBarStore} from "../../../features/snackbar/model/types";
import {buildSampleTypesData} from "../../../shared/test/builders";

const mockSampleTypes: SampleType[] = buildSampleTypesData(1, {
  name: "Water sample",
});

let mockSampleTypeStoreState: SampleTypeStore;
let mockSnackBarStoreState: SnackBarStore;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let mockUseForm: any;

jest.mock("../../../utils/hooks", () => ({
  __esModule: true,
  useForm: jest.fn(() => mockUseForm),
}));

jest.mock("../../../entities/sampleType/model/store", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSampleTypeStore: (selector: any) => selector(mockSampleTypeStoreState),
}));

jest.mock("../../../entities/sampleType", () => ({
  selectSelectedSampleType: (store: SampleTypeStore) =>
    store.selectedSampleType,
  selectCreateSampleType: (store: SampleTypeStore) => store.createSampleType,
  selectEditSampleType: (store: SampleTypeStore) => store.editSampleType,
  selectGetSampleTypes: (store: SampleTypeStore) => store.getSampleTypes,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSampleTypeStore: (selector: any) => selector(mockSampleTypeStoreState),
}));

jest.mock("../../../features/snackbar/model/store", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSnackBarStore: (selector?: any) =>
    selector ? selector(mockSnackBarStoreState) : mockSnackBarStoreState,
}));

jest.mock("../../../features/sideSection", () => ({
  useSideSection: () => ({
    onCloseSideSection: jest.fn(),
  }),
}));

describe("SampleTypeDetail", () => {
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
    mockUseForm = {
      form: {name: mockSampleTypes[0].name},
      setForm: jest.fn(),
      handleChange: jest.fn(),
      cleanForm: jest.fn(),
      formFieldsErrors: {},
      getTextFieldHelperText: jest.fn(),
      setFormFieldsValidationFunctions: jest.fn(),
      isNotValidForm: false,
    };
  });

  it("should render selected sample type details successfully", () => {
    render(
      <SampleTypeDetail
        isReadOnlyMode
        setIsReadOnlyMode={jest.fn()}
        handleCloseSideSection={jest.fn()}
        sideSectionTitle="Mock title"
        selectedSampleType={mockSampleTypes[0]}
        isLoading={false}
        isLessThanMediumScreen={false}
      />,
    );

    expect(screen.getByText("Mock title")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Water sample")).toBeInTheDocument();
    expect(screen.getByText("Edit sample type")).toBeInTheDocument();
  });

  it("should render loading spinner when sample type detail is loading", () => {
    render(
      <SampleTypeDetail
        isReadOnlyMode
        setIsReadOnlyMode={jest.fn()}
        handleCloseSideSection={jest.fn()}
        sideSectionTitle="Mock title"
        selectedSampleType={mockSampleTypes[0]}
        isLoading
        isLessThanMediumScreen={false}
      />,
    );

    expect(screen.getAllByRole("progressbar")).not.toHaveLength(0);
  });
});
