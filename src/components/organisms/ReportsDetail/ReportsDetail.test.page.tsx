import {render, screen} from "@testing-library/react";

import {ReportDetail} from "./ReportsDetail";
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
  analytes: [
    {
      id: "1",
      name: "Analyte 1",
    },
    {
      id: "2",
      name: "Analyte 2",
    },
  ],
  analysisMethods: [
    {
      id: "1",
      name: "Analysis Method 1",
    },
    {
      id: "2",
      name: "Analysis Method 2",
    },
  ],
  criterias: [
    {
      id: "1",
      name: "Criteria 1",
    },
    {
      id: "2",
      name: "Criteria 2",
    },
  ],
  reports: [
    {
      id: "1",
      reportDate: "2021-09-01",
      sampleId: "1",
      analyte: "1",
      analysisMethod: "1",
      criteria: "1",
      result: "0 UFC/100 mL",
    },
    {
      id: "2",
      reportDate: "2021-09-01",
      sampleId: "2",
      analyte: "2",
      analysisMethod: "2",
      criteria: "2",
      result: "0 UFC/100 mL",
    },
  ],
  form: {
    reportDate: today.format(DATEPICKER_FORMAT),
    sampleId: "1",
    analyte: "1",
    analysisMethod: "1",
    criteria: "1",
    result: "0 UFC/100 mL",
  },
  defaulForm: {
    reportDate: today.format(DATEPICKER_FORMAT),
    sampleId: "",
    analyte: "",
    analysisMethod: "",
    criteria: "",
    result: "",
  },
  expectedData: {
    reportDate: today.format(RENDERED_FORMAT_DATE),
    sampleId: "001 - Sample Type 1",
    analyte: "Analyte 1",
    analysisMethod: "Analysis Method 1",
    criteria: "Criteria 1",
    result: "0 UFC/100 mL",
  },
};

jest.mock("../../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://example.com/api",
  },
}));

jest.mock("../../../stores", () => ({
  __esModule: true,
  useSnackBarStore: jest.fn(),
}));

jest.mock("../../../utils/hooks", () => ({
  useSample: jest.fn(),
  useClient: jest.fn(),
  useSampleType: jest.fn(),
  useAnalysisMethod: jest.fn(),
  useSideSection: jest.fn(),
  useAnalyte: jest.fn(),
  useCriteria: jest.fn(),
  useReports: jest.fn(),
  useForm: jest.fn(),
}));

export const renderReportDetail = async () => {
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
  jest.spyOn(hooks, "useAnalysisMethod").mockReturnValue({
    analysisMethods: mockData.analysisMethods,
    selectedAnalysisMethod: mockData.analysisMethods[0],
    setSelectedAnalysisMethod: jest
      .fn()
      .mockReturnValue(mockData.analysisMethods[1]),
    getAnalysisMethods: jest.fn().mockReturnValue(mockData.analysisMethods),
    getAnalysisMethodById: jest
      .fn()
      .mockReturnValue(mockData.analysisMethods[1]),
    isLoading: false,
    error: null,
  });
  jest.spyOn(hooks, "useCriteria").mockReturnValue({
    criterias: mockData.criterias,
    selectedCriteria: mockData.criterias[0],
    setSelectedCriteria: jest.fn().mockReturnValue(mockData.criterias[1]),
    getCriterias: jest.fn().mockReturnValue(mockData.criterias),
    getCriteriaById: jest.fn().mockReturnValue(mockData.criterias[1]),
    isLoading: false,
    error: null,
  });
  jest.spyOn(hooks, "useAnalyte").mockReturnValue({
    analytes: mockData.analytes,
    selectedAnalyte: mockData.analytes[0],
    setSelectedAnalyte: jest.fn(),
    getAnalytes: jest.fn(),
    getAnalyteById: jest.fn(),
    isLoading: false,
    error: null,
  });
  jest.spyOn(hooks, "useReports").mockReturnValue({
    reports: mockData.reports,
    selectedReport: mockData.reports[0],
    setSelectedReport: jest.fn(),
    getReports: jest.fn(),
    createReport: jest.fn(),
    editReport: jest.fn(),
    deleteReport: jest.fn(),
    isLoading: false,
    error: null,
    getReportById: jest.fn(),
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
    <ReportDetail
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
