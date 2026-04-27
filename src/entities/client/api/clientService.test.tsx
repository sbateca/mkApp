import {getClientByIdService, getClientsService} from "./clientService";
import {buildClientsData} from "../../../shared/test/builders";
import {Client} from "../model/Client";
import {apiClient} from "../../../shared/api/apliClient";

const mockClients: Client[] = buildClientsData(2);

jest.mock("../../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

jest.mock("../../../shared/api/apliClient", () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("clientService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of clients", async () => {
    const mockApiClientGet = apiClient.get as jest.Mock;
    mockApiClientGet.mockResolvedValueOnce({data: mockClients});
    const expectedURL = "http://mockurl.com/api/clients";

    const clients = await getClientsService();

    expect(clients).toEqual(mockClients);
    expect(apiClient.get).toHaveBeenCalledWith(expectedURL);
  });

  it("should return a client by id", async () => {
    const mockApiClientGet = apiClient.get as jest.Mock;
    mockApiClientGet.mockResolvedValueOnce({data: mockClients[0]});
    const expectedURL = "http://mockurl.com/api/clients/1";

    const client = await getClientByIdService("1");

    expect(client).toEqual(mockClients[0]);
    expect(apiClient.get).toHaveBeenCalledWith(expectedURL);
  });

  it("should throw an error when an error occurs", async () => {
    const mockApiClientGet = apiClient.get as jest.Mock;
    const mockErrorMessage = "Mock error";
    mockApiClientGet.mockRejectedValueOnce(new Error(mockErrorMessage));

    try {
      await getClientsService();
    } catch (error) {
      expect((error as Error).message).toBe(mockErrorMessage);
    }
  });
});
