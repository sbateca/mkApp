import {render, screen, waitFor} from "@testing-library/react";

import {Criteria, CriteriaStore} from "../../../entities/criteria";
import {SideSectionStore} from "../../../features/sideSection/model/types";
import {buildCriteriasData} from "../../../shared/test/builders/criteriaBuilder";
import {CriteriasContent} from "./CriteriasContent";

const mockCriterias: Criteria[] = buildCriteriasData(1, {
  id: "criteria-id",
  name: "EPA Limit",
});

let mockCriteriaStoreState: CriteriaStore;
let mockSideSectionStoreState: SideSectionStore;

jest.mock("../../../entities/criteria", () => ({
  selectCriterias: (store: CriteriaStore) => store.criterias,
  selectGetCriterias: (store: CriteriaStore) => store.getCriterias,
  selectIsLoadingCriterias: (store: CriteriaStore) => store.isLoading,
  selectSelectedCriteria: (store: CriteriaStore) => store.selectedCriteria,
  selectSetSelectedCriteria: (store: CriteriaStore) =>
    store.setSelectedCriteria,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useCriteriaStore: (selector: any) => selector(mockCriteriaStoreState),
}));

jest.mock("../../../features/sideSection", () => ({
  useSideSection: () => ({
    isSideSectionOpen: mockSideSectionStoreState.isSideSectionOpen,
    sideSectionTitle: mockSideSectionStoreState.sideSectionTitle,
    onCloseSideSection: jest.fn(),
    onOpenSideSection: jest.fn(),
  }),
}));

jest.mock("../../CriteriaDetail", () => ({
  CriteriaDetail: () => (
    <div data-testid="criteriaDetail">Criteria Detail Component</div>
  ),
}));

jest.mock("../../../features/criteria/criteriaActions", () => ({
  CriteriaTableActionButtons: () => <button>Actions</button>,
}));

describe("CriteriasContent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCriteriaStoreState = {
      criterias: mockCriterias,
      selectedCriteria: mockCriterias[0],
      isLoading: false,
      error: null,
      setCriterias: jest.fn(),
      setSelectedCriteria: jest.fn(),
      getCriterias: jest.fn().mockResolvedValue(mockCriterias),
      getCriteriaById: jest.fn().mockResolvedValue(mockCriterias[0]),
      createCriteria: jest.fn().mockResolvedValue(mockCriterias[0]),
      editCriteria: jest.fn().mockResolvedValue(mockCriterias[0]),
      deleteCriteria: jest.fn().mockResolvedValue(mockCriterias[0]),
    };
    mockSideSectionStoreState = {
      isSideSectionOpen: true,
      sideSectionTitle: "Mock title",
      setIsSideSectionOpen: jest.fn(),
      setSideSectionTitle: jest.fn(),
    };
  });

  it("should render criteria rows successfully", async () => {
    render(<CriteriasContent />);

    await waitFor(() => {
      expect(screen.getByText("criteria-id")).toBeInTheDocument();
      expect(screen.getByText("EPA Limit")).toBeInTheDocument();
    });
  });

  it("should render no data text when no criterias are returned", async () => {
    mockCriteriaStoreState.criterias = [];
    mockCriteriaStoreState.getCriterias = jest.fn().mockResolvedValue([]);

    render(<CriteriasContent />);

    await waitFor(() => {
      expect(screen.getByText("No records to display")).toBeInTheDocument();
    });
  });

  it("should render loading spinner when criterias are loading", () => {
    mockCriteriaStoreState.isLoading = true;
    mockCriteriaStoreState.getCriterias = jest.fn(() => new Promise(() => {}));

    render(<CriteriasContent />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
