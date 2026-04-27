import {render, screen} from "@testing-library/react";

import {SessionInitializer} from "./sessionInitializer";

const mockCheckSession = jest.fn();

jest.mock("../../entities/auth/model/store", () => ({
  useSessionStore: {
    getState: jest.fn(() => ({
      checkSession: mockCheckSession,
    })),
  },
}));

describe("SessionInitializer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should check session on mount", () => {
    render(
      <SessionInitializer>
        <div>App content</div>
      </SessionInitializer>,
    );

    expect(mockCheckSession).toHaveBeenCalledTimes(1);
    expect(screen.getByText("App content")).toBeInTheDocument();
  });
});
