import {faker} from "@faker-js/faker";
import {SampleType} from "../../../model";

export const buildSampleTypeData = (
  overrides: Partial<SampleType> = {},
): SampleType => ({
  id: faker.string.uuid(),
  name: faker.lorem.words(2),
  ...overrides,
});

export const buildSampleTypesData = (
  count: number,
  overrides: Partial<SampleType> = {},
): SampleType[] => {
  return Array.from({length: count}, () => buildSampleTypeData(overrides));
};
