import {ChangeEvent, SyntheticEvent, useEffect, useState} from "react";

import {SelectChangeEvent} from "@mui/material";
import {Dayjs} from "dayjs";

import {AutoCompleteOption} from "../../components/molecules/AutoComplete/types";
import {FormProps, DATEPICKER_FORMAT} from "../constants";
import React from "react";

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
  const [isNotValidForm, setIsNotValidForm] = useState<boolean>(true);
  const [formFieldsValidationFunctions, setFormFieldsValidationFunctions] =
    useState<FieldValidations>({});

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setForm((prevForm: FormProps) => {
      const updatedForm = {
        ...prevForm,
        [name]: value,
      };
      updateErrorsObject(name, value);
      checkNotValidForm(formFieldsErrors);
      return updatedForm;
    });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const {name, value} = event.target;
    setForm((prevForm: FormProps) => {
      const updatedForm = {
        ...prevForm,
        [name]: value,
      };
      updateErrorsObject(name, value);
      checkNotValidForm(formFieldsErrors);
      return updatedForm;
    });
  };

  const handleDateChange = (value: Dayjs | null, fieldName: string) => {
    setForm((prevForm: FormProps) => {
      const updatedForm = {
        ...prevForm,
        [fieldName]: getDateValue(value),
      };
      updateErrorsObject(fieldName, getDateValue(value));
      checkNotValidForm(formFieldsErrors);
      return updatedForm;
    });
  };

  const getDateValue = (value: Dayjs | null): string => {
    if (value) {
      if (value?.isValid()) {
        return value.format(DATEPICKER_FORMAT);
      } else return value.toString();
    } else return "";
  };

  const handleAutoCompleteChange = (
    _: SyntheticEvent,
    newValue: AutoCompleteOption | null,
    name: string,
  ) => {
    setForm((prevForm: FormProps) => {
      const updatedForm = {
        ...prevForm,
        [name]: newValue?.id || "",
      };
      updateErrorsObject(name, newValue?.optionLabel || "");
      checkNotValidForm(formFieldsErrors);
      return updatedForm;
    });
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

  const checkNotValidForm = (fieldErrors: FormError): boolean => {
    const emptyFields = Object.keys(formFieldsValidationFunctions).filter(
      (fieldName) => !form[fieldName],
    );
    return Object.keys(fieldErrors).length > 0 || emptyFields.length > 0;
  };

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
      setForm((prevForm: FormProps) => {
        const updatedForm = {
          ...prevForm,
          [value]: defaultValues[value],
        };
        checkNotValidForm(formFieldsErrors);
        return updatedForm;
      });
    });
  };

  useEffect(() => {
    setIsNotValidForm(checkNotValidForm(formFieldsErrors));
  }, [formFieldsErrors, formFieldsValidationFunctions]);

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
