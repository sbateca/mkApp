import {v4 as uuidv4} from "uuid";

import {AutoCompleteOption} from "../../../shared/ui/AutoComplete/types";
import {FormProps, REQUIRED_FIELD_ERROR_TEXT} from "../../../utils/constants";
import {ReportFormFields} from "../../../utils/enums";
import {ReportTestGroups, ReportTestRow, ReportTestRowField} from "./types";

export const createEmptyReportTestRow = (): ReportTestRow => ({
  id: uuidv4(),
  analyteId: "",
  analysisMethodId: "",
  result: "",
  criteriaId: "",
});

export const getDefaultReportTestRows = (): ReportTestRow[] => [
  createEmptyReportTestRow(),
];

export const isCompleteReportTestRow = (row: ReportTestRow): boolean => {
  return (
    !!row.analyteId.trim() &&
    !!row.analysisMethodId.trim() &&
    !!row.result.trim() &&
    !!row.criteriaId.trim()
  );
};

export const isEmptyReportTestRow = (row: ReportTestRow): boolean => {
  return (
    !row.analyteId.trim() &&
    !row.analysisMethodId.trim() &&
    !row.result.trim() &&
    !row.criteriaId.trim()
  );
};

export const hasValidReportTests = (testGroups: ReportTestGroups): boolean => {
  const rows = Object.values(testGroups).flat();
  const hasCompleteRow = rows.some(isCompleteReportTestRow);
  const hasPartialRows = rows.some(
    (row) => !isEmptyReportTestRow(row) && !isCompleteReportTestRow(row),
  );

  return hasCompleteRow && !hasPartialRows;
};

export const getFormReportTestGroups = (
  form: FormProps,
): ReportTestGroups | null => {
  const reportTestGroups = form[ReportFormFields.REPORT_TEST_GROUPS];

  if (!reportTestGroups || typeof reportTestGroups !== "object") {
    return null;
  }

  const hasOnlyRows = Object.values(reportTestGroups).every((rows) =>
    Array.isArray(rows),
  );

  return hasOnlyRows ? (reportTestGroups as ReportTestGroups) : null;
};

export const addReportTestRow = (rows: ReportTestRow[]): ReportTestRow[] => [
  ...rows,
  createEmptyReportTestRow(),
];

export const removeReportTestRow = (
  rows: ReportTestRow[],
  rowId: string,
): ReportTestRow[] => rows.filter((row) => row.id !== rowId);

export const updateReportTestRow = (
  rows: ReportTestRow[],
  rowId: string,
  fieldName: ReportTestRowField,
  value: string,
): ReportTestRow[] =>
  rows.map((row) =>
    row.id === rowId
      ? {
          ...row,
          [fieldName]: value,
        }
      : row,
  );

export const getAutoCompleteValue = (
  options: AutoCompleteOption[],
  value: string,
): string => {
  const optionExists = options.some((option) => option.id === value);
  return optionExists ? value : "";
};

export const getRequiredReportTestFieldError = (
  row: ReportTestRow,
  fieldName: ReportTestRowField,
  hasCompleteReportTestRow: boolean,
  isReadonly: boolean,
): string => {
  const shouldValidateRow =
    !isEmptyReportTestRow(row) || !hasCompleteReportTestRow;

  return !isReadonly && shouldValidateRow && !row[fieldName].trim()
    ? REQUIRED_FIELD_ERROR_TEXT
    : "";
};
