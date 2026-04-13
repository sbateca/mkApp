import {Client} from "./Client";

export type ClientsStore = {
  clients: Client[] | null;
  selectedClient: Client | null;
  isLoading: boolean;
  error: string | null;
  setSelectedClient: (client: Client | null) => void;
  getClients: () => Promise<void>;
  getClientById: (clientId: string) => Promise<Client | null>;
};
