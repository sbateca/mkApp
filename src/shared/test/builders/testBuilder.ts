import {faker} from "@faker-js/faker";
import {Test} from "../../../entities/test";
import {buildAnalysisMethodData} from "./analisysMethodBuilder";
import {buildAnalyteData} from "./analyteBuilder";
import {buildCriteriaData} from "./criteriaBuilder";

export const buildTestData = (overrides: Partial<Test> = {}): Test => {
  const testType = overrides.testType ?? {
    id: faker.string.uuid(),
    name: faker.lorem.words(2),
  };

  return {
    id: faker.string.uuid(),
    testType,
    sampleId: faker.string.uuid(),
    analyte: buildAnalyteData({testType}),
    analysisMethod: buildAnalysisMethodData(),
    criteria: buildCriteriaData(),
    result: faker.lorem.words(2),
    ...overrides,
  };
};

export const buildTestsData = (
  count: number,
  overrides: Partial<Test> = {},
): Test[] => {
  return Array.from({length: count}, () => buildTestData(overrides));
};
