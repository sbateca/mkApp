import {faker} from "@faker-js/faker";
import {Client} from "../../../model";

export const buildClientData = (overrides: Partial<Client> = {}) => ({
  id: faker.string.uuid(),
  name: faker.company.name(),
  ...overrides,
});

export const buildClientsData = (
  count: number,
  overrides: Partial<Client> = {},
) => Array.from({length: count}, () => buildClientData(overrides));
