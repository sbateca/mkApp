import {useInterfaceTranslation} from "../../../../shared/i18n/useInterfaceTranslation";
import {Box, Stack, TextField} from "@mui/material";
import {
  selectSelectedCriteria,
  useCriteriaStore,
} from "../../../../entities/criteria";
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
  CriteriaFormFieldLabels,
  CriteriaFormFields,
  SharedTextFieldVariants,
  SharedTypographyColors,
  TextFieldSizes,
} from "../../../../utils/enums";
import {useReadOnlyMode} from "../../../readOnlyMode";
import {useCreateCriteria} from "../model/useCreateCriteria";
import {useEditCriteria} from "../../editCriteria";
import {criteriaToForm} from "../../lib/criteriaMappers";
import {CriteriaDetailButtons} from "./CriteriaDetailButtons";

type CriteriaFormProps = {
  isLessThanMediumScreen: boolean;
};

export const CriteriaForm = ({isLessThanMediumScreen}: CriteriaFormProps) => {
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
  const selectedCriteria = useCriteriaStore(selectSelectedCriteria);
  const {handleCreateCriteria} = useCreateCriteria(form);
  const {handleEditCriteria} = useEditCriteria(
    form,
    selectedCriteria?.id || "",
  );

  const formValidations = useMemo(
    () => ({
      [CriteriaFormFields.NAME]: [isEmpty],
    }),
    [],
  );

  const emptyForm = useMemo(
    () => ({
      [CriteriaFormFields.NAME]: "",
    }),
    [],
  );

  useEffect(() => {
    if (selectedCriteria) setForm(criteriaToForm(selectedCriteria));
    else cleanForm(emptyForm);
  }, [selectedCriteria, cleanForm, emptyForm, setForm]);

  useEffect(() => {
    setFormFieldsValidationFunctions(formValidations);
  }, [setFormFieldsValidationFunctions, formValidations]);

  return (
    <Stack {...getStackContainerProps(isLessThanMediumScreen)}>
      <Stack {...getStackRowProps(isLessThanMediumScreen)} sx={formSectionSx}>
        <Stack {...getStackFieldProps()}>
          <TextField
            required
            error={!!formFieldsErrors[CriteriaFormFields.NAME]}
            label={t(CriteriaFormFieldLabels.NAME)}
            type="string"
            color={SharedTypographyColors.PRIMARY}
            size={TextFieldSizes.SMALL}
            onChange={handleChange}
            name={CriteriaFormFields.NAME}
            helperText={t(getTextFieldHelperText(CriteriaFormFields.NAME))}
            value={form[CriteriaFormFields.NAME] ?? ""}
            variant={SharedTextFieldVariants.OUTLINED}
            fullWidth
            InputProps={{
              readOnly: isReadOnlyMode,
            }}
          />
        </Stack>
      </Stack>
      <Box sx={formActionsSx}>
        <CriteriaDetailButtons
          isNotValidForm={isNotValidForm}
          criteria={selectedCriteria}
          handleReadOnlyModeChange={handleSwitchReadOnlyMode}
          handleCreateCriteria={handleCreateCriteria}
          handleEditCriteria={handleEditCriteria}
        />
      </Box>
    </Stack>
  );
};
