import {create} from "zustand";
import {ClientsStore} from "./types";
import {Client} from "./Client";
import {getClientByIdService, getClientsService} from "../api/clientService";
import {UNEXPECTED_ERROR} from "../../../utils/constants";

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
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({error: message});
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
}));
