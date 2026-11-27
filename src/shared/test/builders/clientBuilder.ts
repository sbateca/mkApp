import {faker} from "@faker-js/faker";
import {Client} from "../../../entities/client";

export const buildClientData = (overrides: Partial<Client> = {}) => ({
  id: faker.string.uuid(),
  name: faker.company.name(),
  email: faker.internet.email(),
  phone: "3001234567",
  nit: "900123456-7",
  address: "Calle 10 # 12-34",
  ...overrides,
});

export const buildClientsData = (
  count: number,
  overrides: Partial<Client> = {},
) => Array.from({length: count}, () => buildClientData(overrides));
