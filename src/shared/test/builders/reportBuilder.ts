import {Report} from "../../../model";
import {faker} from "@faker-js/faker";

export const buildReportData = (overrides: Partial<Report>) => ({
  id: faker.string.uuid(),
  reportDate: faker.date.recent({days: 1}).toISOString().split("T")[0],
  sampleId: faker.string.uuid(),
  analyte: faker.string.uuid(),
  analysisMethod: faker.string.uuid(),
  criteria: faker.string.uuid(),
  result: faker.lorem.words(2),
  ...overrides,
});

export const buildReportsData = (
  count: number,
  overrides: Partial<Report> = {},
): Report[] => {
  return Array.from({length: count}, () => buildReportData(overrides));
};
