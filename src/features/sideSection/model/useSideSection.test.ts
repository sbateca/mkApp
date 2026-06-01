import {act, renderHook} from "@testing-library/react";

import {useSideSection} from "./useSideSection";
import {SideSectionStore} from "./types";

let mockSideSectionStoreState: SideSectionStore;
const mockSetReadOnlyMode = jest.fn();

jest.mock("./store", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSideSectionStore: (selector: any) => selector(mockSideSectionStoreState),
}));

jest.mock("../../readOnlyMode", () => ({
  useReadOnlyMode: () => ({
    isReadOnlyMode: false,
    setIsReadOnlyMode: mockSetReadOnlyMode,
  }),
}));

describe("useSideSection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSideSectionStoreState = {
      isSideSectionOpen: true,
      sideSectionTitle: "Mock title",
      setIsSideSectionOpen: jest.fn(),
      setSideSectionTitle: jest.fn(),
    };
  });

  it("should close the side section and reset shared read only mode", () => {
    const {result} = renderHook(() => useSideSection());

    act(() => {
      result.current.onCloseSideSection();
    });

    expect(mockSideSectionStoreState.setIsSideSectionOpen).toHaveBeenCalledWith(
      false,
    );
    expect(mockSetReadOnlyMode).toHaveBeenCalledWith(true);
  });

  it("should expose the side section title", () => {
    const {result} = renderHook(() => useSideSection());

    expect(result.current.sideSectionTitle).toBe("Mock title");
  });
});
