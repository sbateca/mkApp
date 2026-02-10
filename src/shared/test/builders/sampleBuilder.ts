import {faker} from "@faker-js/faker";
import {Sample} from "../../../model";

export const buildSampleData = (overrides: Partial<Sample> = {}) => ({
  id: faker.string.uuid(),
  sampleCode: faker.string.alphanumeric(10),
  sampleTypeId: faker.string.uuid(),
  clientId: faker.string.uuid(),
  getSampleDate: faker.date.recent({days: 4}).toISOString().split("T")[0],
  receptionDate: faker.date.recent({days: 3}).toISOString().split("T")[0],
  analysisDate: faker.date.recent({days: 2}).toISOString().split("T")[0],
  sampleLocation: faker.lorem.words(2),
  responsable: faker.person.fullName(),
  ...overrides,
});

export const buildSamplesData = (
  count: number,
  overrides: Partial<Sample> = {},
): Sample[] => {
  return Array.from({length: count}, () => buildSampleData(overrides));
};
