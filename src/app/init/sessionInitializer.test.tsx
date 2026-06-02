import {render, screen} from "@testing-library/react";

import {SessionInitializer} from "./sessionInitializer";

const mockCheckSession = jest.fn();
const mockClearSession = jest.fn();
const mockSetUnauthorizedHandler = jest.fn();

jest.mock("../../entities/auth/model/store", () => ({
  useSessionStore: {
    getState: jest.fn(() => ({
      checkSession: mockCheckSession,
      clearSession: mockClearSession,
    })),
  },
}));

jest.mock("../../shared/api/apliClient", () => ({
  setUnauthorizedHandler: (handler: (() => void) | null) =>
    mockSetUnauthorizedHandler(handler),
}));

describe("SessionInitializer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should check session on mount", () => {
    const {unmount} = render(
      <SessionInitializer>
        <div>App content</div>
      </SessionInitializer>,
    );

    expect(mockCheckSession).toHaveBeenCalledTimes(1);
    expect(mockSetUnauthorizedHandler).toHaveBeenCalledWith(
      expect.any(Function),
    );
    expect(screen.getByText("App content")).toBeInTheDocument();

    const unauthorizedHandler = mockSetUnauthorizedHandler.mock.calls[0][0];
    unauthorizedHandler();
    expect(mockClearSession).toHaveBeenCalledTimes(1);

    unmount();
    expect(mockSetUnauthorizedHandler).toHaveBeenLastCalledWith(null);
  });
});
