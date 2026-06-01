import EnvManager from "../../../config/EnvManager";
import {Client} from "../model/Client";
import {axiosResponseToClient} from "../lib/clientMappers";
import {apiClient} from "../../../shared/api/apliClient";
import {BaseRoutes} from "../../../utils/constants/baseRoutes";

export const getClientsService = async (): Promise<Client[]> => {
  const response = await apiClient.get<Client[]>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.CLIENTS}`,
  );
  return axiosResponseToClient(response);
};

export const getClientByIdService = async (
  clientId: string,
): Promise<Client> => {
  const response = await apiClient.get<Client>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.CLIENTS}/${clientId}`,
  );
  return axiosResponseToClient(response)[0];
};

export const createClientService = async (client: Client): Promise<Client> => {
  const response = await apiClient.post<Client>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.CLIENTS}`,
    client,
  );
  return axiosResponseToClient(response)[0];
};

export const editClientService = async (
  client: Client,
  clientId: string,
): Promise<Client> => {
  const response = await apiClient.put<Client>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.CLIENTS}/${clientId}`,
    client,
  );
  return axiosResponseToClient(response)[0];
};

export const deleteClientService = async (
  clientId: string,
): Promise<Client> => {
  const response = await apiClient.delete<Client>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.CLIENTS}/${clientId}`,
  );
  return axiosResponseToClient(response)[0];
};
