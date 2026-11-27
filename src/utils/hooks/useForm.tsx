import React, {ChangeEvent, SyntheticEvent, useState} from "react";

import {SelectChangeEvent} from "@mui/material";
import {Dayjs} from "dayjs";

import {AutoCompleteOption} from "../../shared/ui/AutoComplete/types";
import {FormProps, DATEPICKER_FORMAT} from "../constants";

export interface SampleFormProps {
  form: FormProps;
  formFieldsErrors: FormError;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (value: Dayjs | null, fieldName: string) => void;
  getTextFieldHelperText: (fieldName: string) => string;
}

export interface FormError {
  [key: string]: string[];
}

export interface FieldValidations {
  [key: string]: Array<(fieldValue?: string) => string>;
}

export const useForm = () => {
  const [formFieldsErrors, setFormFieldsErrors] = useState<FormError>({});
  const [form, setForm] = useState<FormProps>({});
  const [formFieldsValidationFunctions, setFormFieldsValidationFunctions] =
    useState<FieldValidations>({});

  const updateField = (name: string, value: string) => {
    setForm((prevForm) => ({...prevForm, [name]: value}));
    updateErrorsObject(name, value);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    updateField(name, value);
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const {name, value} = event.target;
    updateField(name, value);
  };

  const handleDateChange = (value: Dayjs | null, fieldName: string) => {
    const date = value?.isValid()
      ? value.format(DATEPICKER_FORMAT)
      : (value?.toString() ?? "");
    updateField(fieldName, date);
  };

  const handleAutoCompleteChange = (
    _: SyntheticEvent,
    newValue: AutoCompleteOption | null,
    name: string,
  ) => {
    updateField(name, newValue?.id ?? "");
  };

  const updateErrorsObject = (fieldName: string, fieldValue: string) => {
    setFormFieldsErrors((prevErrors) => {
      const updatedErrors = {...prevErrors};
      const formFieldValidationFunctions =
        formFieldsValidationFunctions[fieldName];
      if (formFieldValidationFunctions) {
        const fieldErrors = formFieldValidationFunctions.map(
          (fieldValidationFunction) => fieldValidationFunction(fieldValue),
        );
        const filteredErrors = fieldErrors.filter((error) => error);
        if (filteredErrors.length > 0) {
          updatedErrors[fieldName] = filteredErrors;
        } else {
          delete updatedErrors[fieldName];
        }
      }
      return updatedErrors;
    });
  };

  const isNotValidForm = Object.entries(formFieldsValidationFunctions).some(
    ([name, validators]) =>
      validators.some((validate) => {
        const value = form[name];
        return validate(typeof value === "string" ? value : undefined);
      }),
  );

  const getTextFieldHelperText = (fieldName: string): string => {
    if (formFieldsErrors[fieldName]) {
      return formFieldsErrors[fieldName].join(" / ");
    }
    return "";
  };

  const cleanForm = React.useCallback((defaultFormVFieldValues: FormProps) => {
    setDefaultFormFieldsValues(defaultFormVFieldValues);
    setFormFieldsErrors({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setDefaultFormFieldsValues = (defaultValues: FormProps) => {
    Object.keys(defaultValues).forEach((value) => {
      setForm((prevForm: FormProps) => ({
        ...prevForm,
        [value]: defaultValues[value],
      }));
    });
  };

  return {
    form,
    setForm,
    cleanForm,
    formFieldsErrors,
    handleChange,
    handleDateChange,
    handleSelectChange,
    handleAutoCompleteChange,
    getTextFieldHelperText,
    setFormFieldsValidationFunctions,
    setDefaultFormFieldsValues,
    isNotValidForm,
  };
};
