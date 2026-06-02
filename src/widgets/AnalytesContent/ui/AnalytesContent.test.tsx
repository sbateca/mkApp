import {render, screen, waitFor} from "@testing-library/react";

import {Analyte, AnalyteStore} from "../../../entities/analyte";
import {SideSectionStore} from "../../../features/sideSection/model/types";
import {buildAnalytesData} from "../../../shared/test/builders";
import {AnalytesContent} from "./AnalytesContent";

const mockAnalytes: Analyte[] = buildAnalytesData(1, {
  id: "analyte-id",
  name: "Lead",
  testType: {
    id: "test-type-id",
    name: "Metals",
  },
});

let mockAnalyteStoreState: AnalyteStore;
let mockSideSectionStoreState: SideSectionStore;

jest.mock("../../../entities/analyte", () => ({
  selectAnalytes: (store: AnalyteStore) => store.analytes,
  selectGetAnalytes: (store: AnalyteStore) => store.getAnalytes,
  selectIsLoadingAnalytes: (store: AnalyteStore) => store.isLoading,
  selectSelectedAnaliye: (store: AnalyteStore) => store.selectedAnalyte,
  selectSetSelectedAnalyte: (store: AnalyteStore) => store.setSelectedAnalyte,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useAnalyteStore: (selector: any) => selector(mockAnalyteStoreState),
}));

jest.mock("../../../features/sideSection", () => ({
  useSideSection: () => ({
    isSideSectionOpen: mockSideSectionStoreState.isSideSectionOpen,
    sideSectionTitle: mockSideSectionStoreState.sideSectionTitle,
    onCloseSideSection: jest.fn(),
    onOpenSideSection: jest.fn(),
  }),
}));

jest.mock("../../AnalyteDetail", () => ({
  AnalyteDetail: () => (
    <div data-testid="analyteDetail">Analyte Detail Component</div>
  ),
}));

jest.mock("../../../features/analyte/analyteActions", () => ({
  AnalyteTableActionButtons: () => <button>Actions</button>,
}));

describe("AnalytesContent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAnalyteStoreState = {
      analytes: mockAnalytes,
      selectedAnalyte: mockAnalytes[0],
      isLoading: false,
      error: null,
      setAnalytes: jest.fn(),
      setSelectedAnalyte: jest.fn(),
      getAnalytes: jest.fn().mockResolvedValue(mockAnalytes),
      getAnalyteById: jest.fn().mockResolvedValue(mockAnalytes[0]),
      getAnalytesByTestTypeId: jest.fn().mockResolvedValue(mockAnalytes),
      createAnalyte: jest.fn().mockResolvedValue(mockAnalytes[0]),
      editAnalyte: jest.fn().mockResolvedValue(mockAnalytes[0]),
      deleteAnalyte: jest.fn().mockResolvedValue(mockAnalytes[0]),
    };
    mockSideSectionStoreState = {
      isSideSectionOpen: true,
      sideSectionTitle: "Mock title",
      setIsSideSectionOpen: jest.fn(),
      setSideSectionTitle: jest.fn(),
    };
  });

  it("should render analyte rows successfully", async () => {
    render(<AnalytesContent />);

    await waitFor(() => {
      expect(screen.getByText("analyte-id")).toBeInTheDocument();
      expect(screen.getByText("Lead")).toBeInTheDocument();
      expect(screen.getByText("Metals")).toBeInTheDocument();
    });
  });

  it("should render no data text when no analytes are returned", async () => {
    mockAnalyteStoreState.analytes = [];
    mockAnalyteStoreState.getAnalytes = jest.fn().mockResolvedValue([]);

    render(<AnalytesContent />);

    await waitFor(() => {
      expect(screen.getByText("No records to display")).toBeInTheDocument();
    });
  });

  it("should render loading spinner when analytes are loading", () => {
    mockAnalyteStoreState.isLoading = true;
    mockAnalyteStoreState.getAnalytes = jest.fn(() => new Promise(() => {}));

    render(<AnalytesContent />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
