import React, {useEffect, useMemo} from "react";
import {useForm} from "../../../utils/hooks";
import {getAutoCompleteOptionsFromModel} from "../../../utils/model";
import dayjs from "dayjs";
import {
  DATEPICKER_FORMAT,
  FormProps,
  isEmpty,
  isNotValidDate,
} from "../../../utils/constants";
import {Sample, sampleToSampleForm} from "../../../entities/sample";

export const useSampleDetailForm = (selectedSample: Sample | null) => {
  const today = React.useMemo(() => dayjs(), []);

  const defaultFormValue = React.useMemo(() => {
    return {
      sampleCode: "",
      sampleType: "",
      client: "",
      getSampleDate: today.format(DATEPICKER_FORMAT),
      receptionDate: today.format(DATEPICKER_FORMAT),
      analysisDate: today.format(DATEPICKER_FORMAT),
      sampleLocation: "",
      responsable: "",
    } as FormProps;
  }, [today]);

  const formValidations = useMemo(
    () => ({
      sampleCode: [isEmpty],
      sampleType: [isEmpty],
      client: [isEmpty],
      getSampleDate: [isEmpty, isNotValidDate],
      receptionDate: [isEmpty, isNotValidDate],
      analysisDate: [isEmpty, isNotValidDate],
      sampleLocation: [isEmpty],
      responsable: [isEmpty],
    }),
    [],
  );

  const {
    isNotValidForm,
    form,
    setForm,
    formFieldsErrors,
    handleChange,
    handleDateChange,
    handleAutoCompleteChange,
    getTextFieldHelperText,
    setFormFieldsValidationFunctions,
    cleanForm,
  } = useForm();

  useEffect(() => {
    setFormFieldsValidationFunctions(formValidations);
  }, [formValidations, setFormFieldsValidationFunctions]);

  useEffect(() => {
    if (selectedSample) {
      setForm(sampleToSampleForm(selectedSample));
      return;
    }
    cleanForm(defaultFormValue);
  }, [cleanForm, defaultFormValue, today, selectedSample, setForm]);

  return {
    form,
    formFieldsErrors,
    getAutoCompleteOptionsFromModel,
    getTextFieldHelperText,
    handleAutoCompleteChange,
    handleChange,
    handleDateChange,
    isNotValidForm,
  };
};
