import React, {useEffect, useMemo, useState} from "react";
import {useForm} from "../../../utils/hooks";
import {reportToReportForm} from "../../../entities/report";
import dayjs from "dayjs";
import {
  DATEPICKER_FORMAT,
  API_FIELD_LIMITS,
  exceedsLength,
  isEmpty,
  isNotValidDate,
} from "../../../utils/constants";
import {Report} from "../../../entities/report/model/Report";
import {
  createReportTestGroup,
  groupReportTests,
  hasValidReportTests,
} from "./useReportTestGroups";

export const useReportDetailForm = (selectedReport: Report | null) => {
  const today = React.useMemo(() => dayjs(), []);
  const [groups, setGroups] = useState(() => [createReportTestGroup()]);

  const formValidations = useMemo(
    () => ({
      reportDate: [isEmpty, isNotValidDate],
      reportNumber: [isEmpty, exceedsLength(API_FIELD_LIMITS.reportNumber)],
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
    if (selectedReport) setForm(reportToReportForm(selectedReport));
    else cleanForm(emptyForm);

    const existingGroups = groupReportTests(selectedReport?.tests ?? []);
    setGroups(
      existingGroups.length ? existingGroups : [createReportTestGroup()],
    );
  }, [selectedReport, setForm, cleanForm, emptyForm]);

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
    groups,
    setGroups,
    areReportTestsValid: hasValidReportTests(groups),
  };
};
