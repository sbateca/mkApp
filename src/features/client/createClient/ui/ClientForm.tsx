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
} from "../../../../shared/commonStyles";
import {type FieldValidations, useForm} from "../../../../utils/hooks";
import {useEffect} from "react";
import {
  API_FIELD_LIMITS,
  exceedsLength,
  isEmpty,
  isNotValidEmailFormat,
  lengthBetween,
} from "../../../../utils/constants";
import {
  SharedTextFieldVariants,
  SharedTypographyColors,
  TextFieldSizes,
} from "../../../../utils/enums";
import {useReadOnlyMode} from "../../../readOnlyMode";
import {useCreateClient} from "../model/useCreateClient";
import {useEditClient} from "../../editClient";
import {clientToForm} from "../../lib/clientMappers";
import {ClientDetailButtons} from "./ClientDetailButtons";

const clientFields = [
  {
    name: "name",
    label: "Name",
    type: "text",
    validators: [isEmpty, exceedsLength(API_FIELD_LIMITS.catalogName)],
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    validators: [isEmpty, isNotValidEmailFormat],
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel",
    validators: [isEmpty, lengthBetween(7, 20)],
  },
  {
    name: "nit",
    label: "NIT",
    type: "text",
    validators: [isEmpty, lengthBetween(5, 50)],
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    validators: [isEmpty, lengthBetween(5, 250)],
  },
] as const;

const formValidations: FieldValidations = {};
for (const {name, validators} of clientFields) {
  formValidations[name] = [...validators];
}

type ClientFormProps = {
  isLessThanMediumScreen: boolean;
};

export const ClientForm = ({isLessThanMediumScreen}: ClientFormProps) => {
  const {t} = useInterfaceTranslation();
  const {
    isNotValidForm,
    form,
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

  useEffect(() => {
    cleanForm(clientToForm(selectedClient));
  }, [selectedClient, cleanForm]);

  useEffect(() => {
    setFormFieldsValidationFunctions(formValidations);
  }, [setFormFieldsValidationFunctions]);

  return (
    <Stack {...getStackContainerProps(isLessThanMediumScreen)}>
      <Box sx={formSectionSx}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "minmax(0, 1fr)",
              sm: "repeat(2, minmax(0, 1fr))",
            },
            gap: 2,
          }}
        >
          {clientFields.map(({name, label, type}) => (
            <TextField
              key={name}
              required
              error={!!formFieldsErrors[name]}
              label={t(label)}
              type={type}
              color={SharedTypographyColors.PRIMARY}
              size={TextFieldSizes.SMALL}
              onChange={handleChange}
              name={name}
              helperText={t(getTextFieldHelperText(name))}
              value={form[name] ?? ""}
              variant={SharedTextFieldVariants.OUTLINED}
              InputProps={{readOnly: isReadOnlyMode}}
              sx={name === "address" ? {gridColumn: "1 / -1"} : undefined}
            />
          ))}
        </Box>
      </Box>
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
