import {render, screen} from "@testing-library/react";

import {ReportDetail} from "./ReportsDetail";
import * as hooks from "../../../utils/hooks";
import useSideSectionStore from "../../../stores/sideSectionStore";
import useSnackBarStore from "../../../stores/snackBarStore";
import {SnackBarSeverity} from "../../../utils/enums";
import dayjs from "dayjs";
import {DATEPICKER_FORMAT} from "../../../utils/constants";
import {SamplesStore} from "../../../features/samples/model/types";
import {Analyte, Sample, SampleType} from "../../../model";
import {
  buildAnalytesData,
  buildClientsData,
  buildReportsData,
  buildSamplesData,
  buildSampleTypesData,
} from "../../../shared/test/builders";
import {buildAnalysisMethodsData} from "../../../shared/test/builders/analisysMethodBuilder";
import {buildCriteriasData} from "../../../shared/test/builders/criteriaBuilder";
import {buildFormData} from "../../../shared/test/builders/formDataBuilder";
import {ClientsStore} from "../../../features/clients/model/types";
import {SampleTypeStore} from "../../../features/sampleType/model/types";

const today = dayjs();
const RENDERED_FORMAT_DATE = "MM/DD/YYYY";

const mockSampleTypes: SampleType[] = buildSampleTypesData(2);
const mockAnalytes: Analyte[] = buildAnalytesData(2);
const mockAnalysisMethods = buildAnalysisMethodsData(2);
const mockClients = buildClientsData(2);
const mockCriterias = buildCriteriasData(2);
const mockSamples = buildSamplesData(2, {
  clientId: mockClients[0].id,
  sampleTypeId: mockSampleTypes[0].id,
});
const mockReports = buildReportsData(2, {
  sampleId: mockSamples[0].id,
  analyte: mockAnalytes[0].id,
  analysisMethod: mockAnalysisMethods[0].id,
  criteria: mockCriterias[0].id,
});
const mockFormData = buildFormData({
  reportDate: today.format(DATEPICKER_FORMAT),
  sampleId: mockSamples[0].id,
  analyte: mockAnalytes[0].id,
  analysisMethod: mockAnalysisMethods[0].id,
  criteria: mockCriterias[0].id,
  result: mockReports[0].result,
});
const mockDefaultFormData = buildFormData({
  reportDate: today.format(DATEPICKER_FORMAT),
  sampleId: "",
  analyte: "",
  analysisMethod: "",
  criteria: "",
  result: "",
});

export const mockReportDetailData = {
  readonly: false,
  samples: mockSamples,
  clients: mockClients,
  sampleTypes: mockSampleTypes,
  analytes: mockAnalytes,
  analysisMethods: mockAnalysisMethods,
  criterias: mockCriterias,
  reports: mockReports,
  form: mockFormData,
  defaulForm: mockDefaultFormData,
  expectedData: {
    reportDate: today.format(RENDERED_FORMAT_DATE),
    sampleId: `${mockSamples[0].sampleCode} - ${mockSampleTypes[0].name}`,
    analyte: mockAnalytes[0].name,
    analysisMethod: mockAnalysisMethods[0].name,
    criteria: mockCriterias[0].name,
    result: mockReports[0].result,
  },
};

let mockedSamplesState: SamplesStore;
let mockClientStoreState: ClientsStore;
let mockSampleTypeStoreState: SampleTypeStore;

jest.mock("../../../features/samples/model/store", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSampleStore: (selector: any) => selector(mockedSamplesState),
}));

jest.mock("../../../features/clients/model/store", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useClientStore: (selector: any) => selector(mockClientStoreState),
}));

jest.mock("../../../features/sampleType/model/store", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSampleTypeStore: (selector: any) => selector(mockSampleTypeStoreState),
}));

jest.mock("../../../stores", () => ({
  useSnackBarStore: jest.fn(),
  useSideSectionStore: jest.fn(),
}));

