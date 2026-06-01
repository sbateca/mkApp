import {Client} from "./Client";

export type ClientsStore = {
  clients: Client[] | null;
  selectedClient: Client | null;
  isLoading: boolean;
  error: string | null;
  setClients: (clients: Client[] | null) => void;
  setSelectedClient: (client: Client | null) => void;
  getClients: () => Promise<Client[] | null>;
  getClientById: (clientId: string) => Promise<Client | null>;
  createClient: (client: Client) => Promise<Client | null>;
  editClient: (client: Client, clientId: string) => Promise<Client | null>;
  deleteClient: (clientId: string) => Promise<Client | null>;
};
