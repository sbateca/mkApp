import {act, renderHook} from "@testing-library/react";

import {useReadOnlyMode} from "./useReadOnlyMode";
import {useReadOnlyModeStore} from "./store";

describe("useReadOnlyMode", () => {
  beforeEach(() => {
    useReadOnlyModeStore.setState({isReadOnlyMode: false});
  });

  it("should return the current read only mode", () => {
    useReadOnlyModeStore.setState({isReadOnlyMode: true});

    const {result} = renderHook(() => useReadOnlyMode());

    expect(result.current.isReadOnlyMode).toBe(true);
  });

  it("should update read only mode", () => {
    const {result} = renderHook(() => useReadOnlyMode());

    act(() => {
      result.current.setIsReadOnlyMode(true);
    });

    expect(useReadOnlyModeStore.getState().isReadOnlyMode).toBe(true);
  });
});
