import {setWorkspaceTestRole} from "../../../shared/test/setWorkspaceTestRole";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";

import {Client, ClientsStore} from "../../../entities/client";
import {SnackBarSeverity} from "../../../utils/enums";
import {SnackBarStore} from "../../../features/snackbar/model/types";
import {buildClientsData} from "../../../shared/test/builders";
import {ClientDetail} from "./ClientDetail";

const mockClients: Client[] = buildClientsData(1, {
  name: "ACME Labs",
});

let mockClientStoreState: ClientsStore;
let mockSnackBarStoreState: SnackBarStore;
let mockIsReadOnlyMode = true;
jest.mock("../../../entities/client", () => ({
  selectSelectedClient: (store: ClientsStore) => store.selectedClient,
  selectCreateClient: (store: ClientsStore) => store.createClient,
  selectEditClient: (store: ClientsStore) => store.editClient,
  selectGetClients: (store: ClientsStore) => store.getClients,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useClientStore: (selector: any) => selector(mockClientStoreState),
}));

jest.mock("../../../features/snackbar/model/store", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSnackBarStore: (selector?: any) =>
    selector ? selector(mockSnackBarStoreState) : mockSnackBarStoreState,
}));

jest.mock("../../../features/sideSection", () => ({
  useSideSection: () => ({
    onCloseSideSection: jest.fn(),
    sideSectionTitle: "Mock title",
  }),
}));

jest.mock("../../../features/readOnlyMode", () => ({
  useReadOnlyMode: () => ({
    isReadOnlyMode: mockIsReadOnlyMode,
    setIsReadOnlyMode: jest.fn(),
    handleSwitchReadOnlyMode: jest.fn(),
  }),
}));

describe("ClientDetail", () => {
  beforeEach(() => {
    setWorkspaceTestRole("Admin");
    jest.clearAllMocks();
    mockIsReadOnlyMode = true;
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

  it("should render selected client details successfully", () => {
    render(
      <ClientDetail
        handleCloseSideSection={jest.fn()}
        selectedClient={mockClients[0]}
        isLoading={false}
        isLessThanMediumScreen={false}
      />,
    );

    expect(screen.getByText("Mock title")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
    expect(screen.getByDisplayValue("ACME Labs")).toBeInTheDocument();
    expect(screen.getByRole("textbox", {name: /email/i})).toHaveValue(
      mockClients[0].email,
    );
    expect(screen.getByRole("textbox", {name: /phone/i})).toHaveValue(
      mockClients[0].phone,
    );
    expect(screen.getByRole("textbox", {name: /nit/i})).toHaveValue(
      mockClients[0].nit,
    );
    expect(screen.getByRole("textbox", {name: /address/i})).toHaveValue(
      mockClients[0].address,
    );
    expect(screen.getByText("Edit client")).toBeInTheDocument();
  });

  it("requires the API client fields and submits them without an ID", async () => {
    mockIsReadOnlyMode = false;
    mockClientStoreState.selectedClient = null;

    render(
      <ClientDetail
        handleCloseSideSection={jest.fn()}
        selectedClient={null}
        isLoading={false}
        isLessThanMediumScreen={false}
      />,
    );

    const save = screen.getByRole("button", {name: "Save"});
    const fields = [
      [/name/i, " ACME Labs "],
      [/email/i, "contact@example.com"],
      [/phone/i, "3001234567"],
      [/nit/i, "900123456-7"],
    ] as const;
    for (const [name, value] of fields) {
      fireEvent.change(screen.getByRole("textbox", {name}), {target: {value}});
    }
    expect(save).toBeDisabled();
    fireEvent.change(screen.getByRole("textbox", {name: /address/i}), {
      target: {value: "Calle 10 # 12-34"},
    });

    expect(save).toBeEnabled();
    fireEvent.click(save);
    await waitFor(() => {
      expect(mockClientStoreState.createClient).toHaveBeenCalledWith({
        name: "ACME Labs",
        email: "contact@example.com",
        phone: "3001234567",
        nit: "900123456-7",
        address: "Calle 10 # 12-34",
      });
    });
  });

  it("should render loading spinner when client detail is loading", () => {
    render(
      <ClientDetail
        handleCloseSideSection={jest.fn()}
        selectedClient={mockClients[0]}
        isLoading
        isLessThanMediumScreen={false}
      />,
    );

    expect(screen.getAllByRole("progressbar")).not.toHaveLength(0);
  });
});
