import {Sample} from "../../sample/model/Sample";
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
  sampleTypeId: string,
): Promise<Client> => {
  const response = await apiClient.get<Sample>(
    `${EnvManager.BACKEND_URL}${BaseRoutes.CLIENTS}/${sampleTypeId}`,
  );
  return axiosResponseToClient(response)[0];
};
