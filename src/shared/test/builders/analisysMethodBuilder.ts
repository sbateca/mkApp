import {faker} from "@faker-js/faker/.";
import {AnalysisMethod} from "../../../model";

export const buildAnalysisMethodData = (
  overrides: Partial<AnalysisMethod> = {},
): AnalysisMethod => ({
  id: faker.string.uuid(),
  name: faker.lorem.words(2),
  ...overrides,
});

export const buildAnalysisMethodsData = (
  count: number,
  overrides: Partial<AnalysisMethod> = {},
): AnalysisMethod[] => {
  return Array.from({length: count}, () => buildAnalysisMethodData(overrides));
};
