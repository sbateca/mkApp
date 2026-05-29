import {Stack, TextField} from "@mui/material";
import {AutoComplete} from "../../../shared/ui";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {
  SamplesFormFields,
  SelectVariants,
  SharedButtonColors,
  SharedButtonSizes,
  SharedTextFieldVariants,
} from "../../../utils/enums";
import {
  DATEPICKER_VIEWS,
  FormProps,
  getFormStringValue,
  SAMPLE_ANALYSIS_DATE_LABEL_TEXT,
  SAMPLE_CLIENT_LABEL_TEXT,
  SAMPLE_CODE_LABEL_TEXT,
  SAMPLE_GET_SAMPLE_DATE_LABEL_TEXT,
  SAMPLE_LOCATION_LABEL_TEXT,
  SAMPLE_RECEPTION_DATE_LABEL_TEXT,
  SAMPLE_RESPONSABLE_LABEL_TEXT,
  SAMPLE_TYPE_LABEL_TEXT,
} from "../../../utils/constants";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {SampleDetailStyles, SampleFormStyles} from "./SampleDetailStyles";
import dayjs from "dayjs";
import React from "react";
import {FormError} from "../../../utils/hooks";
import {GenericModelWithId} from "../../../utils/model";
import {AutoCompleteOption} from "../../../shared/ui/AutoComplete/types";
import {Client} from "../../../entities/client";
import {SampleType} from "../../../entities/sampleType";
import {
  getStackContainerProps,
  getStackFieldProps,
  getStackRowProps,
} from "../../../shared/commonStyles";

export type DetailFormProps = {
  clients: Client[] | null;
  form: FormProps;
  formFieldsErrors: FormError;

  getAutoCompleteOptionsFromModel: <T extends GenericModelWithId>(
    models: T[] | null,
  ) => AutoCompleteOption[];

  getTextFieldHelperText: (fieldName: string) => string;

  handleAutoCompleteChange: (
    _: React.SyntheticEvent<Element, Event>,
    newValue: AutoCompleteOption | null,
    name: string,
  ) => void;

  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

  handleDateChange: (value: dayjs.Dayjs | null, fieldName: string) => void;
  isLessThanMediumScreen: boolean;
  isReadOnlyMode: boolean;
  sampleTypes: SampleType[] | null;
};

