import {faker} from "@faker-js/faker";
import {Sample} from "../../../entities/sample";
import {buildClientData} from "./clientBuilder";
import {buildSampleTypeData} from "./sampleTypeBuilder";

type SampleBuilderOverrides = Partial<Sample> & {
  clientId?: string;
  sampleTypeId?: string;
};

export const buildSampleData = (
  overrides: SampleBuilderOverrides = {},
): Sample => ({
  id: faker.string.uuid(),
  sampleCode: faker.string.alphanumeric(10),
  sampleType:
    overrides.sampleType ??
    buildSampleTypeData({
      id: overrides.sampleTypeId ?? faker.string.uuid(),
    }),
  client:
    overrides.client ??
    buildClientData({
      id: overrides.clientId ?? faker.string.uuid(),
    }),
  getSampleDate: faker.date.recent({days: 4}).toISOString().split("T")[0],
  receptionDate: faker.date.recent({days: 3}).toISOString().split("T")[0],
  analysisDate: faker.date.recent({days: 2}).toISOString().split("T")[0],
  sampleLocation: faker.lorem.words(2),
  responsable: faker.person.fullName(),
  ...overrides,
});

export const buildSamplesData = (
  count: number,
  overrides: SampleBuilderOverrides = {},
): Sample[] => {
  return Array.from({length: count}, () => buildSampleData(overrides));
};
