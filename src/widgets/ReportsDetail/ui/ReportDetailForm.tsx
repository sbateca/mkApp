import {Stack, TextField} from "@mui/material";
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
  REPORT_ANALYSIS_METHOD_LABEL_TEXT,
  REPORT_ANALYTE_LABEL_TEXT,
  REPORT_CRITERIA_LABEL_TEXT,
  REPORT_DATE_LABEL_TEXT,
  REPORT_RESULT_LABEL_TEXT,
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
import {getAutoCompleteOptionsFromModel} from "../../../utils/model";
import {FormError} from "../../../utils/hooks";
import {AutoCompleteOption} from "../../../shared/ui/AutoComplete/types";
import {AnalysisMethod} from "../../../entities/analysisMethod/model/AnalysisMethod";
import {Analyte} from "../../../entities/analyte/model/Analyte";
import {Criteria} from "../../../entities/criteria";

export type DetailFormProps = {
  isLessThanMediumScreen: boolean;
  isReadOnlyMode: boolean;
  form: FormProps;
  analysisMethods: AnalysisMethod[] | null;
  analytes: Analyte[] | null;
  criterias: Criteria[] | null;
  formFieldsErrors: FormError;
  getSampleTypeAutoCompleteOptionsFromSamples: () => AutoCompleteOption[];
  getTextFieldHelperText: (fieldName: string) => string;

  handleAutoCompleteChange: (
    _: React.SyntheticEvent<Element, Event>,
    newValue: AutoCompleteOption | null,
    name: string,
  ) => void;

  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (value: dayjs.Dayjs | null, fieldName: string) => void;
};

export const ReportDetailForm = ({
  isLessThanMediumScreen,
  isReadOnlyMode,
  form,
  analysisMethods,
  analytes,
  criterias,
  formFieldsErrors,
  getSampleTypeAutoCompleteOptionsFromSamples,
  getTextFieldHelperText,
  handleAutoCompleteChange,
  handleChange,
  handleDateChange,
}: DetailFormProps): React.ReactElement => {
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
          <AutoComplete
            options={getSampleTypeAutoCompleteOptionsFromSamples()}
            label={REPORT_SAMPLE_LABEL_TEXT}
            value={form.sampleId}
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
        <Stack {...getStackFieldProps()}>
          <AutoComplete
            options={getAutoCompleteOptionsFromModel(analytes)}
            label={REPORT_ANALYTE_LABEL_TEXT}
            value={form.analyte}
            variant={SelectVariants.STANDARD}
            onChange={handleAutoCompleteChange}
            name={ReportFormFields.ANALYTE}
            readOnly={isReadOnlyMode}
            required
            error={!!formFieldsErrors[ReportFormFields.ANALYTE]}
            helperText={getTextFieldHelperText(ReportFormFields.ANALYTE)}
          />
        </Stack>
        <Stack {...getStackFieldProps()}>
          <AutoComplete
            options={getAutoCompleteOptionsFromModel(analysisMethods)}
            label={REPORT_ANALYSIS_METHOD_LABEL_TEXT}
            value={form.analysisMethod}
            variant={SelectVariants.STANDARD}
            onChange={handleAutoCompleteChange}
            name={ReportFormFields.ANALYSIS_METHOD}
            readOnly={isReadOnlyMode}
            required
            error={!!formFieldsErrors[ReportFormFields.ANALYSIS_METHOD]}
            helperText={getTextFieldHelperText(
              ReportFormFields.ANALYSIS_METHOD,
            )}
          />
        </Stack>
      </Stack>
      <Stack {...getStackRowProps(isLessThanMediumScreen)}>
        <Stack {...getStackFieldProps()}>
          <AutoComplete
            options={getAutoCompleteOptionsFromModel(criterias)}
            label={REPORT_CRITERIA_LABEL_TEXT}
            value={form.criteria}
            variant={SelectVariants.STANDARD}
            onChange={handleAutoCompleteChange}
            name={ReportFormFields.CRITERIA}
            readOnly={isReadOnlyMode}
            required
            error={!!formFieldsErrors[ReportFormFields.CRITERIA]}
            helperText={getTextFieldHelperText(ReportFormFields.CRITERIA)}
          />
        </Stack>
        <Stack {...getStackFieldProps()}>
          <TextField
            required
            error={!!formFieldsErrors[ReportFormFields.RESULT]}
            label={REPORT_RESULT_LABEL_TEXT}
            type="string"
            color={SharedButtonColors.PRIMARY}
            size={SharedButtonSizes.SMALL}
            onChange={handleChange}
            name={ReportFormFields.RESULT}
            helperText={getTextFieldHelperText(ReportFormFields.RESULT)}
            value={form.result ?? ""}
            variant={SharedTextFieldVariants.STANDARD}
            fullWidth={true}
            InputProps={{
              readOnly: isReadOnlyMode,
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