export const SampleDetailForm = ({
  clients,
  form,
  formFieldsErrors,
  getAutoCompleteOptionsFromModel,
  getTextFieldHelperText,
  handleAutoCompleteChange,
  handleChange,
  handleDateChange,
  isLessThanMediumScreen,
  isReadOnlyMode,
  sampleTypes,
}: DetailFormProps) => {
  const today = React.useMemo(() => dayjs(), []);
  const getValue = (fieldName: string): string =>
    getFormStringValue(form, fieldName);

  return (
    <Stack {...getStackContainerProps(isLessThanMediumScreen)}>
      <Stack {...getStackRowProps(isLessThanMediumScreen)}>
        <Stack {...getStackFieldProps()}>
          <TextField
            required
            error={!!formFieldsErrors[SamplesFormFields.SAMPLE_CODE]}
            label={SAMPLE_CODE_LABEL_TEXT}
            color={SharedButtonColors.PRIMARY}
            size={SharedButtonSizes.SMALL}
            name={SamplesFormFields.SAMPLE_CODE}
            onChange={handleChange}
            helperText={getTextFieldHelperText(SamplesFormFields.SAMPLE_CODE)}
            value={getValue(SamplesFormFields.SAMPLE_CODE)}
            variant={SharedTextFieldVariants.STANDARD}
            fullWidth={true}
            InputProps={{
              readOnly: isReadOnlyMode,
            }}
            data-testid={SamplesFormFields.SAMPLE_CODE}
          />
        </Stack>
        <Stack {...getStackFieldProps()}>
          <AutoComplete
            options={getAutoCompleteOptionsFromModel(sampleTypes)}
            label={SAMPLE_TYPE_LABEL_TEXT}
            value={getValue(SamplesFormFields.SAMPLE_TYPE)}
            variant={SelectVariants.STANDARD}
            onChange={handleAutoCompleteChange}
            name={SamplesFormFields.SAMPLE_TYPE}
            readOnly={isReadOnlyMode}
            error={!!formFieldsErrors[SamplesFormFields.SAMPLE_TYPE]}
            helperText={getTextFieldHelperText(SamplesFormFields.SAMPLE_TYPE)}
            required
          />
        </Stack>
      </Stack>
      <Stack {...getStackRowProps(isLessThanMediumScreen)}>
        <Stack {...getStackFieldProps()}>
          <AutoComplete
            options={getAutoCompleteOptionsFromModel(clients)}
            label={SAMPLE_CLIENT_LABEL_TEXT}
            value={getValue(SamplesFormFields.CLIENT)}
            variant={SelectVariants.STANDARD}
            onChange={handleAutoCompleteChange}
            name={SamplesFormFields.CLIENT}
            readOnly={isReadOnlyMode}
            error={!!formFieldsErrors[SamplesFormFields.CLIENT]}
            helperText={getTextFieldHelperText(SamplesFormFields.CLIENT)}
            required
          />
        </Stack>
        <Stack {...getStackFieldProps()}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={SampleFormStyles.datePicker}
              disableFuture
              views={DATEPICKER_VIEWS}
              label={SAMPLE_GET_SAMPLE_DATE_LABEL_TEXT}
              name={SamplesFormFields.GET_SAMPLE_DATE}
              onChange={(value) =>
                handleDateChange(value, SamplesFormFields.GET_SAMPLE_DATE)
              }
              slotProps={{
                textField: {
                  error: !!formFieldsErrors[SamplesFormFields.GET_SAMPLE_DATE],
                  helperText: getTextFieldHelperText(
                    SamplesFormFields.GET_SAMPLE_DATE,
                  ),
                  variant: SharedTextFieldVariants.STANDARD,
                },
              }}
              readOnly={isReadOnlyMode}
              value={
                getValue(SamplesFormFields.GET_SAMPLE_DATE)
                  ? dayjs(getValue(SamplesFormFields.GET_SAMPLE_DATE))
                  : null
              }
              data-testid={SamplesFormFields.GET_SAMPLE_DATE}
            />
          </LocalizationProvider>
        </Stack>
      </Stack>
      <Stack {...getStackRowProps(isLessThanMediumScreen)}>
        <Stack {...SampleDetailStyles.stackField}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={SampleFormStyles.datePicker}
              disableFuture
              defaultValue={today}
              views={DATEPICKER_VIEWS}
              label={SAMPLE_RECEPTION_DATE_LABEL_TEXT}
              name={SamplesFormFields.RECEPTION_DATE}
              onChange={(value) =>
                handleDateChange(value, SamplesFormFields.RECEPTION_DATE)
              }
              slotProps={{
                textField: {
                  error: !!formFieldsErrors[SamplesFormFields.RECEPTION_DATE],
                  helperText: getTextFieldHelperText(
                    SamplesFormFields.RECEPTION_DATE,
                  ),
                  variant: SharedTextFieldVariants.STANDARD,
                },
              }}
              value={
                getValue(SamplesFormFields.RECEPTION_DATE)
                  ? dayjs(getValue(SamplesFormFields.RECEPTION_DATE))
                  : null
              }
              readOnly={isReadOnlyMode}
            />
          </LocalizationProvider>
        </Stack>
        <Stack {...getStackFieldProps()}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={SampleFormStyles.datePicker}
              disableFuture
              defaultValue={today}
              views={DATEPICKER_VIEWS}
              label={SAMPLE_ANALYSIS_DATE_LABEL_TEXT}
              name={SamplesFormFields.ANALYSIS_DATE}
              onChange={(value) =>
                handleDateChange(value, SamplesFormFields.ANALYSIS_DATE)
              }
              slotProps={{
                textField: {
                  error: !!formFieldsErrors[SamplesFormFields.ANALYSIS_DATE],
                  helperText: getTextFieldHelperText(
                    SamplesFormFields.ANALYSIS_DATE,
                  ),
                  variant: SharedTextFieldVariants.STANDARD,
                },
              }}
              value={
                getValue(SamplesFormFields.ANALYSIS_DATE)
                  ? dayjs(getValue(SamplesFormFields.ANALYSIS_DATE))
                  : null
              }
              readOnly={isReadOnlyMode}
            />
          </LocalizationProvider>
        </Stack>
      </Stack>
      <Stack {...getStackRowProps(isLessThanMediumScreen)}>
        <TextField
          required
          error={!!formFieldsErrors[SamplesFormFields.SAMPLE_LOCATION]}
          label={SAMPLE_LOCATION_LABEL_TEXT}
          sx={SampleFormStyles.texfield}
          type="string"
          color={SharedButtonColors.PRIMARY}
          size={SharedButtonSizes.SMALL}
          name={SamplesFormFields.SAMPLE_LOCATION}
          onChange={handleChange}
          helperText={getTextFieldHelperText(SamplesFormFields.SAMPLE_LOCATION)}
          value={getValue(SamplesFormFields.SAMPLE_LOCATION)}
          variant={SharedTextFieldVariants.STANDARD}
          InputProps={{
            readOnly: isReadOnlyMode,
          }}
        />
        <Stack {...getStackFieldProps()}>
          <TextField
            required
            error={!!formFieldsErrors[SamplesFormFields.RESPONSABLE]}
            label={SAMPLE_RESPONSABLE_LABEL_TEXT}
            sx={SampleFormStyles.texfield}
            type="string"
            color={SharedButtonColors.PRIMARY}
            size={SharedButtonSizes.SMALL}
            name={SamplesFormFields.RESPONSABLE}
            onChange={handleChange}
            helperText={getTextFieldHelperText(SamplesFormFields.RESPONSABLE)}
            value={getValue(SamplesFormFields.RESPONSABLE)}
            variant={SharedTextFieldVariants.STANDARD}
            InputProps={{
              readOnly: isReadOnlyMode,
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
