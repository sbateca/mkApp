import {render, screen} from "@testing-library/react";
import {SampleTableActionButtons} from "./SampleTableActionButtons";
import {Sample} from "../../../model";
import {SideSectionStore} from "../../../features/sideSection/model/types";

const mockSamples: Sample[] = [
  {
    id: "1",
    sampleCode: "001",
    sampleTypeId: "1",
    clientId: "1",
    getSampleDate: "2021-09-01",
    receptionDate: "2021-09-01",
    analysisDate: "2021-09-01",
    sampleLocation: "Mock location",
    responsable: "Mock responsable",
  },
  {
    id: "2",
    sampleCode: "002",
    sampleTypeId: "2",
    clientId: "2",
    getSampleDate: "2021-09-01",
    receptionDate: "2021-09-01",
    analysisDate: "2021-09-01",
    sampleLocation: "Mock location",
    responsable: "Mock responsable",
  },
];

const mockSampleStoreState = {
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

let mockSideSectionStoreState: SideSectionStore = {
  isSideSectionOpen: false,
  sideSectionTitle: "",
  setIsSideSectionOpen: jest.fn(),
  setSideSectionTitle: jest.fn(),
};

jest.mock("../../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://example.com/api",
  },
}));

jest.mock("../../../entities/sample/model/store", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSampleStore: (selector: any) => selector(mockSampleStoreState),
}));

jest.mock("../../../features/sideSection/model/store", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSideSectionStore: (selector: any) => selector(mockSideSectionStoreState),
}));

describe("SampleTableActionButtons", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render the actions buttons successfully", async () => {
    render(<SampleTableActionButtons sampleId="1" />);

    expect(screen.getByText("View")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("should not render the actions buttons and show the progressbar when isLoading is true", async () => {
    mockSampleStoreState.isLoading = true;
    mockSideSectionStoreState = {
      isSideSectionOpen: true,
      sideSectionTitle: "",
      setIsSideSectionOpen: jest.fn(),
      setSideSectionTitle: jest.fn(),
    };

    render(<SampleTableActionButtons sampleId="1" />);
    const viewButton = screen.queryByText("View");
    const deleteButton = screen.queryByText("Delete");
    const progressBar = screen.getByRole("progressbar");

    expect(viewButton).not.toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();
    expect(progressBar).toBeInTheDocument();
  });
});
