import {render, screen} from "@testing-library/react";
import {SampleTableActionButtons} from "./SampleTableActionButtons";
import * as hooks from "../../../utils/hooks";

jest.mock("../../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://example.com/api",
  },
}));

jest.mock("../../../stores", () => ({
  __esModule: true,
  useSnackBarStore: jest.fn(),
}));

jest.mock("../../../utils/hooks", () => ({
  useSample: jest.fn(),
  useSideSection: () => ({
    setIsSideSectionOpen: jest.fn(),
    setSideSectionTitle: jest.fn(),
  }),
}));

describe("SampleTableActionButtons", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render the actions buttons successfully", async () => {
    jest.spyOn(hooks, "useSample").mockReturnValue({
      isLoading: false,
      error: null,
      deleteSample: jest.fn(),
      getSampleById: jest.fn(),
      getSamples: jest.fn(),
      setSelectedSample: jest.fn(),
      samples: null,
      selectedSample: null,
      createSample: jest.fn(),
      editSample: jest.fn(),
    });
    render(<SampleTableActionButtons sampleId="1" />);

    expect(screen.getByText("View")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("should not render the actions buttons and show the progressbar when isLoading is true", async () => {
    jest.spyOn(hooks, "useSample").mockReturnValue({
      isLoading: true,
      error: null,
      deleteSample: jest.fn(),
      getSampleById: jest.fn(),
      getSamples: jest.fn(),
      setSelectedSample: jest.fn(),
      samples: null,
      selectedSample: null,
      createSample: jest.fn(),
      editSample: jest.fn(),
    });

    render(<SampleTableActionButtons sampleId="1" />);
    const viewButton = screen.queryByText("View");
    const deleteButton = screen.queryByText("Delete");
    const progressBar = screen.getByRole("progressbar");

    expect(viewButton).not.toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();
    expect(progressBar).toBeInTheDocument();
  });
});
