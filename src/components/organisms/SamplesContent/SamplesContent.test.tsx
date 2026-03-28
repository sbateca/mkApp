import {render, screen, waitFor} from "@testing-library/react";

import {SamplesContent} from "./SamplesContent";
import {Sample} from "../../../entities/sample/model/Sample";
import {SampleType} from "../../../model";
import {
  buildClientsData,
  buildSamplesData,
  buildSampleTypesData,
} from "../../../shared/test/builders";
import {ClientsStore} from "../../../entities/client/model/types";
import {buildFormData} from "../../../shared/test/builders/formDataBuilder";
import dayjs from "dayjs";
import {SideSectionStore} from "../../../features/sideSection/model/types";
import {SnackBarSeverity} from "../../../utils/enums";

const today = dayjs();
const RENDERED_FORMAT_DATE = "MM/DD/YYYY";

const mockSampleTypes: SampleType[] = buildSampleTypesData(1);
const mockClients = buildClientsData(1);
const mockSamples = buildSamplesData(1, {
  clientId: mockClients[0].id,
  sampleTypeId: mockSampleTypes[0].id,
});

const mockForm = buildFormData({
  sampleCode: mockSamples[0].sampleCode,
  sampleType: mockSampleTypes[0].id,
  client: mockClients[0].id,
  getSampleDate: today.subtract(3, "day").format(RENDERED_FORMAT_DATE),
  receptionDate: today.subtract(2, "day").format(RENDERED_FORMAT_DATE),
  analysisDate: today.subtract(1, "day").format(RENDERED_FORMAT_DATE),
  sampleLocation: mockSamples[0].sampleLocation,
  responsable: mockSamples[0].responsable,
});
const mockDefaultForm = buildFormData({
  sampleCode: "",
  sampleType: "",
  client: "",
  getSampleDate: "",
  receptionDate: "",
  analysisDate: "",
  sampleLocation: "",
  responsable: "",
});

export const mockData = {
  readonly: false,
  samples: mockSamples,
  clients: mockClients,
  sampleTypes: mockSampleTypes,
  form: mockForm,
  defaulForm: mockDefaultForm,
  expectedData: {
    sampleCode: mockSamples[0].sampleCode,
    sampleType: mockSampleTypes[0].name,
    client: mockClients[0].name,
    getSampleDate: today.subtract(3, "day").format(RENDERED_FORMAT_DATE),
    receptionDate: today.subtract(2, "day").format(RENDERED_FORMAT_DATE),
    analysisDate: today.subtract(1, "day").format(RENDERED_FORMAT_DATE),
    sampleLocation: mockSamples[0].sampleLocation,
    responsable: mockSamples[0].responsable,
  },
};
const mockClientStoreState: ClientsStore = {
  clients: mockData.clients,
  selectedClient: mockData.clients[0],
  setSelectedClient: jest.fn(),
  getClients: jest.fn().mockReturnValue(mockData.clients),
  getClientById: jest.fn(),
  isLoading: false,
  error: null,
};

const mockSamplesStoreState = {
  samples: mockSamples,
  selectedSample: mockSamples[0],
  isLoading: false,
  error: null,
  setSelectedSample: jest.fn(),
  getSamples: jest.fn(),
  getSampleById: jest.fn().mockResolvedValue(mockSamples[0] as Sample),
  createSample: jest.fn().mockResolvedValue(mockSamples[0] as Sample),
  editSample: jest.fn().mockResolvedValue(mockSamples[0] as Sample),
  deleteSample: jest.fn().mockResolvedValue(null),
};

const mockSampleTypeStoreState = {
  sampleTypes: mockSampleTypes,
  selectedSampleType: mockSampleTypes[0],
  isLoading: false,
  error: null,
  setSampleTypes: jest.fn(),
  setSelectedSampleType: jest.fn(),
  getSampleTypes: jest.fn().mockReturnValue(mockSampleTypes),
  getSampleTypeById: jest.fn().mockReturnValue(mockSampleTypes[0]),
};

const mockSideSectionStoreState: SideSectionStore = {
  isSideSectionOpen: true,
  sideSectionTitle: "Mock title",
  setIsSideSectionOpen: jest.fn(),
  setSideSectionTitle: jest.fn(),
};

const mockSnackBarStoreState = {
  isSnackBarOpen: false,
  snackBarText: "",
  snackBarSeverity: SnackBarSeverity.INFO,
  callbackFunction: jest.fn(),
  showSnackBarMessage: jest.fn(),
  closeSnackBar: jest.fn(),
};

jest.mock("../../../Config/envManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

jest.mock("../../../entities/sample/model/store", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSampleStore: (selector: any) => selector(mockSamplesStoreState),
}));

jest.mock("../../../entities/client/model/store", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useClientStore: (selector: any) => selector(mockClientStoreState),
}));

jest.mock("../../../entities/sampleType/model/store", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSampleTypeStore: (selector: any) => selector(mockSampleTypeStoreState),
}));

jest.mock("../../../features/sideSection/model/store", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSideSectionStore: (selector: any) => selector(mockSideSectionStoreState),
}));

jest.mock("../../../features/snackbar/model/store", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSnackBarStore: (selector: any) => selector(mockSnackBarStoreState),
}));

jest.mock("../../../widgets/SampleDetail/ui/SampleDetail", () => ({
  SampleDetail: () => (
    <div data-testid="sampleDetail">Sample Detail Component</div>
  ),
}));

describe("SamplesContent test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render samples data successfully", async () => {
    const expectedSampleTypeName = mockSampleTypes[0].name;
    const expectedClientName = mockClients[0].name;
    const expectedGetSampleDate = mockSamples[0].getSampleDate;
    const expectedReceptionDate = mockSamples[0].receptionDate;

    render(<SamplesContent />);

    await waitFor(() => {
      expect(screen.getByText(expectedSampleTypeName)).toBeInTheDocument();
      expect(screen.getByText(expectedClientName)).toBeInTheDocument();
      expect(screen.getByText(expectedGetSampleDate)).toBeInTheDocument();
      expect(screen.getByText(expectedReceptionDate)).toBeInTheDocument();
    });
  });

  it("should render no data text when does not retrieve samples", async () => {
    mockSamplesStoreState.samples = [];

    render(<SamplesContent />);

    await waitFor(() => {
      expect(screen.getByText("No records to display")).toBeInTheDocument();
    });
  });

  it("should render loading spinner when is loading", async () => {
    mockSamplesStoreState.isLoading = true;

    render(<SamplesContent />);

    await waitFor(() => {
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });
  });
});
