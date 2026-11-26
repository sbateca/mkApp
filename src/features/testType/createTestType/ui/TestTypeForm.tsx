import {useInterfaceTranslation} from "../../../../shared/i18n/useInterfaceTranslation";
import {Box, Stack, TextField} from "@mui/material";
import {
  selectSelectedTestType,
  useTestTypeStore,
} from "../../../../entities/testType";
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
  SharedTextFieldVariants,
  SharedTypographyColors,
  TestTypeFormFieldLabels,
  TestTypeFormFields,
  TextFieldSizes,
} from "../../../../utils/enums";
import {useReadOnlyMode} from "../../../readOnlyMode";
import {useCreateTestType} from "../model/useCreateTestType";
import {useEditTestType} from "../../editTestType";
import {testTypeToForm} from "../../lib/testTypeMappers";
import {TestTypeDetailButtons} from "./TestTypeDetailButtons";

type TestTypeFormProps = {
  isLessThanMediumScreen: boolean;
};

export const TestTypeForm = ({isLessThanMediumScreen}: TestTypeFormProps) => {
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
  const selectedTestType = useTestTypeStore(selectSelectedTestType);
  const {handleCreateTestType} = useCreateTestType(form);
  const {handleEditTestType} = useEditTestType(
    form,
    selectedTestType?.id || "",
  );

  const formValidations = useMemo(
    () => ({
      [TestTypeFormFields.NAME]: [isEmpty],
    }),
    [],
  );

  const emptyForm = useMemo(
    () => ({
      [TestTypeFormFields.NAME]: "",
    }),
    [],
  );

  useEffect(() => {
    if (selectedTestType) setForm(testTypeToForm(selectedTestType));
    else cleanForm(emptyForm);
  }, [selectedTestType, cleanForm, emptyForm, setForm]);

  useEffect(() => {
    setFormFieldsValidationFunctions(formValidations);
  }, [setFormFieldsValidationFunctions, formValidations]);

  return (
    <Stack {...getStackContainerProps(isLessThanMediumScreen)}>
      <Stack {...getStackRowProps(isLessThanMediumScreen)} sx={formSectionSx}>
        <Stack {...getStackFieldProps()}>
          <TextField
            required
            error={!!formFieldsErrors[TestTypeFormFields.NAME]}
            label={t(TestTypeFormFieldLabels.NAME)}
            type="string"
            color={SharedTypographyColors.PRIMARY}
            size={TextFieldSizes.SMALL}
            onChange={handleChange}
            name={TestTypeFormFields.NAME}
            helperText={t(getTextFieldHelperText(TestTypeFormFields.NAME))}
            value={form[TestTypeFormFields.NAME] ?? ""}
            variant={SharedTextFieldVariants.OUTLINED}
            fullWidth
            InputProps={{
              readOnly: isReadOnlyMode,
            }}
          />
        </Stack>
      </Stack>
      <Box sx={formActionsSx}>
        <TestTypeDetailButtons
          isNotValidForm={isNotValidForm}
          testType={selectedTestType}
          handleReadOnlyModeChange={handleSwitchReadOnlyMode}
          handleCreateTestType={handleCreateTestType}
          handleEditTestType={handleEditTestType}
        />
      </Box>
    </Stack>
  );
};
