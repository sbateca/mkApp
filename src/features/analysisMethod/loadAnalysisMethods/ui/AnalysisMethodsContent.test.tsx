import {render, screen, waitFor} from "@testing-library/react";

import {
  AnalysisMethod,
  AnalysisMethodStore,
} from "../../../../entities/analysisMethod";
import {SideSectionStore} from "../../../sideSection/model/types";
import {buildAnalysisMethodsData} from "../../../../shared/test/builders/analisysMethodBuilder";
import {AnalysisMethodsContent} from "./AnalysisMethodsContent";

const mockAnalysisMethods: AnalysisMethod[] = buildAnalysisMethodsData(1, {
  id: "analysis-method-id",
  name: "EPA 200.8",
});

let mockAnalysisMethodStoreState: AnalysisMethodStore;
let mockSideSectionStoreState: SideSectionStore;

jest.mock("../../../../entities/analysisMethod", () => ({
  selectAnalysisMethods: (store: AnalysisMethodStore) => store.analysisMethods,
  selectGetAnalysisMethods: (store: AnalysisMethodStore) =>
    store.getAnalysisMethods,
  selectIsLoadingAnalysisMethods: (store: AnalysisMethodStore) =>
    store.isLoading,
  selectSelectedAnalysisMethod: (store: AnalysisMethodStore) =>
    store.selectedAnalysisMethod,
  selectSetSelectedAnalysisMethod: (store: AnalysisMethodStore) =>
    store.setSelectedAnalysisMethod,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useAnalysisMethodsStore: (selector: any) =>
    selector(mockAnalysisMethodStoreState),
}));

jest.mock("../../../sideSection", () => ({
  useSideSection: () => ({
    isSideSectionOpen: mockSideSectionStoreState.isSideSectionOpen,
    sideSectionTitle: mockSideSectionStoreState.sideSectionTitle,
    onCloseSideSection: jest.fn(),
    onOpenSideSection: jest.fn(),
  }),
}));

jest.mock("../../../../widgets/AnalysisMethodDetail", () => ({
  AnalysisMethodDetail: () => (
    <div data-testid="analysisMethodDetail">
      Analysis Method Detail Component
    </div>
  ),
}));

jest.mock("../../analysisMethodActions", () => ({
  AnalysisMethodTableActionButtons: () => <button>Actions</button>,
}));

describe("AnalysisMethodsContent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAnalysisMethodStoreState = {
      analysisMethods: mockAnalysisMethods,
      selectedAnalysisMethod: mockAnalysisMethods[0],
      isLoading: false,
      error: null,
      setAnalysisMethods: jest.fn(),
      setSelectedAnalysisMethod: jest.fn(),
      getAnalysisMethods: jest.fn().mockResolvedValue(mockAnalysisMethods),
      getAnalysisMethodById: jest
        .fn()
        .mockResolvedValue(mockAnalysisMethods[0]),
      createAnalysisMethod: jest.fn().mockResolvedValue(mockAnalysisMethods[0]),
      editAnalysisMethod: jest.fn().mockResolvedValue(mockAnalysisMethods[0]),
      deleteAnalysisMethod: jest.fn().mockResolvedValue(mockAnalysisMethods[0]),
    };
    mockSideSectionStoreState = {
      isSideSectionOpen: true,
      sideSectionTitle: "Mock title",
      setIsSideSectionOpen: jest.fn(),
      setSideSectionTitle: jest.fn(),
    };
  });

  it("should render analysis method rows successfully", async () => {
    render(<AnalysisMethodsContent />);

    await waitFor(() => {
      expect(screen.getByText("analysis-method-id")).toBeInTheDocument();
      expect(screen.getByText("EPA 200.8")).toBeInTheDocument();
    });
  });

  it("should render no data text when no analysis methods are returned", async () => {
    mockAnalysisMethodStoreState.analysisMethods = [];
    mockAnalysisMethodStoreState.getAnalysisMethods = jest
      .fn()
      .mockResolvedValue([]);

    render(<AnalysisMethodsContent />);

    await waitFor(() => {
      expect(screen.getByText("No records to display")).toBeInTheDocument();
    });
  });

  it("should render loading spinner when analysis methods are loading", () => {
    mockAnalysisMethodStoreState.isLoading = true;
    mockAnalysisMethodStoreState.getAnalysisMethods = jest.fn(
      () => new Promise(() => {}),
    );

    render(<AnalysisMethodsContent />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
