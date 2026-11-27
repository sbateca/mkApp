export interface ClientRequest {
  name: string;
  email: string;
  phone: string;
  nit: string;
  address: string;
}

export interface Client extends Partial<Omit<ClientRequest, "name">> {
  id: string;
  name: string;
}
