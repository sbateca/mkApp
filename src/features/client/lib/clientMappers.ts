import {v4 as uuid4} from "uuid";
import {Client} from "../../../entities/client";
import {FormProps} from "../../../utils/constants";

export const clientToForm = (client: Client) => ({
  name: client.name,
});

export const formToClient = (form: FormProps, clientId?: string): Client => ({
  id: clientId || uuid4(),
  name: form.name as string,
});
