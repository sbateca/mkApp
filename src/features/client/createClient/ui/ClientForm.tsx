import {Box, Stack, TextField} from "@mui/material";
import {
  selectSelectedClient,
  useClientStore,
} from "../../../../entities/client";
import {
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
import {ClientDetailButtons} from "../../../../widgets/ClientDetail/ui/ClientDetailButtons";

type ClientFormProps = {
  isLessThanMediumScreen: boolean;
};

export const ClientForm = ({isLessThanMediumScreen}: ClientFormProps) => {
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
    <Stack
      {...getStackContainerProps(isLessThanMediumScreen)}
      sx={{position: "relative", height: "100%", minHeight: "100%", pb: "72px"}}
    >
      <Stack {...getStackRowProps(isLessThanMediumScreen)}>
        <Stack {...getStackFieldProps()}>
          <TextField
            required
            error={!!formFieldsErrors[ClientFormFields.NAME]}
            label={ClientFormFieldLabels.NAME}
            type="string"
            color={SharedTypographyColors.PRIMARY}
            size={TextFieldSizes.SMALL}
            onChange={handleChange}
            name={ClientFormFields.NAME}
            helperText={getTextFieldHelperText(ClientFormFields.NAME)}
            value={form[ClientFormFields.NAME] ?? ""}
            variant={SharedTextFieldVariants.STANDARD}
            fullWidth
            InputProps={{
              readOnly: isReadOnlyMode,
            }}
          />
        </Stack>
      </Stack>
      <Box sx={{display: "flex", mt: "auto", mb: "0px"}}>
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
