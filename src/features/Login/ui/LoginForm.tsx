import {ChangeEvent, useState} from "react";
import {Navigate} from "react-router-dom";

import {FormControl, Button, Box, FormHelperText} from "@mui/material";

import {LoginFormStyles} from "./LoginFormStyles";
import {LoginFormProps} from "./Types";
import {getUserByUserName} from "../../../services";
import {
  LOCAL_STORAGE_USER_KEY,
  LOGIN_ERROR_ACCESS_DENIED_MESSAGE,
  LOGIN_FORM_SIGN_IN,
  REQUIRED_FIELD_ERROR_TEXT,
} from "../../../utils/constants";
import {TextField} from "../../../shared/ui";

export const LoginForm = ({fields}: LoginFormProps): React.ReactElement => {
  const [fieldsValues, setFieldsValues] = useState<{[key: string]: string}>({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const field = event.target.name;
    setFieldsValues((prevFieldsValues) => ({
      ...prevFieldsValues,
      [field]: event.target.value,
    }));
    resetTextFieldError(field);
  };

  const buildParametersObject = (fields: {[key: string]: string}) => {
    const parameters: {[key: string]: string} = {};
    Object.keys(fields).forEach((key) => {
      parameters[key] = fields[key].trim();
    });
    return parameters;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const requestParameters = buildParametersObject(fieldsValues);
      const response = await getUserByUserName(requestParameters);
      if (response.length > 0) {
        localStorage.setItem(
          LOCAL_STORAGE_USER_KEY,
          JSON.stringify(response[0]),
        );
        setIsLoggedIn(true);
      } else {
        setErrors({form: LOGIN_ERROR_ACCESS_DENIED_MESSAGE});
      }
    } catch (error) {
      setErrors({form: (error as unknown as Error).message});
    }
  };

  const isFieldRequired = (field: string): boolean | undefined => {
    return fields.find((item) => item.name === field)?.isRequired;
  };

  const handleBlur = (field: string) => {
    if (!field) return;
    if (!errors[field] && !fieldsValues[field] && isFieldRequired(field)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: REQUIRED_FIELD_ERROR_TEXT,
      }));
    }
  };

  const resetTextFieldError = (field: string) => {
    const newErrors = {...errors};
    delete newErrors[field];
    setErrors(newErrors);
  };

  return (
    <Box sx={LoginFormStyles.container}>
      {isLoggedIn ? (
        <Navigate to="/admin" />
      ) : (
        <form onSubmit={handleSubmit}>
          <Box sx={LoginFormStyles.form}>
            {fields.map((fieldItem) => (
              <FormControl
                required={fieldItem.isRequired}
                error={!!errors[fieldItem.name]}
                key={fieldItem.name}
              >
                <TextField
                  name={fieldItem.name}
                  label={fieldItem.label}
                  variant="outlined"
                  type={fieldItem.type}
                  value={fieldsValues[fieldItem.name]?.trim() || ""}
                  onChange={handleFieldChange}
                  onBlur={() => handleBlur(fieldItem.name)}
                  isRequired={fieldItem.isRequired}
                  hasError={!!errors[fieldItem.name]}
                />
                {errors[fieldItem.name] && (
                  <FormHelperText>{errors[fieldItem.name]}</FormHelperText>
                )}
              </FormControl>
            ))}
            {errors["form"] && (
              <FormHelperText sx={{color: "red"}}>
                {errors["form"]}
              </FormHelperText>
            )}
            <Button type="submit" variant="contained" color="primary">
              {LOGIN_FORM_SIGN_IN}
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};
