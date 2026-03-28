import {create} from "zustand";
import {ClientsStore} from "./types";
import {Client} from "./Client";
import {getClientByIdService, getClientsService} from "../api/clientService";

export const useClientStore = create<ClientsStore>((set) => ({
  clients: null,
  selectedClient: null,
  isLoading: false,
  error: null,
  setSelectedClient: (client: Client | null) => set({selectedClient: client}),
  getClients: async () => {
    set({isLoading: true, error: null});
    try {
      const clients = await getClientsService();
      set({clients: clients});
    } catch (error) {
      set({error: (error as Error).message});
    } finally {
      set({isLoading: false});
    }
  },
  getClientById: async (clientId: string) => {
    set({isLoading: true, error: null});
    try {
      return await getClientByIdService(clientId);
    } catch (error) {
      set({error: (error as Error).message});
      return null;
    } finally {
      set({isLoading: false});
    }
  },
}));
