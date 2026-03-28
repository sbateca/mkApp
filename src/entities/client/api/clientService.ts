import axios from "axios";

import {Sample} from "../../sample/model/Sample";
import EnvManager from "../../../config/EnvManager";
import {Client} from "../model/Client";
import {axiosResponseToClient} from "../../../adapters/clients";

export const getClientsService = async (): Promise<Client[]> => {
  try {
    const response = await axios.get<Client[]>(
      `${EnvManager.BACKEND_URL}/clients`,
    );
    return axiosResponseToClient(response);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving clients: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred retrieving clients.");
    }
  }
};

export const getClientByIdService = async (
  sampleTypeId: string,
): Promise<Client> => {
  try {
    const response = await axios.get<Sample>(
      `${EnvManager.BACKEND_URL}/clients/${sampleTypeId}`,
    );
    return axiosResponseToClient(response)[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving client by id: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred retrieving clients.");
    }
  }
};
