import dayjs from "dayjs";
import {AnalysisMethod} from "../../../entities/analysisMethod";
import {Analyte} from "../../../entities/analyte";
import {Client} from "../../../entities/client";
import {Criteria} from "../../../entities/criteria";
import {Sample} from "../../../entities/sample";
import {SampleType} from "../../../entities/sampleType";
import {Test} from "../../../entities/test";
import {TestType} from "../../../entities/testType";
import {AutoCompleteOption} from "../../../shared/ui/AutoComplete/types";
import {FormProps} from "../../../utils/constants";
import {FieldValidations, FormError} from "../../../utils/hooks";
import {useReportDetailController} from "./useReportDetailController";

export type ReportDetailCatalogsProps = {
  clients: Client[] | null;
  analysisMethods: AnalysisMethod[] | null;
  analytes: Analyte[] | null;
  criterias: Criteria[] | null;
  samples: Sample[] | null;
  sampleTypes: SampleType[] | null;
  tests: Test[] | null;
  testTypes: TestType[] | null;
  isLoadingAll: boolean;
  sampleTypeOptionsFromSamples: AutoCompleteOption[];
  getTestTypeOptions: () => AutoCompleteOption[];
  getTestOptions: () => AutoCompleteOption[];
  getAnalysisMethodOptions: () => AutoCompleteOption[];
  getCriteriaOptions: () => AutoCompleteOption[];
};

export type ReportDetailFormStateProps = {
  isNotValidForm: boolean;
  form: FormProps;
  setForm: React.Dispatch<React.SetStateAction<FormProps>>;
  setFieldValue: (name: string, value: string) => void;
  formFieldsErrors: FormError;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (value: dayjs.Dayjs | null, fieldName: string) => void;
  handleAutoCompleteChange: (
    _: React.SyntheticEvent,
    newValue: AutoCompleteOption | null,
    name: string,
  ) => void;
  getTextFieldHelperText: (fieldName: string) => string;
  setFormFieldsValidationFunctions: React.Dispatch<
    React.SetStateAction<FieldValidations>
  >;
  cleanForm: (defaultFormVFieldValues: FormProps) => void;
  groups: ReportTestGroup[];
  setGroups: React.Dispatch<React.SetStateAction<ReportTestGroup[]>>;
  areReportTestsValid: boolean;
};

export type DetailFormProps = {
  isLessThanMediumScreen: boolean;
  catalogs: ReportDetailCatalogsProps;
  detailForm: ReportDetailFormStateProps;
  state: ReturnType<typeof useReportDetailController>["state"];
  actions: ReturnType<typeof useReportDetailController>["actions"];
};
export type ReportTestRow = {
  id: string;
  analysisMethodId: string;
  result: string;
  criteriaId: string;
};

export type ReportTestGroup = {
  id: string;
  testTypeId: string;
  analyteId: string;
  rows: ReportTestRow[];
};

// The existing report mapper accepts rows keyed by test type.
export type ReportTestGroups = Record<
  string,
  (ReportTestRow & {analyteId: string})[]
>;

export type ReportTestRowField = keyof Omit<ReportTestRow, "id">;
