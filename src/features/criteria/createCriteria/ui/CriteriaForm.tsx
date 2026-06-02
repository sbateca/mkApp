import {Box, Stack, TextField} from "@mui/material";
import {
  selectSelectedCriteria,
  useCriteriaStore,
} from "../../../../entities/criteria";
import {
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
import {CriteriaDetailButtons} from "../../../../widgets/CriteriaDetail/ui/CriteriaDetailButtons";

type CriteriaFormProps = {
  isLessThanMediumScreen: boolean;
};

export const CriteriaForm = ({isLessThanMediumScreen}: CriteriaFormProps) => {
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
    <Stack
      {...getStackContainerProps(isLessThanMediumScreen)}
      sx={{position: "relative", height: "100%", minHeight: "100%", pb: "72px"}}
    >
      <Stack {...getStackRowProps(isLessThanMediumScreen)}>
        <Stack {...getStackFieldProps()}>
          <TextField
            required
            error={!!formFieldsErrors[CriteriaFormFields.NAME]}
            label={CriteriaFormFieldLabels.NAME}
            type="string"
            color={SharedTypographyColors.PRIMARY}
            size={TextFieldSizes.SMALL}
            onChange={handleChange}
            name={CriteriaFormFields.NAME}
            helperText={getTextFieldHelperText(CriteriaFormFields.NAME)}
            value={form[CriteriaFormFields.NAME] ?? ""}
            variant={SharedTextFieldVariants.STANDARD}
            fullWidth
            InputProps={{
              readOnly: isReadOnlyMode,
            }}
          />
        </Stack>
      </Stack>
      <Box sx={{display: "flex", mt: "auto", mb: "0px"}}>
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
