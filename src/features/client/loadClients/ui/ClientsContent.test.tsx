import {render, screen, waitFor} from "@testing-library/react";

import {Client, ClientsStore} from "../../../../entities/client";
import {SideSectionStore} from "../../../sideSection/model/types";
import {buildClientsData} from "../../../../shared/test/builders";
import {ClientsContent} from "./ClientsContent";

const mockClients: Client[] = buildClientsData(1, {
  id: "client-id",
  name: "ACME Labs",
});

let mockClientStoreState: ClientsStore;
let mockSideSectionStoreState: SideSectionStore;

jest.mock("../../../../entities/client", () => ({
  selectGetClients: (store: ClientsStore) => store.getClients,
  selectIsLoadingClient: (store: ClientsStore) => store.isLoading,
  selectSelectedClient: (store: ClientsStore) => store.selectedClient,
  selectSetSelectedClient: (store: ClientsStore) => store.setSelectedClient,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useClientStore: (selector: any) => selector(mockClientStoreState),
}));

jest.mock("../../../sideSection", () => ({
  selectIsSideSectionOpen: (store: SideSectionStore) => store.isSideSectionOpen,
  selectSetIsSideSectionOpen: (store: SideSectionStore) =>
    store.setIsSideSectionOpen,
  selectSetSideSectionTitle: (store: SideSectionStore) =>
    store.setSideSectionTitle,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSideSectionStore: (selector: any) => selector(mockSideSectionStoreState),
}));

jest.mock("../../../readOnlyMode", () => ({
  useReadOnlyMode: () => ({
    isReadOnlyMode: true,
    setIsReadOnlyMode: jest.fn(),
    handleSwitchReadOnlyMode: jest.fn(),
  }),
}));

jest.mock("../../../../widgets/ClientDetail", () => ({
  ClientDetail: () => (
    <div data-testid="clientDetail">Client Detail Component</div>
  ),
}));

jest.mock("../../clientActions", () => ({
  ClientTableActionButtons: () => <button>Actions</button>,
}));

describe("ClientsContent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockClientStoreState = {
      clients: mockClients,
      selectedClient: mockClients[0],
      isLoading: false,
      error: null,
      setClients: jest.fn(),
      setSelectedClient: jest.fn(),
      getClients: jest.fn().mockResolvedValue(mockClients),
      getClientById: jest.fn().mockResolvedValue(mockClients[0]),
      createClient: jest.fn().mockResolvedValue(mockClients[0]),
      editClient: jest.fn().mockResolvedValue(mockClients[0]),
      deleteClient: jest.fn().mockResolvedValue(mockClients[0]),
    };
    mockSideSectionStoreState = {
      isSideSectionOpen: true,
      sideSectionTitle: "Mock title",
      setIsSideSectionOpen: jest.fn(),
      setSideSectionTitle: jest.fn(),
    };
  });

  it("should render client rows successfully", async () => {
    render(<ClientsContent />);

    await waitFor(() => {
      expect(screen.getByText("client-id")).toBeInTheDocument();
      expect(screen.getByText("ACME Labs")).toBeInTheDocument();
    });
  });

  it("should render no data text when no clients are returned", async () => {
    mockClientStoreState.getClients = jest.fn().mockResolvedValue([]);

    render(<ClientsContent />);

    await waitFor(() => {
      expect(screen.getByText("No records to display")).toBeInTheDocument();
    });
  });

  it("should render loading spinner when clients are loading", () => {
    mockClientStoreState.isLoading = true;
    mockClientStoreState.getClients = jest.fn(() => new Promise(() => {}));

    render(<ClientsContent />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
