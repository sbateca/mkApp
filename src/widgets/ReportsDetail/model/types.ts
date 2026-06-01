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
  getAnalytesByTestTypeId: (testTypeId: string) => Promise<Analyte[] | null>;
};

export type ReportDetailFormStateProps = {
  isNotValidForm: boolean;
  form: FormProps;
  setForm: React.Dispatch<React.SetStateAction<FormProps>>;
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
  analytesByTestType: Record<string, Analyte[]>;
  reportTestGroups: ReportTestGroups;
  areReportTestsValid: boolean;
  hasCompleteReportTestRow: boolean;
  getReportTestRows: (testTypeId: string) => ReportTestRow[];
  handleTestRowsChange: (testTypeId: string, nextRows: ReportTestRow[]) => void;
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
  analyteId: string;
  analysisMethodId: string;
  result: string;
  criteriaId: string;
};

export type ReportTestGroups = Record<string, ReportTestRow[]>;

export type ReportTestRowField = keyof Omit<ReportTestRow, "id">;
