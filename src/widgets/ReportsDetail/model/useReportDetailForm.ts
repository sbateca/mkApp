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
      reportNumber: [isEmpty],
      sampleId: [isEmpty],
    }),
    [],
  );

  const emptyForm = useMemo(
    () => ({
      reportDate: today.format(DATEPICKER_FORMAT),
      reportNumber: "",
      sampleId: "",
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
    if (selectedReport || form.reportType) {
      setForm(reportToReportForm(selectedReport));
      return;
    }
    cleanForm(emptyForm);
  }, [selectedReport, setForm, cleanForm, today, emptyForm]);

  return {
    isNotValidForm,
    form,
    setForm,
    formValidations,
    formFieldsErrors,
    handleChange,
    handleDateChange,
    handleAutoCompleteChange,
    getTextFieldHelperText,
    setFormFieldsValidationFunctions,
    cleanForm,
  };
};
