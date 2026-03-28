import {ClientsStore} from "./types";

export const selectClients = (store: ClientsStore) => store.clients;
export const selectSelectedClient = (store: ClientsStore) =>
  store.selectedClient;
export const selectIsLoadingClient = (store: ClientsStore) => store.isLoading;
export const selectError = (store: ClientsStore) => store.error;
export const selectSetSelectedClient = (store: ClientsStore) =>
  store.setSelectedClient;
export const selectGetClients = (store: ClientsStore) => store.getClients;
export const selectGetClientById = (store: ClientsStore) => store.getClientById;