jest.mock("../../../stores/sideSectionStore", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../../stores/snackBarStore", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../../stores/snackBarStore", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../../utils/hooks", () => ({
  useAnalysisMethod: jest.fn(),
  useSideSection: jest.fn(),
  useAnalyte: jest.fn(),
  useCriteria: jest.fn(),
  useReports: jest.fn(),
  useForm: jest.fn(),
}));

export const renderReportDetail = async () => {
  mockedSamplesState = {
    samples: mockReportDetailData.samples,
    selectedSample: mockReportDetailData.samples[0],
    isLoading: false,
    error: null,
    setSelectedSample: jest.fn(),
    getSamples: jest.fn(),
    getSampleById: jest
      .fn()
      .mockResolvedValue(mockReportDetailData.samples[0] as Sample),
    createSample: jest
      .fn()
      .mockResolvedValue(mockReportDetailData.samples[0] as Sample),
    editSample: jest
      .fn()
      .mockResolvedValue(mockReportDetailData.samples[0] as Sample),
    deleteSample: jest.fn().mockResolvedValue(null),
  };

  mockClientStoreState = {
    clients: mockClients,
    selectedClient: mockClients[0],
    setSelectedClient: jest.fn(),
    getClients: jest.fn().mockReturnValue(mockClients),
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

  jest.spyOn(hooks, "useAnalysisMethod").mockReturnValue({
    analysisMethods: mockReportDetailData.analysisMethods,
    selectedAnalysisMethod: mockReportDetailData.analysisMethods[0],
    setSelectedAnalysisMethod: jest
      .fn()
      .mockReturnValue(mockReportDetailData.analysisMethods[1]),
    getAnalysisMethods: jest
      .fn()
      .mockReturnValue(mockReportDetailData.analysisMethods),
    getAnalysisMethodById: jest
      .fn()
      .mockReturnValue(mockReportDetailData.analysisMethods[1]),
    isLoading: false,
    error: null,
  });

  jest.spyOn(hooks, "useCriteria").mockReturnValue({
    criterias: mockReportDetailData.criterias,
    selectedCriteria: mockReportDetailData.criterias[0],
    setSelectedCriteria: jest
      .fn()
      .mockReturnValue(mockReportDetailData.criterias[1]),
    getCriterias: jest.fn().mockReturnValue(mockReportDetailData.criterias),
    getCriteriaById: jest
      .fn()
      .mockReturnValue(mockReportDetailData.criterias[1]),
    isLoading: false,
    error: null,
  });

  jest.spyOn(hooks, "useAnalyte").mockReturnValue({
    analytes: mockReportDetailData.analytes,
    selectedAnalyte: mockReportDetailData.analytes[0],
    setSelectedAnalyte: jest.fn(),
    getAnalytes: jest.fn(),
    getAnalyteById: jest.fn(),
    isLoading: false,
    error: null,
  });

  jest.spyOn(hooks, "useReports").mockReturnValue({
    reports: mockReportDetailData.reports,
    selectedReport: mockReportDetailData.reports[0],
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
    form: mockReportDetailData.form,
    setForm: jest.fn().mockReturnValue(mockReportDetailData.form),
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

  (useSnackBarStore as unknown as jest.Mock).mockReturnValue({
    showSnackBarMessage: jest.fn(),
    isSnackBarOpen: false,
    snackBarText: "",
    snackBarSeverity: SnackBarSeverity.SUCCESS,
  });

  (useSideSectionStore as unknown as jest.Mock).mockReturnValue({
    setIsSideSectionOpen: jest.fn(),
    sideSectionTitle: "Mock title",
  });

  const container = render(
    <ReportDetail
      isReadOnlyMode={mockReportDetailData.readonly}
      setIsReadOnlyMode={() => {}}
    />,
  );

  return {
    container,
    titleNode: container.container.querySelector("h6"),
    closeButton: screen.getByText("Close"),
    screen,
  };
};
