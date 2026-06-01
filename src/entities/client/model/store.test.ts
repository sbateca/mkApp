import {buildClientsData} from "../../../shared/test/builders";
import {CLIENT_NOT_PROVIDED} from "../../../utils/constants";
import {
  createClientService,
  deleteClientService,
  editClientService,
  getClientByIdService,
  getClientsService,
} from "../api/clientService";
import {useClientStore} from "./store";

jest.mock("../api/clientService", () => ({
  getClientsService: jest.fn(),
  getClientByIdService: jest.fn(),
  createClientService: jest.fn(),
  editClientService: jest.fn(),
  deleteClientService: jest.fn(),
}));

describe("useClientStore", () => {
  const mockClients = buildClientsData(2);

  beforeEach(() => {
    jest.clearAllMocks();
    useClientStore.setState({
      clients: null,
      selectedClient: null,
      isLoading: false,
      error: null,
    });
  });

  it("should set clients", () => {
    useClientStore.getState().setClients(mockClients);

    expect(useClientStore.getState().clients).toEqual(mockClients);
  });

  it("should get clients and update the store", async () => {
    (getClientsService as jest.Mock).mockResolvedValueOnce(mockClients);

    const clients = await useClientStore.getState().getClients();

    expect(clients).toEqual(mockClients);
    expect(useClientStore.getState().clients).toEqual(mockClients);
    expect(useClientStore.getState().isLoading).toBe(false);
  });

  it("should get client by id", async () => {
    (getClientByIdService as jest.Mock).mockResolvedValueOnce(mockClients[0]);

    const client = await useClientStore.getState().getClientById("1");

    expect(client).toEqual(mockClients[0]);
    expect(getClientByIdService).toHaveBeenCalledWith("1");
  });

  it("should create a client", async () => {
    (createClientService as jest.Mock).mockResolvedValueOnce(mockClients[0]);

    const client = await useClientStore.getState().createClient(mockClients[0]);

    expect(client).toEqual(mockClients[0]);
    expect(createClientService).toHaveBeenCalledWith(mockClients[0]);
  });

  it("should edit a client", async () => {
    (editClientService as jest.Mock).mockResolvedValueOnce(mockClients[0]);

    const client = await useClientStore
      .getState()
      .editClient(mockClients[0], "1");

    expect(client).toEqual(mockClients[0]);
    expect(editClientService).toHaveBeenCalledWith(mockClients[0], "1");
  });

  it("should delete a client", async () => {
    (deleteClientService as jest.Mock).mockResolvedValueOnce(mockClients[0]);

    const client = await useClientStore.getState().deleteClient("1");

    expect(client).toEqual(mockClients[0]);
    expect(deleteClientService).toHaveBeenCalledWith("1");
  });

  it("should set an error when client data is not provided", async () => {
    const client = await useClientStore.getState().deleteClient("");

    expect(client).toBeNull();
    expect(useClientStore.getState().error).toBe(CLIENT_NOT_PROVIDED);
  });

  it("should set an error when a service fails", async () => {
    (getClientsService as jest.Mock).mockRejectedValueOnce(
      new Error("Mock error"),
    );

    const clients = await useClientStore.getState().getClients();

    expect(clients).toBeNull();
    expect(useClientStore.getState().error).toBe("Mock error");
  });
});
