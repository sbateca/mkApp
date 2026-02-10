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

jest.mock("../../../config/EnvManager", () => ({
  __esModule: true,
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
  useSample: jest.fn(),
  useClient: jest.fn(),
  useSampleType: jest.fn(),
  useSideSection: jest.fn(),
  useForm: jest.fn(),
  useSnackBar: jest.fn(),
}));

export const renderSampleDetail = (opts?: {
  selectedSample?: Sample;
  form?: FormProps;
  isNotValidForm?: boolean;
}) => {
  jest.spyOn(hooks, "useSample").mockReturnValue({
    isLoading: false,
    error: null,
    getSampleById: jest.fn().mockReturnValue(mockData.samples[0]),
    samples: mockData.samples,
    selectedSample: opts?.selectedSample ?? mockData.samples[0],
    createSample: jest.fn().mockReturnValue(mockData.samples[1]),
    editSample: jest.fn().mockReturnValue(mockData.samples[1]),
    setSelectedSample: jest.fn(),
    getSamples: jest.fn().mockReturnValue(mockData.samples),
    deleteSample: jest.fn().mockReturnValue(mockData.samples[1]),
  });

  jest.spyOn(hooks, "useClient").mockReturnValue({
    clients: mockData.clients,
    selectedClient: mockData.clients[0],
    setSelectedClient: jest.fn(),
    getClients: jest.fn().mockReturnValue(mockData.clients),
    getClientById: jest.fn(),
    isLoading: false,
    error: null,
  });

  jest.spyOn(hooks, "useSampleType").mockReturnValue({
    sampleTypes: mockData.sampleTypes,
    selectedSampleType: mockData.sampleTypes[0],
    setSelectedSampleType: jest.fn(),
    getSampleTypes: jest.fn().mockReturnValue(mockData.sampleTypes),
    getSampleTypeById: jest.fn(),
    isLoading: false,
    error: null,
  });

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
