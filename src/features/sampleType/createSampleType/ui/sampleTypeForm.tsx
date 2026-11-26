import {useInterfaceTranslation} from "../../../../shared/i18n/useInterfaceTranslation";
import {Box, Stack, TextField} from "@mui/material";
import {
  selectSelectedSampleType,
  useSampleTypeStore,
} from "../../../../entities/sampleType";
import {
  formActionsSx,
  formSectionSx,
  getStackContainerProps,
  getStackFieldProps,
  getStackRowProps,
} from "../../../../shared/commonStyles";
import {useForm} from "../../../../utils/hooks";
import {useEffect, useMemo} from "react";
import {isEmpty} from "../../../../utils/constants";
import {
  SampleTypeFormFieldLabels,
  SampleTypeFormFields,
  SharedTextFieldVariants,
  SharedTypographyColors,
  TextFieldSizes,
} from "../../../../utils/enums";
import {useCreateSampleType} from "../model/useCreateSampleType";
import {SampleTypeDetailButtons} from "./SampleTypeDetailButtons";
import {useEditSampleType} from "../../editSampleType";
import {sampleTypeToForm} from "../../lib/sampleTypeMappers";
import {useReadOnlyMode} from "../../../readOnlyMode";

type SampleTypeFormProps = {
  isLessThanMediumScreen: boolean;
};

export const SampleTypeForm = ({
  isLessThanMediumScreen,
}: SampleTypeFormProps) => {
  const {t} = useInterfaceTranslation();
  const {
    isNotValidForm,
    form,
    setForm,
    formFieldsErrors,
    handleChange,
    getTextFieldHelperText,
    setFormFieldsValidationFunctions,
    cleanForm,
  } = useForm();

  const {isReadOnlyMode, handleSwitchReadOnlyMode} = useReadOnlyMode();

  const selectedSampleType = useSampleTypeStore(selectSelectedSampleType);
  const {handleCreateSampleType} = useCreateSampleType(form);
  const {handleEditSampleType} = useEditSampleType(
    form,
    selectedSampleType?.id || "",
  );

  const formValidations = useMemo(
    () => ({
      name: [isEmpty],
    }),
    [],
  );

  const emptyForm = useMemo(
    () => ({
      name: "",
    }),
    [],
  );

  useEffect(() => {
    if (selectedSampleType) setForm(sampleTypeToForm(selectedSampleType));
    else cleanForm(emptyForm);
  }, [selectedSampleType, cleanForm, emptyForm, setForm]);

  useEffect(() => {
    setFormFieldsValidationFunctions(formValidations);
  }, [setFormFieldsValidationFunctions, formValidations]);

  return (
    <Stack {...getStackContainerProps(isLessThanMediumScreen)}>
      <Stack {...getStackRowProps(isLessThanMediumScreen)} sx={formSectionSx}>
        <Stack {...getStackFieldProps()}>
          <TextField
            required
            error={!!formFieldsErrors[SampleTypeFormFields.NAME]}
            label={t(SampleTypeFormFieldLabels.NAME)}
            type="string"
            color={SharedTypographyColors.PRIMARY}
            size={TextFieldSizes.SMALL}
            onChange={handleChange}
            name={SampleTypeFormFields.NAME}
            helperText={t(getTextFieldHelperText(SampleTypeFormFields.NAME))}
            value={form[SampleTypeFormFields.NAME] ?? ""}
            variant={SharedTextFieldVariants.OUTLINED}
            fullWidth
            InputProps={{
              readOnly: isReadOnlyMode,
            }}
          />
        </Stack>
      </Stack>
      <Box sx={formActionsSx}>
        <SampleTypeDetailButtons
          isNotValidForm={isNotValidForm}
          sampleType={selectedSampleType}
          handleReadOnlyModeChange={handleSwitchReadOnlyMode}
          handleCreateSampleType={handleCreateSampleType}
          handleEditSampleType={handleEditSampleType}
        />
      </Box>
    </Stack>
  );
};
