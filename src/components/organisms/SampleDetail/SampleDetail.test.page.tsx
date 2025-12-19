import {render, screen} from "@testing-library/react";

import {SampleDetail} from "./SampleDetail";
import * as hooks from "../../../utils/hooks";
import * as store from "../../../stores";
import {SnackBarSeverity} from "../../../utils/enums";
import dayjs from "dayjs";
import {DATEPICKER_FORMAT} from "../../../utils/constants";

const today = dayjs();
const RENDERED_FORMAT_DATE = "MM/DD/YYYY";
export const mockData = {
  readonly: false,
  samples: [
    {
      id: "1",
      sampleCode: "001",
      sampleTypeId: "1",
      clientId: "1",
      getSampleDate: "2021-09-01",
      receptionDate: "2021-09-01",
      analysisDate: "2021-09-01",
      sampleLocation: "Mock location",
      responsable: "Mock responsable",
    },
    {
      id: "2",
      sampleCode: "002",
      sampleTypeId: "2",
      clientId: "2",
      getSampleDate: "2021-09-01",
      receptionDate: "2021-09-01",
      analysisDate: "2021-09-01",
      sampleLocation: "Mock location",
      responsable: "Mock responsable",
    },
  ],
  clients: [
    {
      id: "1",
      name: "Client 1",
    },
    {
      id: "2",
      name: "Client 2",
    },
  ],
  sampleTypes: [
    {
      id: "1",
      name: "Sample Type 1",
    },
    {
      id: "2",
      name: "Sample Type 2",
    },
  ],
  form: {
    sampleCode: "001",
    sampleType: "1",
    client: "1",
    getSampleDate: today.format(DATEPICKER_FORMAT),
    receptionDate: today.format(DATEPICKER_FORMAT),
    analysisDate: today.format(DATEPICKER_FORMAT),
    sampleLocation: "Mock location",
    responsable: "Mock responsable",
  },
  defaulForm: {
    sampleCode: "",
    sampleType: "",
    client: "",
    getSampleDate: today.format(DATEPICKER_FORMAT),
    receptionDate: today.format(DATEPICKER_FORMAT),
    analysisDate: today.format(DATEPICKER_FORMAT),
    sampleLocation: "",
    responsable: "",
  },
  expectedData: {
    sampleCode: "001",
    sampleType: "Sample Type 1",
    client: "Client 1",
    getSampleDate: today.format(RENDERED_FORMAT_DATE),
    receptionDate: today.format(RENDERED_FORMAT_DATE),
    analysisDate: today.format(RENDERED_FORMAT_DATE),
    sampleLocation: "Mock location",
    responsable: "Mock responsable",
  },
};

jest.mock("../../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://example.com/api",
  },
}));

jest.mock("../../../stores", () => ({
  useSnackBarStore: jest.fn(),
}));

jest.mock("../../../utils/hooks", () => ({
  useSample: jest.fn(),
  useClient: jest.fn(),
  useSampleType: jest.fn(),
  useSideSection: jest.fn(),
  useForm: jest.fn(),
  useSnackBar: jest.fn(),
}));

export const renderSampleDetail = async () => {
  jest.spyOn(hooks, "useSample").mockReturnValue({
    isLoading: false,
    error: null,
    getSampleById: jest.fn().mockReturnValue(mockData.samples[0]),
    samples: mockData.samples,
    selectedSample: mockData.samples[0],
    createSample: jest.fn().mockReturnValue(mockData.samples[1]),
    editSample: jest.fn().mockReturnValue(mockData.samples[1]),
    setSelectedSample: jest.fn().mockReturnValue(mockData.samples[0]),
    getSamples: jest.fn().mockReturnValue(mockData.samples),
    deleteSample: jest.fn().mockReturnValue(mockData.samples[1]),
  });

  jest.spyOn(hooks, "useClient").mockReturnValue({
    clients: mockData.clients,
    selectedClient: mockData.clients[0],
    setSelectedClient: jest.fn().mockReturnValue(mockData.clients[1]),
    getClients: jest.fn().mockReturnValue(mockData.clients),
    getClientById: jest.fn().mockReturnValue(mockData.clients[1]),
    isLoading: false,
    error: null,
  });

  jest.spyOn(hooks, "useSampleType").mockReturnValue({
    sampleTypes: mockData.sampleTypes,
    selectedSampleType: mockData.sampleTypes[0],
    setSelectedSampleType: jest.fn().mockReturnValue(mockData.sampleTypes[1]),
    getSampleTypes: jest.fn().mockReturnValue(mockData.sampleTypes),
    getSampleTypeById: jest.fn().mockReturnValue(mockData.sampleTypes[1]),
    isLoading: false,
    error: null,
  });
  jest.spyOn(hooks, "useSideSection").mockReturnValue({
    setIsSideSectionOpen: jest.fn().mockReturnValue(true),
    setSideSectionTitle: jest.fn().mockReturnValue("Mock title"),
    isSideSectionOpen: true,
    sideSectionTitle: "Mock title",
  });
  jest.spyOn(hooks, "useForm").mockReturnValue({
    form: mockData.form,
    setForm: jest.fn().mockReturnValue(mockData.form),
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
  });
  jest.spyOn(store, "useSnackBarStore").mockReturnValue({
    showSnackBarMessage: jest.fn(),
    isSnackBarOpen: false,
    snackBarText: "",
    snackBarSeverity: SnackBarSeverity.SUCCESS,
  });

  const container = render(
    <SampleDetail
      isReadOnlyMode={mockData.readonly}
      setIsReadOnlyMode={() => {}}
    />,
  );

  return {
    container,
    title: screen.getByText("Mock title"),
    closeButton: screen.getByText("Close"),
    screen,
  };
};
