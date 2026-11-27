import {useInterfaceTranslation} from "../../../shared/i18n/useInterfaceTranslation";
import {LocalizedDateProvider} from "../../../shared/i18n/LocalizedDateProvider";
import {Stack, TextField, Typography} from "@mui/material";
import {AutoComplete} from "../../../shared/ui";
import {DatePicker} from "@mui/x-date-pickers";
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
import {SampleFormStyles} from "./SampleDetailStyles";
import dayjs from "dayjs";
import React from "react";
import {FormError} from "../../../utils/hooks";
import {GenericModelWithId} from "../../../utils/model";
import {AutoCompleteOption} from "../../../shared/ui/AutoComplete/types";
import {Client} from "../../../entities/client";
import {SampleType} from "../../../entities/sampleType";
import {
  formSectionSx,
  getStackContainerProps,
  getStackFieldProps,
  getStackRowProps,
} from "../../../shared/commonStyles";
import {useReadOnlyMode} from "../../../features/readOnlyMode";

export type DetailFormProps = {
  clients: Client[] | null;
  canChangeClient?: boolean;
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
  sampleTypes: SampleType[] | null;
};

export const SampleDetailForm = ({
  clients,
  canChangeClient = true,
  form,
  formFieldsErrors,
  getAutoCompleteOptionsFromModel,
  getTextFieldHelperText,
  handleAutoCompleteChange,
  handleChange,
  handleDateChange,
  isLessThanMediumScreen,
  sampleTypes,
}: DetailFormProps) => {
  const {t} = useInterfaceTranslation();
  const today = React.useMemo(() => dayjs(), []);
  const getValue = (fieldName: string): string =>
    getFormStringValue(form, fieldName);

  const {isReadOnlyMode} = useReadOnlyMode();

  return (
    <Stack {...getStackContainerProps(isLessThanMediumScreen)} sx={{mb: 2}}>
      <Stack gap={2} sx={formSectionSx}>
        <Typography component="h2" fontWeight={750}>
          {t("Sample details")}
        </Typography>
        <Stack {...getStackRowProps(isLessThanMediumScreen)}>
          <Stack {...getStackFieldProps()}>
            <TextField
              required
              error={!!formFieldsErrors[SamplesFormFields.SAMPLE_CODE]}
              label={t(SAMPLE_CODE_LABEL_TEXT)}
              color={SharedButtonColors.PRIMARY}
              size={SharedButtonSizes.SMALL}
              name={SamplesFormFields.SAMPLE_CODE}
              onChange={handleChange}
              helperText={t(
                getTextFieldHelperText(SamplesFormFields.SAMPLE_CODE),
              )}
              value={getValue(SamplesFormFields.SAMPLE_CODE)}
              variant={SharedTextFieldVariants.OUTLINED}
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
              label={t(SAMPLE_TYPE_LABEL_TEXT)}
              value={getValue(SamplesFormFields.SAMPLE_TYPE)}
              variant={SelectVariants.OUTLINED}
              onChange={handleAutoCompleteChange}
              name={SamplesFormFields.SAMPLE_TYPE}
              readOnly={isReadOnlyMode}
              error={!!formFieldsErrors[SamplesFormFields.SAMPLE_TYPE]}
              helperText={t(
                getTextFieldHelperText(SamplesFormFields.SAMPLE_TYPE),
              )}
              required
            />
          </Stack>
        </Stack>
        <Stack {...getStackRowProps(isLessThanMediumScreen)}>
          <Stack {...getStackFieldProps()}>
            <AutoComplete
              options={getAutoCompleteOptionsFromModel(clients)}
              label={t(SAMPLE_CLIENT_LABEL_TEXT)}
              value={getValue(SamplesFormFields.CLIENT)}
              variant={SelectVariants.OUTLINED}
              onChange={handleAutoCompleteChange}
              name={SamplesFormFields.CLIENT}
              readOnly={isReadOnlyMode || !canChangeClient}
              error={!!formFieldsErrors[SamplesFormFields.CLIENT]}
              helperText={t(getTextFieldHelperText(SamplesFormFields.CLIENT))}
              required
            />
          </Stack>
          <Stack {...getStackFieldProps()}>
            <LocalizedDateProvider>
              <DatePicker
                views={DATEPICKER_VIEWS}
                label={t(SAMPLE_GET_SAMPLE_DATE_LABEL_TEXT)}
                name={SamplesFormFields.GET_SAMPLE_DATE}
                onChange={(value) =>
                  handleDateChange(value, SamplesFormFields.GET_SAMPLE_DATE)
                }
                slotProps={{
                  textField: {
                    required: true,
                    error:
                      !!formFieldsErrors[SamplesFormFields.GET_SAMPLE_DATE],
                    helperText: t(
                      getTextFieldHelperText(SamplesFormFields.GET_SAMPLE_DATE),
                    ),
                    variant: SharedTextFieldVariants.OUTLINED,
                    size: "small",
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
            </LocalizedDateProvider>
          </Stack>
        </Stack>
      </Stack>
      <Stack gap={2} sx={formSectionSx}>
        <Typography component="h2" fontWeight={750}>
          {t("Processing and location")}
        </Typography>
        <Stack {...getStackRowProps(isLessThanMediumScreen)}>
          <Stack {...getStackFieldProps()}>
            <LocalizedDateProvider>
              <DatePicker
                defaultValue={today}
                views={DATEPICKER_VIEWS}
                label={t(SAMPLE_RECEPTION_DATE_LABEL_TEXT)}
                name={SamplesFormFields.RECEPTION_DATE}
                onChange={(value) =>
                  handleDateChange(value, SamplesFormFields.RECEPTION_DATE)
                }
                slotProps={{
                  textField: {
                    required: true,
                    error: !!formFieldsErrors[SamplesFormFields.RECEPTION_DATE],
                    helperText: t(
                      getTextFieldHelperText(SamplesFormFields.RECEPTION_DATE),
                    ),
                    variant: SharedTextFieldVariants.OUTLINED,
                    size: "small",
                  },
                }}
                value={
                  getValue(SamplesFormFields.RECEPTION_DATE)
                    ? dayjs(getValue(SamplesFormFields.RECEPTION_DATE))
                    : null
                }
                readOnly={isReadOnlyMode}
              />
            </LocalizedDateProvider>
          </Stack>
          <Stack {...getStackFieldProps()}>
            <LocalizedDateProvider>
              <DatePicker
                defaultValue={today}
                views={DATEPICKER_VIEWS}
                label={t(SAMPLE_ANALYSIS_DATE_LABEL_TEXT)}
                name={SamplesFormFields.ANALYSIS_DATE}
                onChange={(value) =>
                  handleDateChange(value, SamplesFormFields.ANALYSIS_DATE)
                }
                slotProps={{
                  textField: {
                    required: true,
                    error: !!formFieldsErrors[SamplesFormFields.ANALYSIS_DATE],
                    helperText: t(
                      getTextFieldHelperText(SamplesFormFields.ANALYSIS_DATE),
                    ),
                    variant: SharedTextFieldVariants.OUTLINED,
                    size: "small",
                  },
                }}
                value={
                  getValue(SamplesFormFields.ANALYSIS_DATE)
                    ? dayjs(getValue(SamplesFormFields.ANALYSIS_DATE))
                    : null
                }
                readOnly={isReadOnlyMode}
              />
            </LocalizedDateProvider>
          </Stack>
        </Stack>
        <Stack {...getStackRowProps(isLessThanMediumScreen)}>
          <TextField
            required
            error={!!formFieldsErrors[SamplesFormFields.SAMPLE_LOCATION]}
            label={t(SAMPLE_LOCATION_LABEL_TEXT)}
            sx={SampleFormStyles.texfield}
            type="string"
            color={SharedButtonColors.PRIMARY}
            size={SharedButtonSizes.SMALL}
            name={SamplesFormFields.SAMPLE_LOCATION}
            onChange={handleChange}
            helperText={t(
              getTextFieldHelperText(SamplesFormFields.SAMPLE_LOCATION),
            )}
            value={getValue(SamplesFormFields.SAMPLE_LOCATION)}
            variant={SharedTextFieldVariants.OUTLINED}
            InputProps={{
              readOnly: isReadOnlyMode,
            }}
          />
          <Stack {...getStackFieldProps()}>
            <TextField
              required
              error={!!formFieldsErrors[SamplesFormFields.RESPONSABLE]}
              label={t(SAMPLE_RESPONSABLE_LABEL_TEXT)}
              sx={SampleFormStyles.texfield}
              type="string"
              color={SharedButtonColors.PRIMARY}
              size={SharedButtonSizes.SMALL}
              name={SamplesFormFields.RESPONSABLE}
              onChange={handleChange}
              helperText={t(
                getTextFieldHelperText(SamplesFormFields.RESPONSABLE),
              )}
              value={getValue(SamplesFormFields.RESPONSABLE)}
              variant={SharedTextFieldVariants.OUTLINED}
              InputProps={{
                readOnly: isReadOnlyMode,
              }}
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
