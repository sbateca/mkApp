import {create} from "zustand";
import {ClientsStore} from "./types";
import {Client} from "./Client";
import {
  createClientService,
  deleteClientService,
  editClientService,
  getClientByIdService,
  getClientsService,
} from "../api/clientService";
import {CLIENT_NOT_PROVIDED, UNEXPECTED_ERROR} from "../../../utils/constants";

export const useClientStore = create<ClientsStore>((set) => ({
  clients: null,
  selectedClient: null,
  isLoading: false,
  error: null,
  setClients: (clients: Client[] | null) =>
    set({clients: clients ? [...clients] : null}),
  setSelectedClient: (client: Client | null) => set({selectedClient: client}),
  getClients: async () => {
    set({isLoading: true, error: null});
    try {
      const clients = await getClientsService();
      set({clients: clients ? [...clients] : null});
      return clients;
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },
  getClientById: async (clientId: string) => {
    set({isLoading: true, error: null});
    try {
      return await getClientByIdService(clientId);
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },
  createClient: async (client: Client) => {
    set({isLoading: true, error: null});
    try {
      if (!client) throw Error(CLIENT_NOT_PROVIDED);
      return createClientService(client);
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },
  editClient: async (client: Client, clientId: string) => {
    set({isLoading: true, error: null});
    try {
      if (!clientId || !client) throw Error(CLIENT_NOT_PROVIDED);
      return editClientService(client, clientId);
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },
  deleteClient: async (clientId: string) => {
    set({isLoading: true, error: null});
    try {
      if (!clientId) throw Error(CLIENT_NOT_PROVIDED);
      return deleteClientService(clientId);
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },
}));
