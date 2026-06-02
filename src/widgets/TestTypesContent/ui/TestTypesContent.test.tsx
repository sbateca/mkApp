import {render, screen, waitFor} from "@testing-library/react";

import {SideSectionStore} from "../../../features/sideSection/model/types";
import {TestType, TestTypeStore} from "../../../entities/testType";
import {TestTypesContent} from "./TestTypesContent";

const mockTestTypes: TestType[] = [{id: "test-type-id", name: "Physical"}];

let mockTestTypeStoreState: TestTypeStore;
let mockSideSectionStoreState: SideSectionStore;

jest.mock("../../../entities/testType", () => ({
  selectTestTypes: (store: TestTypeStore) => store.testTypes,
  selectGetTestTypes: (store: TestTypeStore) => store.getTestTypes,
  selectIsLoadingTestTypes: (store: TestTypeStore) => store.isLoading,
  selectSelectedTestType: (store: TestTypeStore) => store.selectedTestType,
  selectSetSelectedTestType: (store: TestTypeStore) =>
    store.setSelectedTestType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useTestTypeStore: (selector: any) => selector(mockTestTypeStoreState),
}));

jest.mock("../../../features/sideSection", () => ({
  useSideSection: () => ({
    isSideSectionOpen: mockSideSectionStoreState.isSideSectionOpen,
    sideSectionTitle: mockSideSectionStoreState.sideSectionTitle,
    onCloseSideSection: jest.fn(),
    onOpenSideSection: jest.fn(),
  }),
}));

jest.mock("../../TestTypeDetail", () => ({
  TestTypeDetail: () => (
    <div data-testid="testTypeDetail">Test Type Detail Component</div>
  ),
}));

jest.mock("../../../features/testType/testTypeActions", () => ({
  TestTypeTableActionButtons: () => <button>Actions</button>,
}));

describe("TestTypesContent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockTestTypeStoreState = {
      testTypes: mockTestTypes,
      selectedTestType: mockTestTypes[0],
      isLoading: false,
      error: null,
      setTestTypes: jest.fn(),
      setSelectedTestType: jest.fn(),
      getTestTypes: jest.fn().mockResolvedValue(mockTestTypes),
      getTestTypeById: jest.fn().mockResolvedValue(mockTestTypes[0]),
      createTestType: jest.fn().mockResolvedValue(mockTestTypes[0]),
      editTestType: jest.fn().mockResolvedValue(mockTestTypes[0]),
      deleteTestType: jest.fn().mockResolvedValue(mockTestTypes[0]),
    };
    mockSideSectionStoreState = {
      isSideSectionOpen: true,
      sideSectionTitle: "Mock title",
      setIsSideSectionOpen: jest.fn(),
      setSideSectionTitle: jest.fn(),
    };
  });

  it("should render test type rows successfully", async () => {
    render(<TestTypesContent />);

    await waitFor(() => {
      expect(screen.getByText("test-type-id")).toBeInTheDocument();
      expect(screen.getByText("Physical")).toBeInTheDocument();
    });
  });

  it("should render no data text when no test types are returned", async () => {
    mockTestTypeStoreState.testTypes = [];
    mockTestTypeStoreState.getTestTypes = jest.fn().mockResolvedValue([]);

    render(<TestTypesContent />);

    await waitFor(() => {
      expect(screen.getByText("No records to display")).toBeInTheDocument();
    });
  });

  it("should render loading spinner when test types are loading", () => {
    mockTestTypeStoreState.isLoading = true;
    mockTestTypeStoreState.getTestTypes = jest.fn(() => new Promise(() => {}));

    render(<TestTypesContent />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
