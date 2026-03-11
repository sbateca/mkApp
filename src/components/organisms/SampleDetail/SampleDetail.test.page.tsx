import {render, screen} from "@testing-library/react";

import {SampleDetail} from "./SampleDetail";
import dayjs from "dayjs";
import {DATEPICKER_FORMAT} from "../../../utils/constants";
import {SampleType} from "../../../model";
import {
  buildClientsData,
  buildSamplesData,
  buildSampleTypesData,
} from "../../../shared/test/builders";
import {buildFormData} from "../../../shared/test/builders/formDataBuilder";
import {ClientsStore} from "../../../features/clients/model/types";
import {SampleTypeStore} from "../../../features/sampleType/model/types";
import {SnackBarSeverity} from "../../../utils/enums";
import {SideSectionStore} from "../../../features/sideSection/model/types";
import {SnackBarStore} from "../../../features/snackbar/model/types";

const today = dayjs();
const RENDERED_FORMAT_DATE = "MM/DD/YYYY";
const mockSampleTypes: SampleType[] = buildSampleTypesData(1);
const mockClients = buildClientsData(2);
const mockSamples = buildSamplesData(1, {
  clientId: mockClients[0].id,
  sampleTypeId: mockSampleTypes[0].id,
});
const mockForm = buildFormData({
  sampleCode: mockSamples[0].sampleCode,
  sampleType: mockSampleTypes[0].id,
  client: mockClients[0].id,
  getSampleDate: today.subtract(3, "day").format(DATEPICKER_FORMAT),
  receptionDate: today.subtract(2, "day").format(DATEPICKER_FORMAT),
  analysisDate: today.subtract(1, "day").format(DATEPICKER_FORMAT),
  sampleLocation: mockSamples[0].sampleLocation,
  responsable: mockSamples[0].responsable,
});
const mockDefaultForm = buildFormData({
  sampleCode: "",
  sampleType: "",
  client: "",
  getSampleDate: "",
  receptionDate: "",
  analysisDate: "",
  sampleLocation: "",
  responsable: "",
});

export const mockData = {
  readonly: false,
  samples: mockSamples,
  clients: mockClients,
  sampleTypes: mockSampleTypes,
  form: mockForm,
  defaulForm: mockDefaultForm,
  expectedData: {
    sampleCode: mockSamples[0].sampleCode,
    sampleType: mockSampleTypes[0].name,
    client: mockClients[0].name,
    getSampleDate: today.format(RENDERED_FORMAT_DATE),
    receptionDate: today.format(RENDERED_FORMAT_DATE),
    analysisDate: today.format(RENDERED_FORMAT_DATE),
    sampleLocation: mockSamples[0].sampleLocation,
    responsable: mockSamples[0].responsable,
  },
};

const mockSideSectionStoreState: SideSectionStore = {
  isSideSectionOpen: true,
  sideSectionTitle: "Mock title",
  setIsSideSectionOpen: jest.fn(),
  setSideSectionTitle: jest.fn(),
};

let mockClientStoreState: ClientsStore;
let mockSampleTypeStoreState: SampleTypeStore;
let mockSnackBarStoreState: SnackBarStore;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let mockUseForm: any;

jest.mock("../../../config/EnvManager", () => ({
  default: {
    BACKEND_URL: "http://example.com/api",
  },
}));

jest.mock("../../../utils/hooks", () => ({
  __esModule: true,
  useForm: jest.fn(() => mockUseForm),
}));

jest.mock("../../../features/clients/model/store", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useClientStore: (selector: any) => selector(mockClientStoreState),
}));

jest.mock("../../../features/sampleType/model/store", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSampleTypeStore: (selector: any) => selector(mockSampleTypeStoreState),
}));

jest.mock("../../../features/sideSection/model/store", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSideSectionStore: (selector: any) => selector(mockSideSectionStoreState),
}));

jest.mock("../../../features/snackbar/model/store", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSnackBarStore: (selector: any) => selector(mockSnackBarStoreState),
}));

export const renderSampleDetail = () => {
  mockClientStoreState = {
    clients: mockData.clients,
    selectedClient: mockData.clients[0],
    setSelectedClient: jest.fn(),
    getClients: jest.fn().mockReturnValue(mockData.clients),
    getClientById: jest.fn(),
    isLoading: false,
    error: null,
  };
  mockSampleTypeStoreState = {
    sampleTypes: mockSampleTypes,
    selectedSampleType: mockSampleTypes[0],
    isLoading: false,
    error: null,
    setSampleTypes: jest.fn(),
    setSelectedSampleType: jest.fn(),
    getSampleTypes: jest.fn().mockReturnValue(mockSampleTypes),
    getSampleTypeById: jest.fn().mockReturnValue(mockSampleTypes[0]),
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
    form: mockForm,
    setForm: jest.fn(),
    handleChange: jest.fn(),
    handleDateChange: jest.fn(),
    cleanForm: jest.fn(),
    formFieldsErrors: {},
    handleSelectChange: jest.fn(),
    handleAutoCompleteChange: jest.fn(),
    getTextFieldHelperText: jest.fn(),
    setFormFieldsValidationFunctions: jest.fn(),
    setDefaultFormFieldsValues: jest.fn(),
    isNotValidForm: false,
  };

  render(
    <SampleDetail
      isReadOnlyMode={mockData.readonly}
      setIsReadOnlyMode={() => {}}
    />,
  );

  return {screen};
};
