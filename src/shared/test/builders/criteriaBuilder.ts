import {faker} from "@faker-js/faker/.";
import {Criteria} from "../../../model";

export const buildCriteriaData = (
  overrides: Partial<Criteria> = {},
): Criteria => ({
  id: faker.string.uuid(),
  name: faker.lorem.words(2),
  ...overrides,
});

export const buildCriteriasData = (
  count: number,
  overrides: Partial<Criteria> = {},
): Criteria[] => {
  return Array.from({length: count}, () => buildCriteriaData(overrides));
};
