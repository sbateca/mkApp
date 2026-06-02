import {Box, Stack, TextField} from "@mui/material";
import {
  selectSelectedSampleType,
  useSampleTypeStore,
} from "../../../../entities/sampleType";
import {
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
    <Stack
      {...getStackContainerProps(isLessThanMediumScreen)}
      sx={{position: "relative", height: "100%", minHeight: "100%", pb: "72px"}}
    >
      <Stack {...getStackRowProps(isLessThanMediumScreen)}>
        <Stack {...getStackFieldProps()}>
          <TextField
            required
            error={!!formFieldsErrors[SampleTypeFormFields.NAME]}
            label={SampleTypeFormFieldLabels.NAME}
            type="string"
            color={SharedTypographyColors.PRIMARY}
            size={TextFieldSizes.SMALL}
            onChange={handleChange}
            name={SampleTypeFormFields.NAME}
            helperText={getTextFieldHelperText(SampleTypeFormFields.NAME)}
            value={form[SampleTypeFormFields.NAME] ?? ""}
            variant={SharedTextFieldVariants.STANDARD}
            fullWidth
            InputProps={{
              readOnly: isReadOnlyMode,
            }}
          />
        </Stack>
      </Stack>
      <Box sx={{display: "flex", mt: "auto", mb: "0px"}}>
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
