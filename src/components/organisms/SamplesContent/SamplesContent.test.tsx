import {render, screen, waitFor} from "@testing-library/react";

import {SamplesContent} from "./SamplesContent";
import {Sample} from "../../../model/Sample";
import {Analyte, SampleType} from "../../../model";
import {
  buildAnalytesData,
  buildClientsData,
  buildSamplesData,
  buildSampleTypesData,
} from "../../../shared/test/builders";
import {ClientsStore} from "../../../features/clients/model/types";
import {buildFormData} from "../../../shared/test/builders/formDataBuilder";
import dayjs from "dayjs";
import {DATEPICKER_FORMAT} from "../../../utils/constants";

const today = dayjs();
const RENDERED_FORMAT_DATE = "MM/DD/YYYY";

const mockSampleTypes: SampleType[] = buildSampleTypesData(1);
const mockAnalytes: Analyte[] = buildAnalytesData(1);
const mockClients = buildClientsData(1);
const mockSamples = buildSamplesData(1, {
  clientId: mockClients[0].id,
  sampleTypeId: mockSampleTypes[0].id,
});

const mockForm = buildFormData({
  sampleCode: mockSamples[0].sampleCode,
  sampleType: mockSampleTypes[0].id,
  client: mockClients[0].id,
  getSampleDate: today.format(DATEPICKER_FORMAT),
  receptionDate: today.format(DATEPICKER_FORMAT),
  analysisDate: today.format(DATEPICKER_FORMAT),
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
    getSampleDate: today.format(RENDERED_FORMAT_DATE),
    receptionDate: today.format(RENDERED_FORMAT_DATE),
    analysisDate: today.format(RENDERED_FORMAT_DATE),
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

jest.mock("../../../Config/envManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

jest.mock("../../../stores", () => ({
  __esModule: true,
  useSnackBarStore: jest.fn(),
}));

jest.mock("../../../features/samples/model/store", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSampleStore: (selector: any) => selector(mockSamplesStoreState),
}));

jest.mock("../../../features/clients/model/store", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useClientStore: (selector: any) => selector(mockClientStoreState),
}));

jest.mock("../SampleDetail/SampleDetail", () => ({
  SampleDetail: () => (
    <div data-testid="sampleDetail">Sample Detail Component</div>
  ),
}));

jest.mock("../../../utils/hooks/useSampleType", () => ({
  useSampleType: () => ({
    sampleTypes: mockSampleTypes,
    getSampleTypes: jest.fn(),
  }),
}));

jest.mock("../../../utils/hooks/useAnalyte", () => ({
  useAnalyte: () => ({
    analytes: mockAnalytes,
    getAnalytes: jest.fn(),
  }),
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
