import {render, screen} from "@testing-library/react";

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let mockUseForm: any;

jest.mock("../../../utils/hooks", () => ({
  __esModule: true,
  useForm: jest.fn(() => mockUseForm),
}));

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
    mockUseForm = {
      form: {name: mockClients[0].name},
      setForm: jest.fn(),
      handleChange: jest.fn(),
      cleanForm: jest.fn(),
      formFieldsErrors: {},
      getTextFieldHelperText: jest.fn(),
      setFormFieldsValidationFunctions: jest.fn(),
      isNotValidForm: false,
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
    expect(screen.getByText("Edit client")).toBeInTheDocument();
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
