import {faker} from "@faker-js/faker";
import {Report} from "../../../entities/report";
import {Test} from "../../../entities/test";
import {buildAnalysisMethodData} from "./analisysMethodBuilder";
import {buildAnalyteData} from "./analyteBuilder";
import {buildCriteriaData} from "./criteriaBuilder";
import {buildSampleData} from "./sampleBuilder";

type ReportBuilderOverrides = Partial<Report> & {
  sampleId?: string;
  analyte?: string;
  analysisMethod?: string;
  criteria?: string;
  result?: string;
};

export const buildReportData = (
  overrides: ReportBuilderOverrides = {},
): Report => {
  const {sampleId, analyte, analysisMethod, criteria, result, ...reportFields} =
    overrides;
  const sample = overrides.sample ?? buildSampleData({id: sampleId});
  const testType = {
    id: faker.string.uuid(),
    name: faker.lorem.words(2),
  };
  const test: Test = {
    id: faker.string.uuid(),
    testType,
    sampleId: sample.id,
    analyte: buildAnalyteData({
      id: analyte,
      testType,
    }),
    analysisMethod: buildAnalysisMethodData({
      id: analysisMethod,
    }),
    criteria: buildCriteriaData({
      id: criteria,
    }),
    result: result ?? faker.lorem.words(2),
  };

  return {
    id: faker.string.uuid(),
    reportNumber: faker.string.alphanumeric(10),
    reportDate: faker.date.recent({days: 1}).toISOString().split("T")[0],
    sample,
    tests: [test],
    ...reportFields,
  };
};

export const buildReportsData = (
  count: number,
  overrides: ReportBuilderOverrides = {},
): Report[] => {
  return Array.from({length: count}, () => buildReportData(overrides));
};
