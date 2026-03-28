import {AxiosResponse} from "axios";

import {
  RESPONSE_DATA_NOT_VALID_ERROR,
  getInvalidDataErrorMessage,
} from "../utils/constants";
import {Client} from "../entities/client/model/Client";

export const axiosResponseToClient = (
  response: AxiosResponse<unknown>,
): Client[] => {
  return getClientsFromData(response.data);
};

const getClientsFromData = (data: unknown): Client[] => {
  if (data instanceof Array) {
    return data
      .map((client: unknown) => {
        if (isValidClient(client)) {
          return client as Client;
        } else {
          throw new Error(getInvalidDataErrorMessage("client"));
        }
      })
      .filter((client): client is Client => client !== null);
  } else if (data instanceof Object) {
    return [data as Client];
  } else {
    throw new Error(RESPONSE_DATA_NOT_VALID_ERROR);
  }
};

const isValidClient = (client: unknown): client is Client => {
  if (typeof client === "object" && client !== null) {
    const clientObj = client as Record<string, unknown>;
    return (
      typeof clientObj.id === "string" && typeof clientObj.name === "string"
    );
  }
  return false;
};
