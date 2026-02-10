import {faker} from "@faker-js/faker";
import {Analyte} from "../../../model";

export const buildAnalyteData = (overries: Partial<Analyte> = {}): Analyte => ({
  id: faker.string.uuid(),
  name: faker.lorem.words(2),
  ...overries,
});

export const buildAnalytesData = (
  count: number,
  overrides: Partial<Analyte> = {},
): Analyte[] => {
  return Array.from({length: count}, () => buildAnalyteData(overrides));
};
