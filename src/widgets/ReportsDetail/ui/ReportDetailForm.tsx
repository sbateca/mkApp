import {Box, Stack, TextField} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

import {
  getStackContainerProps,
  getStackFieldProps,
  getStackRowProps,
  SampleFormStyles,
} from "./ReportsDetailStyles";
import {
  DATEPICKER_VIEWS,
  FormProps,
  REPORT_DATE_LABEL_TEXT,
  REPORT_NUMBER_LABEL_TEXT,
  REPORT_SAMPLE_LABEL_TEXT,
} from "../../../utils/constants";
import {
  ReportFormFields,
  SelectVariants,
  SharedButtonColors,
  SharedButtonSizes,
  SharedTextFieldVariants,
} from "../../../utils/enums";
import {AutoComplete} from "../../../shared/ui";
import dayjs from "dayjs";
import {Sample, SampleReportDetails} from "../../../entities/sample";
import {ReportTestForm} from "./ReportTestForm";
import {useReportDetailController} from "../model/useReportDetailController";
import {Analyte} from "../../../entities/analyte";
import React, {useEffect, useRef, useState} from "react";
import {Client} from "../../../entities/client";
import {AnalysisMethod} from "../../../entities/analysisMethod";
import {Criteria} from "../../../entities/criteria";
import {SampleType} from "../../../entities/sampleType";
import {Test} from "../../../entities/test";
import {AutoCompleteOption} from "../../../shared/ui/AutoComplete/types";
import {FieldValidations, FormError} from "../../../utils/hooks";
import {TestType} from "../../../entities/testType";

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
};

export type DetailFormProps = {
  isLessThanMediumScreen: boolean;
  isReadOnlyMode: boolean;
  catalogs: ReportDetailCatalogsProps;
  detailForm: ReportDetailFormStateProps;
  state: ReturnType<typeof useReportDetailController>["state"];
};

