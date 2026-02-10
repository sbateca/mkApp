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

const mockSampleTypes: SampleType[] = buildSampleTypesData(1);
const mockAnalytes: Analyte[] = buildAnalytesData(1);
const mockClients = buildClientsData(1);
const mockSamples = buildSamplesData(1, {
  clientId: mockClients[0].id,
  sampleTypeId: mockSampleTypes[0].id,
});

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

jest.mock("../../../utils/hooks/useClient", () => ({
  useClient: () => ({
    clients: mockClients,
    getClients: jest.fn(),
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
