import {useInterfaceTranslation} from "../../../../shared/i18n/useInterfaceTranslation";
import {Box, Stack, TextField} from "@mui/material";
import {
  selectSelectedClient,
  useClientStore,
} from "../../../../entities/client";
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
  ClientFormFieldLabels,
  ClientFormFields,
  SharedTextFieldVariants,
  SharedTypographyColors,
  TextFieldSizes,
} from "../../../../utils/enums";
import {useReadOnlyMode} from "../../../readOnlyMode";
import {useCreateClient} from "../model/useCreateClient";
import {useEditClient} from "../../editClient";
import {clientToForm} from "../../lib/clientMappers";
import {ClientDetailButtons} from "./ClientDetailButtons";

type ClientFormProps = {
  isLessThanMediumScreen: boolean;
};

export const ClientForm = ({isLessThanMediumScreen}: ClientFormProps) => {
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
  const selectedClient = useClientStore(selectSelectedClient);
  const {handleCreateClient} = useCreateClient(form);
  const {handleEditClient} = useEditClient(form, selectedClient?.id || "");

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
    if (selectedClient) setForm(clientToForm(selectedClient));
    else cleanForm(emptyForm);
  }, [selectedClient, cleanForm, emptyForm, setForm]);

  useEffect(() => {
    setFormFieldsValidationFunctions(formValidations);
  }, [setFormFieldsValidationFunctions, formValidations]);

  return (
    <Stack {...getStackContainerProps(isLessThanMediumScreen)}>
      <Stack {...getStackRowProps(isLessThanMediumScreen)} sx={formSectionSx}>
        <Stack {...getStackFieldProps()}>
          <TextField
            required
            error={!!formFieldsErrors[ClientFormFields.NAME]}
            label={t(ClientFormFieldLabels.NAME)}
            type="string"
            color={SharedTypographyColors.PRIMARY}
            size={TextFieldSizes.SMALL}
            onChange={handleChange}
            name={ClientFormFields.NAME}
            helperText={t(getTextFieldHelperText(ClientFormFields.NAME))}
            value={form[ClientFormFields.NAME] ?? ""}
            variant={SharedTextFieldVariants.OUTLINED}
            fullWidth
            InputProps={{
              readOnly: isReadOnlyMode,
            }}
          />
        </Stack>
      </Stack>
      <Box sx={formActionsSx}>
        <ClientDetailButtons
          isNotValidForm={isNotValidForm}
          client={selectedClient}
          handleReadOnlyModeChange={handleSwitchReadOnlyMode}
          handleCreateClient={handleCreateClient}
          handleEditClient={handleEditClient}
        />
      </Box>
    </Stack>
  );
};
