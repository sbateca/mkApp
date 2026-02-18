import {render, screen} from "@testing-library/react";

import {SampleDetail} from "./SampleDetail";
import * as hooks from "../../../utils/hooks";
import useSideSectionStore from "../../../stores/sideSectionStore";
import useSnackBarStore from "../../../stores/snackBarStore";
import {SnackBarSeverity} from "../../../utils/enums";
import dayjs from "dayjs";
import {DATEPICKER_FORMAT, FormProps} from "../../../utils/constants";
import {Sample, SampleType} from "../../../model";
import {
  buildClientsData,
  buildSamplesData,
  buildSampleTypesData,
} from "../../../shared/test/builders";
import {buildFormData} from "../../../shared/test/builders/formDataBuilder";
import {ClientsStore} from "../../../features/clients/model/types";
import {SampleTypeStore} from "../../../features/sampleType/model/types";

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
  getSampleDate: today.format(DATEPICKER_FORMAT),
  receptionDate: today.format(DATEPICKER_FORMAT),
  analysisDate: today.format(DATEPICKER_FORMAT),
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

let mockClientStoreState: ClientsStore;
let mockSampleTypeStoreState: SampleTypeStore;

jest.mock("../../../config/EnvManager", () => ({
  default: {
    BACKEND_URL: "http://example.com/api",
  },
}));

jest.mock("../../../stores/sideSectionStore", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../../stores/snackBarStore", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../../utils/hooks", () => ({
  useSideSection: jest.fn(),
  useForm: jest.fn(),
  useSnackBar: jest.fn(),
}));

jest.mock("../../../features/clients/model/store", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useClientStore: (selector: any) => selector(mockClientStoreState),
}));

jest.mock("../../../features/sampleType/model/store", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSampleTypeStore: (selector: any) => selector(mockSampleTypeStoreState),
}));

export const renderSampleDetail = (opts?: {
  selectedSample: Sample | null;
  form?: FormProps;
  isNotValidForm?: boolean;
}) => {
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

  jest.spyOn(hooks, "useForm").mockReturnValue({
    form: opts?.form ?? mockData.form,
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
    isNotValidForm: opts?.isNotValidForm ?? false,
  });

  (useSideSectionStore as unknown as jest.Mock).mockReturnValue({
    setIsSideSectionOpen: jest.fn(),
    sideSectionTitle: "Mock title",
  });

  (useSnackBarStore as unknown as jest.Mock).mockReturnValue({
    showSnackBarMessage: jest.fn(),
    isSnackBarOpen: false,
    snackBarText: "",
    snackBarSeverity: SnackBarSeverity.SUCCESS,
  });

  render(
    <SampleDetail
      isReadOnlyMode={mockData.readonly}
      setIsReadOnlyMode={() => {}}
    />,
  );

  return {screen};
};
