import {render, screen} from "@testing-library/react";
import {Client, ClientsStore} from "../../../../entities/client";
import {SnackBarSeverity} from "../../../../utils/enums";
import {SnackBarStore} from "../../../snackbar/model/types";
import {buildClientsData} from "../../../../shared/test/builders";
import {ClientTableActionButtons} from "./ClientActions";

const mockClients: Client[] = buildClientsData(2);

let mockClientStoreState: ClientsStore;
let mockSnackBarStoreState: SnackBarStore;
const mockSetIsSideSectionOpen = jest.fn();
const mockSetSideSectionTitle = jest.fn();
const mockSetIsReadOnlyMode = jest.fn();

jest.mock("../../../../entities/client", () => ({
  selectIsLoadingClient: (store: ClientsStore) => store.isLoading,
  selectGetClientById: (store: ClientsStore) => store.getClientById,
  selectSetSelectedClient: (store: ClientsStore) => store.setSelectedClient,
  selectDeleteClient: (store: ClientsStore) => store.deleteClient,
  selectGetClients: (store: ClientsStore) => store.getClients,
  selectError: (store: ClientsStore) => store.error,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useClientStore: (selector: any) => selector(mockClientStoreState),
}));

jest.mock("../../../sideSection", () => ({
  selectSetIsSideSectionOpen: () => mockSetIsSideSectionOpen,
  selectSetSideSectionTitle: () => mockSetSideSectionTitle,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSideSectionStore: (selector: any) => selector({}),
}));

jest.mock("../../../readOnlyMode", () => ({
  useReadOnlyMode: () => ({
    isReadOnlyMode: true,
    setIsReadOnlyMode: mockSetIsReadOnlyMode,
    handleSwitchReadOnlyMode: jest.fn(),
  }),
}));

jest.mock("../../../snackbar", () => ({
  selectShowSnackBarMessage: (store: SnackBarStore) =>
    store.showSnackBarMessage,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSnackBarStore: (selector: any) => selector(mockSnackBarStoreState),
}));

describe("ClientTableActionButtons", () => {
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
    mockSnackBarStoreState = {
      isSnackBarOpen: false,
      snackBarText: "",
      snackBarSeverity: SnackBarSeverity.INFO,
      callbackFunction: jest.fn(),
      showSnackBarMessage: jest.fn(),
      closeSnackBar: jest.fn(),
    };
  });

  it("should render the client action buttons successfully", () => {
    render(<ClientTableActionButtons clientId="1" />);

    expect(screen.getByText("View")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("should render loading spinner when clients are loading", () => {
    mockClientStoreState.isLoading = true;

    render(<ClientTableActionButtons clientId="1" />);

    expect(screen.queryByText("View")).not.toBeInTheDocument();
    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
