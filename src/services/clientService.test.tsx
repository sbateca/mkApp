import axios from "axios";
import {getClientByIdService, getClientsService} from "./clientService";
import {buildClientsData} from "../shared/test/builders";
import {Client} from "../model";

const mockClients: Client[] = buildClientsData(2);

jest.mock("../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));
jest.mock("axios");

describe("clientService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of clients", async () => {
    jest.spyOn(axios, "get").mockResolvedValueOnce({data: mockClients});
    const expectedURL = "http://mockurl.com/api/clients";

    const clients = await getClientsService();

    expect(clients).toEqual(mockClients);
    expect(axios.get).toHaveBeenCalledWith(expectedURL);
  });

  it("should return a client by id", async () => {
    jest.spyOn(axios, "get").mockResolvedValueOnce({data: mockClients[0]});
    const expectedURL = "http://mockurl.com/api/clients/1";

    const client = await getClientByIdService("1");

    expect(client).toEqual(mockClients[0]);
    expect(axios.get).toHaveBeenCalledWith(expectedURL);
  });

  it("should throw an error when an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValueOnce(new Error("Mock error"));

    try {
      await getClientsService();
    } catch (error) {
      expect((error as Error).message).toBe(
        "Error retrieving clients: Mock error",
      );
    }
  });
});
