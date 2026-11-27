import {useInterfaceTranslation} from "../../../../shared/i18n/useInterfaceTranslation";
import {Box, Stack, TextField} from "@mui/material";
import {
  selectSelectedAnalysisMethod,
  useAnalysisMethodsStore,
} from "../../../../entities/analysisMethod";
import {
  formActionsSx,
  formSectionSx,
  getStackContainerProps,
  getStackFieldProps,
  getStackRowProps,
} from "../../../../shared/commonStyles";
import {useForm} from "../../../../utils/hooks";
import {useEffect, useMemo} from "react";
import {
  API_FIELD_LIMITS,
  exceedsLength,
  isEmpty,
} from "../../../../utils/constants";
import {
  AnalysisMethodFormFieldLabels,
  AnalysisMethodFormFields,
  SharedTextFieldVariants,
  SharedTypographyColors,
  TextFieldSizes,
} from "../../../../utils/enums";
import {useReadOnlyMode} from "../../../readOnlyMode";
import {useCreateAnalysisMethod} from "../model/useCreateAnalysisMethod";
import {useEditAnalysisMethod} from "../../editAnalysisMethod";
import {analysisMethodToForm} from "../../lib/analysisMethodMappers";
import {AnalysisMethodDetailButtons} from "./AnalysisMethodDetailButtons";

type AnalysisMethodFormProps = {
  isLessThanMediumScreen: boolean;
};

export const AnalysisMethodForm = ({
  isLessThanMediumScreen,
}: AnalysisMethodFormProps) => {
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
  const selectedAnalysisMethod = useAnalysisMethodsStore(
    selectSelectedAnalysisMethod,
  );
  const {handleCreateAnalysisMethod} = useCreateAnalysisMethod(form);
  const {handleEditAnalysisMethod} = useEditAnalysisMethod(
    form,
    selectedAnalysisMethod?.id || "",
  );

  const formValidations = useMemo(
    () => ({
      [AnalysisMethodFormFields.NAME]: [
        isEmpty,
        exceedsLength(API_FIELD_LIMITS.catalogName),
      ],
    }),
    [],
  );

  const emptyForm = useMemo(
    () => ({
      [AnalysisMethodFormFields.NAME]: "",
    }),
    [],
  );

  useEffect(() => {
    if (selectedAnalysisMethod) {
      setForm(analysisMethodToForm(selectedAnalysisMethod));
    } else cleanForm(emptyForm);
  }, [selectedAnalysisMethod, cleanForm, emptyForm, setForm]);

  useEffect(() => {
    setFormFieldsValidationFunctions(formValidations);
  }, [setFormFieldsValidationFunctions, formValidations]);

  return (
    <Stack {...getStackContainerProps(isLessThanMediumScreen)}>
      <Stack {...getStackRowProps(isLessThanMediumScreen)} sx={formSectionSx}>
        <Stack {...getStackFieldProps()}>
          <TextField
            required
            error={!!formFieldsErrors[AnalysisMethodFormFields.NAME]}
            label={t(AnalysisMethodFormFieldLabels.NAME)}
            type="string"
            color={SharedTypographyColors.PRIMARY}
            size={TextFieldSizes.SMALL}
            onChange={handleChange}
            name={AnalysisMethodFormFields.NAME}
            helperText={t(
              getTextFieldHelperText(AnalysisMethodFormFields.NAME),
            )}
            value={form[AnalysisMethodFormFields.NAME] ?? ""}
            variant={SharedTextFieldVariants.OUTLINED}
            fullWidth
            InputProps={{
              readOnly: isReadOnlyMode,
            }}
          />
        </Stack>
      </Stack>
      <Box sx={formActionsSx}>
        <AnalysisMethodDetailButtons
          isNotValidForm={isNotValidForm}
          analysisMethod={selectedAnalysisMethod}
          handleReadOnlyModeChange={handleSwitchReadOnlyMode}
          handleCreateAnalysisMethod={handleCreateAnalysisMethod}
          handleEditAnalysisMethod={handleEditAnalysisMethod}
        />
      </Box>
    </Stack>
  );
};
