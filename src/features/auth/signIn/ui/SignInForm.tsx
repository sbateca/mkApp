import {Box, Button, FormControl, TextField} from "@mui/material";
import {
  isEmpty,
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
  const formValidations = useMemo(
    () => ({
      username: [isEmpty],
      password: [isEmpty],
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

  const {signIn, isLoading, errorMessage} = useSignIn();

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
    const signInRequest = formToSignInRequest(form);
    await signIn(signInRequest);
  };

  const getIsNotValidForm = () => {
    return isNotValidForm || isLoading;
  };

  return (
    <Box sx={LoginFormStyles.container}>
      <form onSubmit={handleSubmit}>
        <Box sx={LoginFormStyles.form}>
          <FormControl error={!!formFieldsErrors[SignInFormFields.USERNAME]}>
            <TextField
              required
              name={SignInFormFields.USERNAME}
              label={LOGIN_FORM_USERNAME_LABEL_TEXT}
              variant="outlined"
              value={form.username || ""}
              onChange={handleChange}
              error={!!formFieldsErrors[SignInFormFields.USERNAME]}
            />
          </FormControl>

          <FormControl error={!!formFieldsErrors[SignInFormFields.PASSWORD]}>
            <TextField
              required
              name={SignInFormFields.PASSWORD}
              label={LOGIN_FORM_PASSWORD_LABEL_TEXT}
              variant={SharedButtonVariants.OUTLINED}
              type="password"
              value={form.password || ""}
              onChange={handleChange}
              error={!!formFieldsErrors[SignInFormFields.PASSWORD]}
              helperText={getTextFieldHelperText(SignInFormFields.PASSWORD)}
            />
          </FormControl>
          <Button
            type="submit"
            variant={SharedButtonVariants.CONTAINED}
            color={SharedButtonColors.PRIMARY}
            disabled={getIsNotValidForm()}
          >
            {LOGIN_FORM_SIGN_IN}
          </Button>
        </Box>
      </form>
    </Box>
  );
};
