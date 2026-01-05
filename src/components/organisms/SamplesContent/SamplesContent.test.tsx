import {render, screen, waitFor} from "@testing-library/react";

import {SamplesContent} from "./SamplesContent";
import {Sample} from "../../../model/Sample";
import * as useSampleModule from "../../../utils/hooks/useSample";
import {Analyte, Client, SampleType} from "../../../model";

const mockSampleTypes: SampleType[] = [
  {
    id: "b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b3",
    name: "Total coliforms",
  },
];
const mockAnalytes: Analyte[] = [
  {
    id: "ab3b3b3b-ab3b-ab3b-ab3b-ab3b3b3b3b3b",
    name: "mock analyte name",
  },
];
const mockClient: Client[] = [
  {
    id: "ab3b3b3b-ab3b-ab3b-ab3b-ab3b3b3b3b3b",
    name: "mock client name",
  },
];
const mockSamples: Sample[] = [
  {
    id: "1234",
    sampleCode: "sam1001",
    sampleTypeId: "b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b3b3",
    clientId: "ab3b3b3b-ab3b-ab3b-ab3b-ab3b3b3b3b3b",
    getSampleDate: "2024-08-05",
    receptionDate: "2024-08-06",
    analysisDate: "2024-08-07",
    sampleLocation: "mock location",
    responsable: "mock responsable",
  },
];
const mockUseSampleArgs = {
  samples: mockSamples,
  selectedSample: null,
  setSelectedSample: jest.fn(),
  getSamples: jest.fn(),
  getSampleById: jest.fn(),
  createSample: jest.fn(),
  editSample: jest.fn(),
  deleteSample: jest.fn(),
  isLoading: false,
  error: null,
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
    clients: mockClient,
    getClients: jest.fn(),
  }),
}));

describe("SamplesContent test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render samples data successfully", async () => {
    const getSamplesMock = jest.fn().mockReturnValue({
      samples: mockSamples,
      loading: false,
      error: false,
    });
    jest.spyOn(useSampleModule, "useSample").mockReturnValue({
      ...getSamplesMock(),
      getSamples: getSamplesMock,
    });

    render(<SamplesContent />);

    await waitFor(() => {
      expect(screen.getByText("Total coliforms")).toBeInTheDocument();
      expect(screen.getByText("mock client name")).toBeInTheDocument();
      expect(screen.getByText("2024-08-05")).toBeInTheDocument();
      expect(screen.getByText("2024-08-06")).toBeInTheDocument();
    });
  });

  it("should render no data text when does not retrieve samples", async () => {
    jest.spyOn(useSampleModule, "useSample").mockReturnValue({
      ...mockUseSampleArgs,
      samples: [],
    });

    render(<SamplesContent />);

    await waitFor(() => {
      expect(screen.getByText("No records to display")).toBeInTheDocument();
    });
  });

  it("should render loading spinner when is loading", async () => {
    jest.spyOn(useSampleModule, "useSample").mockReturnValue({
      ...mockUseSampleArgs,
      isLoading: true,
    });

    render(<SamplesContent />);

    await waitFor(() => {
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });
  });
});
