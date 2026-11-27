import {useInterfaceTranslation} from "../../../../shared/i18n/useInterfaceTranslation";
import LoginOutlined from "@mui/icons-material/LoginOutlined";
import {Box, Button, FormControl, TextField} from "@mui/material";
import {
  API_FIELD_LIMITS,
  exceedsLength,
  isEmpty,
  isMissingPassword,
  LOGIN_FORM_PASSWORD_LABEL_TEXT,
  LOGIN_FORM_SIGN_IN,
  LOGIN_FORM_USERNAME_LABEL_TEXT,
} from "../../../../utils/constants";
import {useForm} from "../../../../utils/hooks";
import {useEffect, useMemo} from "react";
import {
  SharedButtonColors,
  SharedButtonVariants,
  SignInFormFields,
  SnackBarSeverity,
} from "../../../../utils/enums";
import {useSignIn} from "../model/useSignIn";
import {LoginFormStyles} from "./LoginFormStyles";
import {formToSignInRequest} from "../lib/userServiceMappers";
import {selectShowSnackBarMessage, useSnackBarStore} from "../../../snackbar";

export const SignInForm = () => {
  const {t} = useInterfaceTranslation();
  const formValidations = useMemo(
    () => ({
      username: [isEmpty, exceedsLength(API_FIELD_LIMITS.credential)],
      password: [isMissingPassword, exceedsLength(API_FIELD_LIMITS.credential)],
    }),
    [],
  );

  const {
    isNotValidForm,
    form,
    formFieldsErrors,
    handleChange,
    getTextFieldHelperText,
    setFormFieldsValidationFunctions,
  } = useForm();

  const {handleSignIn, isLoading, errorMessage} = useSignIn();

  const showSnackBarMessage = useSnackBarStore(selectShowSnackBarMessage);

  useEffect(() => {
    setFormFieldsValidationFunctions(formValidations);
  }, [setFormFieldsValidationFunctions, formValidations]);

  useEffect(() => {
    if (errorMessage) {
      showSnackBarMessage(errorMessage, SnackBarSeverity.ERROR);
    }
  }, [errorMessage, showSnackBarMessage]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isNotValidForm || isLoading) return;
    const signInRequest = formToSignInRequest(form);
    await handleSignIn(signInRequest);
  };

  const getIsNotValidForm = () => {
    return isNotValidForm || isLoading;
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      method="post"
      noValidate
      sx={LoginFormStyles.form}
    >
      <FormControl error={!!formFieldsErrors[SignInFormFields.USERNAME]}>
        <TextField
          id="username"
          required
          name={SignInFormFields.USERNAME}
          label={t(LOGIN_FORM_USERNAME_LABEL_TEXT)}
          variant="outlined"
          value={form.username || ""}
          onChange={handleChange}
          error={!!formFieldsErrors[SignInFormFields.USERNAME]}
          helperText={t(getTextFieldHelperText(SignInFormFields.USERNAME))}
          autoComplete="username"
          size="small"
        />
      </FormControl>

      <FormControl error={!!formFieldsErrors[SignInFormFields.PASSWORD]}>
        <TextField
          id="password"
          required
          name={SignInFormFields.PASSWORD}
          label={t(LOGIN_FORM_PASSWORD_LABEL_TEXT)}
          variant={SharedButtonVariants.OUTLINED}
          type="password"
          value={form.password || ""}
          onChange={handleChange}
          error={!!formFieldsErrors[SignInFormFields.PASSWORD]}
          helperText={t(getTextFieldHelperText(SignInFormFields.PASSWORD))}
          autoComplete="current-password"
          size="small"
        />
      </FormControl>
      <Button
        type="submit"
        startIcon={<LoginOutlined />}
        variant={SharedButtonVariants.CONTAINED}
        color={SharedButtonColors.PRIMARY}
        disabled={getIsNotValidForm()}
      >
        {t(LOGIN_FORM_SIGN_IN)}
      </Button>
    </Box>
  );
};
