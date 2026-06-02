import {Box, Stack, TextField} from "@mui/material";
import {
  selectSelectedTestType,
  useTestTypeStore,
} from "../../../../entities/testType";
import {
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
import {TestTypeDetailButtons} from "../../../../widgets/TestTypeDetail/ui/TestTypeDetailButtons";

type TestTypeFormProps = {
  isLessThanMediumScreen: boolean;
};

export const TestTypeForm = ({isLessThanMediumScreen}: TestTypeFormProps) => {
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
    <Stack
      {...getStackContainerProps(isLessThanMediumScreen)}
      sx={{position: "relative", height: "100%", minHeight: "100%", pb: "72px"}}
    >
      <Stack {...getStackRowProps(isLessThanMediumScreen)}>
        <Stack {...getStackFieldProps()}>
          <TextField
            required
            error={!!formFieldsErrors[TestTypeFormFields.NAME]}
            label={TestTypeFormFieldLabels.NAME}
            type="string"
            color={SharedTypographyColors.PRIMARY}
            size={TextFieldSizes.SMALL}
            onChange={handleChange}
            name={TestTypeFormFields.NAME}
            helperText={getTextFieldHelperText(TestTypeFormFields.NAME)}
            value={form[TestTypeFormFields.NAME] ?? ""}
            variant={SharedTextFieldVariants.STANDARD}
            fullWidth
            InputProps={{
              readOnly: isReadOnlyMode,
            }}
          />
        </Stack>
      </Stack>
      <Box sx={{display: "flex", mt: "auto", mb: "0px"}}>
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
