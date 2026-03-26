import React, {useEffect, useMemo} from "react";
import {useForm} from "../../../utils/hooks";
import {reportToReportForm} from "../../../entities/report";
import dayjs from "dayjs";
import {
  DATEPICKER_FORMAT,
  isEmpty,
  isNotValidDate,
} from "../../../utils/constants";
import {Report} from "../../../entities/report/model/Report";

export const useReportDetailForm = (selectedReport: Report | null) => {
  const today = React.useMemo(() => dayjs(), []);

  const formValidations = useMemo(
    () => ({
      reportDate: [isEmpty, isNotValidDate],
      sampleId: [isEmpty],
      analyte: [isEmpty],
      analysisMethod: [isEmpty],
      criteria: [isEmpty],
      result: [isEmpty],
    }),
    [],
  );

  const emptyForm = useMemo(
    () => ({
      reportDate: today.format(DATEPICKER_FORMAT),
      sampleId: "",
      analyte: "",
      analysisMethod: "",
      criteria: "",
      result: "",
    }),
    [today],
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
  }, [setFormFieldsValidationFunctions, formValidations]);

  useEffect(() => {
    if (selectedReport) {
      setForm(reportToReportForm(selectedReport));
      return;
    }
    cleanForm(emptyForm);
  }, [selectedReport, setForm, cleanForm, today, emptyForm]);

  return {
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
  };
};
