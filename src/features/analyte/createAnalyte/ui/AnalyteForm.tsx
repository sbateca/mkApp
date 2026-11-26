import {useInterfaceTranslation} from "../../../../shared/i18n/useInterfaceTranslation";
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
  formActionsSx,
  formSectionSx,
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
import {AnalyteDetailButtons} from "./AnalyteDetailButtons";
import {getAutoCompleteOptionsFromModel} from "../../../../utils/model";

type AnalyteFormProps = {
  isLessThanMediumScreen: boolean;
};

export const AnalyteForm = ({isLessThanMediumScreen}: AnalyteFormProps) => {
  const {t} = useInterfaceTranslation();
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
    <Stack {...getStackContainerProps(isLessThanMediumScreen)}>
      <Stack {...getStackRowProps(isLessThanMediumScreen)} sx={formSectionSx}>
        <Stack {...getStackFieldProps()}>
          <TextField
            required
            error={!!formFieldsErrors[AnalyteFormFields.NAME]}
            label={t(AnalyteFormFieldLabels.NAME)}
            type="string"
            color={SharedTypographyColors.PRIMARY}
            size={TextFieldSizes.SMALL}
            onChange={handleChange}
            name={AnalyteFormFields.NAME}
            helperText={t(getTextFieldHelperText(AnalyteFormFields.NAME))}
            value={form[AnalyteFormFields.NAME] ?? ""}
            variant={SharedTextFieldVariants.OUTLINED}
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
            helperText={t(getTextFieldHelperText(AnalyteFormFields.TEST_TYPE))}
            label={t(AnalyteFormFieldLabels.TEST_TYPE)}
            name={AnalyteFormFields.TEST_TYPE}
            options={getAutoCompleteOptionsFromModel(testTypes)}
            onChange={handleAutoCompleteChange}
            readOnly={isReadOnlyMode}
            value={(form[AnalyteFormFields.TEST_TYPE] as string) ?? ""}
            variant={SharedTextFieldVariants.OUTLINED}
          />
        </Stack>
      </Stack>
      <Box sx={formActionsSx}>
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
