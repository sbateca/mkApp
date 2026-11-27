import {Client, ClientRequest} from "../../../entities/client";
import {FormProps, getFormStringValue} from "../../../utils/constants";

export const clientToForm = (client?: Client | null) => ({
  name: client?.name ?? "",
  email: client?.email ?? "",
  phone: client?.phone ?? "",
  nit: client?.nit ?? "",
  address: client?.address ?? "",
});

export const formToClientRequest = (form: FormProps): ClientRequest => ({
  name: getFormStringValue(form, "name").trim(),
  email: getFormStringValue(form, "email").trim(),
  phone: getFormStringValue(form, "phone").trim(),
  nit: getFormStringValue(form, "nit").trim(),
  address: getFormStringValue(form, "address").trim(),
});
