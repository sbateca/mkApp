import {Box, Stack, TextField} from "@mui/material";
import {
  selectSelectedAnaliye,
  useAnalyteStore,
} from "../../../../entities/analyte";
import {
  selectGetTestTypes,
  selectTestTypes,
  useTestTypeStore,
} from "../../../../entities/testType";
import {
  getStackContainerProps,
  getStackFieldProps,
  getStackRowProps,
} from "../../../../shared/commonStyles";
import {AutoComplete} from "../../../../shared/ui";
import {useForm} from "../../../../utils/hooks";
import {useEffect, useMemo} from "react";
import {isEmpty} from "../../../../utils/constants";
import {
  AnalyteFormFieldLabels,
  AnalyteFormFields,
  SharedTextFieldVariants,
  SharedTypographyColors,
  TextFieldSizes,
} from "../../../../utils/enums";
import {useReadOnlyMode} from "../../../readOnlyMode";
import {useCreateAnalyte} from "../model/useCreateAnalyte";
import {useEditAnalyte} from "../../editAnalyte";
import {analyteToForm} from "../../lib/analyteMappers";
import {AnalyteDetailButtons} from "../../../../widgets/AnalyteDetail/ui/AnalyteDetailButtons";
import {getAutoCompleteOptionsFromModel} from "../../../../utils/model";

type AnalyteFormProps = {
  isLessThanMediumScreen: boolean;
};

export const AnalyteForm = ({isLessThanMediumScreen}: AnalyteFormProps) => {
  const {
    isNotValidForm,
    form,
    setForm,
    formFieldsErrors,
    handleChange,
    handleAutoCompleteChange,
    getTextFieldHelperText,
    setFormFieldsValidationFunctions,
    cleanForm,
  } = useForm();

  const {isReadOnlyMode, handleSwitchReadOnlyMode} = useReadOnlyMode();
  const selectedAnalyte = useAnalyteStore(selectSelectedAnaliye);
  const testTypes = useTestTypeStore(selectTestTypes);
  const getTestTypes = useTestTypeStore(selectGetTestTypes);
  const {handleCreateAnalyte} = useCreateAnalyte(form, testTypes);
  const {handleEditAnalyte} = useEditAnalyte(
    form,
    testTypes,
    selectedAnalyte?.id || "",
  );

  const formValidations = useMemo(
    () => ({
      [AnalyteFormFields.NAME]: [isEmpty],
      [AnalyteFormFields.TEST_TYPE]: [isEmpty],
    }),
    [],
  );

  const emptyForm = useMemo(
    () => ({
      [AnalyteFormFields.NAME]: "",
      [AnalyteFormFields.TEST_TYPE]: "",
    }),
    [],
  );

  useEffect(() => {
    if (!testTypes) getTestTypes();
  }, [getTestTypes, testTypes]);

  useEffect(() => {
    if (selectedAnalyte) setForm(analyteToForm(selectedAnalyte));
    else cleanForm(emptyForm);
  }, [selectedAnalyte, cleanForm, emptyForm, setForm]);

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
            error={!!formFieldsErrors[AnalyteFormFields.NAME]}
            label={AnalyteFormFieldLabels.NAME}
            type="string"
            color={SharedTypographyColors.PRIMARY}
            size={TextFieldSizes.SMALL}
            onChange={handleChange}
            name={AnalyteFormFields.NAME}
            helperText={getTextFieldHelperText(AnalyteFormFields.NAME)}
            value={form[AnalyteFormFields.NAME] ?? ""}
            variant={SharedTextFieldVariants.STANDARD}
            fullWidth
            InputProps={{
              readOnly: isReadOnlyMode,
            }}
          />
        </Stack>
        <Stack {...getStackFieldProps()}>
          <AutoComplete
            required
            error={!!formFieldsErrors[AnalyteFormFields.TEST_TYPE]}
            helperText={getTextFieldHelperText(AnalyteFormFields.TEST_TYPE)}
            label={AnalyteFormFieldLabels.TEST_TYPE}
            name={AnalyteFormFields.TEST_TYPE}
            options={getAutoCompleteOptionsFromModel(testTypes)}
            onChange={handleAutoCompleteChange}
            readOnly={isReadOnlyMode}
            value={(form[AnalyteFormFields.TEST_TYPE] as string) ?? ""}
            variant={SharedTextFieldVariants.STANDARD}
          />
        </Stack>
      </Stack>
      <Box sx={{display: "flex", mt: "auto", mb: "0px"}}>
        <AnalyteDetailButtons
          isNotValidForm={isNotValidForm}
          analyte={selectedAnalyte}
          handleReadOnlyModeChange={handleSwitchReadOnlyMode}
          handleCreateAnalyte={handleCreateAnalyte}
          handleEditAnalyte={handleEditAnalyte}
        />
      </Box>
    </Stack>
  );
};
