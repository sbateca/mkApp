import {Box, Stack, TextField} from "@mui/material";
import {
  selectSelectedAnalysisMethod,
  useAnalysisMethodsStore,
} from "../../../../entities/analysisMethod";
import {
  getStackContainerProps,
  getStackFieldProps,
  getStackRowProps,
} from "../../../../shared/commonStyles";
import {useForm} from "../../../../utils/hooks";
import {useEffect, useMemo} from "react";
import {isEmpty} from "../../../../utils/constants";
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
import {AnalysisMethodDetailButtons} from "../../../../widgets/AnalysisMethodDetail/ui/AnalysisMethodDetailButtons";

type AnalysisMethodFormProps = {
  isLessThanMediumScreen: boolean;
};

export const AnalysisMethodForm = ({
  isLessThanMediumScreen,
}: AnalysisMethodFormProps) => {
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
      [AnalysisMethodFormFields.NAME]: [isEmpty],
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
    <Stack
      {...getStackContainerProps(isLessThanMediumScreen)}
      sx={{position: "relative", height: "100%", minHeight: "100%", pb: "72px"}}
    >
      <Stack {...getStackRowProps(isLessThanMediumScreen)}>
        <Stack {...getStackFieldProps()}>
          <TextField
            required
            error={!!formFieldsErrors[AnalysisMethodFormFields.NAME]}
            label={AnalysisMethodFormFieldLabels.NAME}
            type="string"
            color={SharedTypographyColors.PRIMARY}
            size={TextFieldSizes.SMALL}
            onChange={handleChange}
            name={AnalysisMethodFormFields.NAME}
            helperText={getTextFieldHelperText(AnalysisMethodFormFields.NAME)}
            value={form[AnalysisMethodFormFields.NAME] ?? ""}
            variant={SharedTextFieldVariants.STANDARD}
            fullWidth
            InputProps={{
              readOnly: isReadOnlyMode,
            }}
          />
        </Stack>
      </Stack>
      <Box sx={{display: "flex", mt: "auto", mb: "0px"}}>
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
