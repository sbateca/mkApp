import {v4 as uuidv4} from "uuid";
import {Test} from "../../../entities/test";
import {
  API_FIELD_LIMITS,
  exceedsLength,
  REQUIRED_FIELD_ERROR_TEXT,
} from "../../../utils/constants";
import {
  ReportTestGroup,
  ReportTestGroups,
  ReportTestRow,
  ReportTestRowField,
} from "./types";

export const createReportTestRow = (): ReportTestRow => ({
  id: uuidv4(),
  analysisMethodId: "",
  result: "",
  criteriaId: "",
});

export const createReportTestGroup = (): ReportTestGroup => ({
  id: uuidv4(),
  testTypeId: "",
  analyteId: "",
  rows: [createReportTestRow()],
});

export const groupReportTests = (tests: Test[]): ReportTestGroup[] => {
  const groups = new Map<string, ReportTestGroup>();

  for (const test of tests) {
    const testTypeId = test.testType.id;
    const analyteId = test.analyte.id;
    const key = `${testTypeId}:${analyteId}`;
    const row = {
      id: test.id,
      analysisMethodId: test.analysisMethod.id,
      criteriaId: test.criteria.id,
      result: test.result,
    };

    const group = groups.get(key);
    if (group) group.rows.push(row);
    else groups.set(key, {id: key, testTypeId, analyteId, rows: [row]});
  }

  return Array.from(groups.values());
};

const validateResultLength = exceedsLength(API_FIELD_LIMITS.reportResult);

const isEmptyRow = ({analysisMethodId, result, criteriaId}: ReportTestRow) =>
  !analysisMethodId && !result.trim() && !criteriaId;

const isEmptyGroup = ({testTypeId, analyteId, rows}: ReportTestGroup) =>
  !testTypeId && !analyteId && rows.every(isEmptyRow);

export const getReportTestFieldError = (
  row: ReportTestRow,
  fieldName: ReportTestRowField,
): string => {
  if (!row[fieldName].trim()) return REQUIRED_FIELD_ERROR_TEXT;
  return fieldName === "result" ? validateResultLength(row.result) : "";
};

export const hasValidReportTests = (groups: ReportTestGroup[]): boolean => {
  const selected = groups.filter((group) => !isEmptyGroup(group));
  const keys = new Set(
    selected.map(({testTypeId, analyteId}) => `${testTypeId}:${analyteId}`),
  );
  return (
    selected.length > 0 &&
    keys.size === selected.length &&
    selected.every(
      ({testTypeId, analyteId, rows}) =>
        Boolean(testTypeId && analyteId) &&
        rows.length > 0 &&
        rows.every(
          (row) =>
            !getReportTestFieldError(row, "analysisMethodId") &&
            !getReportTestFieldError(row, "result") &&
            !getReportTestFieldError(row, "criteriaId"),
        ),
    )
  );
};

export const toReportTestGroups = (
  groups: ReportTestGroup[],
): ReportTestGroups => {
  const groupsByTestType: ReportTestGroups = {};
  for (const {testTypeId, analyteId, rows} of groups.filter(
    (group) => !isEmptyGroup(group),
  )) {
    const tests = rows.map((row) => ({...row, analyteId}));
    groupsByTestType[testTypeId] = [
      ...(groupsByTestType[testTypeId] ?? []),
      ...tests,
    ];
  }
  return groupsByTestType;
};