export const ReportDetailForm = ({
  isLessThanMediumScreen,
  isReadOnlyMode,
  catalogs,
  detailForm,
  state,
}: DetailFormProps): React.ReactElement => {
  const [analytesByTestType, setAnalytesByTestType] = useState<
    Record<string, Analyte[]>
  >({});
  const formTitles = ["Microbiological Analysis", "Physical-Chemical Analysis"];
  const loadedTestTypeIdsRef = useRef("");

  const {
    analysisMethods,
    clients,
    criterias,
    sampleTypes,
    testTypes,
    sampleTypeOptionsFromSamples,
    getAnalytesByTestTypeId,
  } = catalogs;

  const {
    form,
    setForm,
    formFieldsErrors,
    handleChange,
    handleDateChange,
    handleAutoCompleteChange,
    getTextFieldHelperText,
    setFormFieldsValidationFunctions,
  } = detailForm;

  const {isLoadingSample, selectedSample} = state;
  const testTypeIds = testTypes?.map((testType) => testType.id).join("|") ?? "";

  useEffect(() => {
    if (!testTypes?.length) {
      loadedTestTypeIdsRef.current = "";
      setAnalytesByTestType((prevAnalytesByTestType) =>
        Object.keys(prevAnalytesByTestType).length
          ? {}
          : prevAnalytesByTestType,
      );
      return;
    }

    if (loadedTestTypeIdsRef.current === testTypeIds) {
      return;
    }

    let shouldIgnoreResult = false;

    const loadAnalytesByTestType = async () => {
      const analyteEntries = await Promise.all(
        testTypes.map(async ({id}) => {
          const analytes = await getAnalytesByTestTypeId(id);
          return [id, analytes ?? []] as const;
        }),
      );

      if (shouldIgnoreResult) {
        return;
      }

      const nextAnalytesByTestType: Record<string, Analyte[]> = {};
      analyteEntries.forEach(([testTypeId, analytes]) => {
        nextAnalytesByTestType[testTypeId] = analytes;
      });

      setAnalytesByTestType(nextAnalytesByTestType);
      loadedTestTypeIdsRef.current = testTypeIds;
    };

    loadAnalytesByTestType();

    return () => {
      shouldIgnoreResult = true;
    };
  }, [testTypes, testTypeIds, getAnalytesByTestTypeId]);

  return (
    <Stack {...getStackContainerProps(isLessThanMediumScreen)}>
      <Stack {...getStackRowProps(isLessThanMediumScreen)}>
        <Stack {...getStackFieldProps()}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={SampleFormStyles.datePicker}
              disableFuture
              views={DATEPICKER_VIEWS}
              label={REPORT_DATE_LABEL_TEXT}
              name={ReportFormFields.REPORT_DATE}
              onChange={(value) =>
                handleDateChange(value, ReportFormFields.REPORT_DATE)
              }
              slotProps={{
                textField: {
                  error: !!formFieldsErrors[ReportFormFields.REPORT_DATE],
                  helperText: getTextFieldHelperText(
                    ReportFormFields.REPORT_DATE,
                  ),
                  variant: SharedTextFieldVariants.STANDARD,
                },
              }}
              value={form.reportDate ? dayjs(form.reportDate) : null}
              readOnly={isReadOnlyMode}
            />
          </LocalizationProvider>
        </Stack>
        <Stack {...getStackFieldProps()}>
          <TextField
            required
            error={!!formFieldsErrors[ReportFormFields.REPORT_NUMBER]}
            label={REPORT_NUMBER_LABEL_TEXT}
            type="string"
            color={SharedButtonColors.PRIMARY}
            size={SharedButtonSizes.SMALL}
            onChange={handleChange}
            name={ReportFormFields.REPORT_NUMBER}
            helperText={getTextFieldHelperText(ReportFormFields.REPORT_NUMBER)}
            value={form[ReportFormFields.REPORT_NUMBER] ?? ""}
            variant={SharedTextFieldVariants.STANDARD}
            fullWidth={true}
            InputProps={{
              readOnly: isReadOnlyMode,
            }}
          />
        </Stack>
        <Stack {...getStackFieldProps()}>
          <AutoComplete
            options={sampleTypeOptionsFromSamples}
            label={REPORT_SAMPLE_LABEL_TEXT}
            value={`${form[ReportFormFields.SAMPLE_ID] ?? ""}`}
            variant={SelectVariants.STANDARD}
            onChange={handleAutoCompleteChange}
            name={ReportFormFields.SAMPLE_ID}
            readOnly={isReadOnlyMode}
            required
            error={!!formFieldsErrors[ReportFormFields.SAMPLE_ID]}
            helperText={getTextFieldHelperText(ReportFormFields.SAMPLE_ID)}
          />
        </Stack>
      </Stack>
      <Stack {...getStackRowProps(isLessThanMediumScreen)}>
        <Box {...getStackFieldProps()}>
          <SampleReportDetails
            sample={selectedSample}
            clients={clients || []}
            sampleTypes={sampleTypes || []}
            isLoadingSample={isLoadingSample}
          />
        </Box>
      </Stack>
      {Object.entries(analytesByTestType).map(
        ([testTypeId, analytes], index) => {
          return (
            <Stack
              key={testTypeId}
              {...getStackRowProps(isLessThanMediumScreen)}
            >
              <ReportTestForm
                form={form}
                setForm={setForm}
                isReadonly={isReadOnlyMode}
                analytes={analytes}
                criterias={criterias}
                analysisMethods={analysisMethods}
                formIndex={index}
                formFieldsErrors={formFieldsErrors}
                setFormFieldsValidationFunctions={
                  setFormFieldsValidationFunctions
                }
                handleChange={handleChange}
                handleAutoCompleteChange={handleAutoCompleteChange}
                getTextFieldHelperText={getTextFieldHelperText}
                title={formTitles[index]}
              />
            </Stack>
          );
        },
      )}
    </Stack>
  );
};
