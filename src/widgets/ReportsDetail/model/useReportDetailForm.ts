import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useForm} from "../../../utils/hooks";
import {reportToReportForm} from "../../../entities/report";
import dayjs from "dayjs";
import {
  DATEPICKER_FORMAT,
  isEmpty,
  isNotValidDate,
} from "../../../utils/constants";
import {Report} from "../../../entities/report/model/Report";
import {ReportTestGroups, ReportTestRow} from "./types";
import {Analyte} from "../../../entities/analyte";
import {TestType} from "../../../entities/testType";
import {
  getDefaultReportTestRows,
  getFormReportTestGroups,
  hasValidReportTests,
  isCompleteReportTestRow,
} from "./useReportTestGroups";

export const useReportDetailForm = (
  selectedReport: Report | null,
  testTypes: TestType[] | null,
  getAnalytesByTestTypeId: (testTypeId: string) => Promise<Analyte[] | null>,
) => {
  const today = React.useMemo(() => dayjs(), []);
  const [analytesByTestType, setAnalytesByTestType] = useState<
    Record<string, Analyte[]>
  >({});
  const [reportTestGroups, setReportTestGroups] = useState<ReportTestGroups>(
    {},
  );
  const testTypeIds = testTypes?.map((testType) => testType.id).join("|") ?? "";

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

  const loadedTestTypeIdsRef = useRef("");
  const formReportTestGroups = getFormReportTestGroups(form);

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

  useEffect(() => {
    if (!formReportTestGroups) {
      return;
    }

    setReportTestGroups(formReportTestGroups);
  }, [formReportTestGroups, setReportTestGroups]);

  useEffect(() => {
    if (!testTypes?.length) {
      loadedTestTypeIdsRef.current = "";
      setAnalytesByTestType((prevAnalytesByTestType) =>
        Object.keys(prevAnalytesByTestType).length
          ? {}
          : prevAnalytesByTestType,
      );
      setReportTestGroups({});
      return;
    }

    if (loadedTestTypeIdsRef.current === testTypeIds) {
      return;
    }

    let shouldIgnoreResult = false;

    const loadAnalytesByTestType = async () => {
      const analyteEntries = await Promise.all(
        testTypes.map(async ({id}) => {
          const analytes = await getAnalytesByTestTypeId(id);
          return [id, analytes ?? []] as const;
        }),
      );

      if (shouldIgnoreResult) {
        return;
      }

      const nextAnalytesByTestType: Record<string, Analyte[]> = {};

      analyteEntries.forEach(([testTypeId, analytes]) => {
        nextAnalytesByTestType[testTypeId] = analytes;
      });

      setAnalytesByTestType(nextAnalytesByTestType);

      setReportTestGroups((prevReportTestGroups) => {
        const formReportTestGroups = getFormReportTestGroups(form);
        const nextReportTestGroups: ReportTestGroups = {};

        Object.keys(nextAnalytesByTestType).forEach((testTypeId) => {
          nextReportTestGroups[testTypeId] =
            prevReportTestGroups[testTypeId] ??
            formReportTestGroups?.[testTypeId] ??
            getDefaultReportTestRows();
        });

        return nextReportTestGroups;
      });

      loadedTestTypeIdsRef.current = testTypeIds;
    };

    loadAnalytesByTestType();

    return () => {
      shouldIgnoreResult = true;
    };
  }, [
    form,
    testTypes,
    testTypeIds,
    getAnalytesByTestTypeId,
    setReportTestGroups,
  ]);

  const handleTestRowsChange = useCallback(
    (testTypeId: string, nextRows: ReportTestRow[]) => {
      setReportTestGroups((prevReportTestGroups: ReportTestGroups) => ({
        ...prevReportTestGroups,
        [testTypeId]: nextRows,
      }));
    },
    [],
  );

  const getReportTestRows = useCallback(
    (testTypeId: string): ReportTestRow[] => {
      return reportTestGroups[testTypeId] ?? getDefaultReportTestRows();
    },
    [reportTestGroups],
  );

  const hasCompleteReportTestRow = (): boolean => {
    return Object.values(reportTestGroups).flat().some(isCompleteReportTestRow);
  };

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
    analytesByTestType,
    reportTestGroups,
    areReportTestsValid: hasValidReportTests(reportTestGroups),
    hasCompleteReportTestRow: hasCompleteReportTestRow(),
    getReportTestRows,
    handleTestRowsChange,
  };
};
