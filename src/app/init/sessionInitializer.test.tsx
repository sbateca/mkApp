import {render, screen} from "@testing-library/react";

import {SessionInitializer} from "./sessionInitializer";
import {getSession} from "../../entities/session/lib/sessionStorage";

let mockSessionStoreState = {
  setSession: jest.fn(),
  markSessionResolved: jest.fn(),
};

jest.mock("../../entities/session/lib/sessionStorage", () => ({
  getSession: jest.fn(),
}));

jest.mock("../../entities/session/model/store", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSessionStore: (selector: any) => selector(mockSessionStoreState),
}));

describe("SessionInitializer", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockSessionStoreState = {
      setSession: jest.fn(),
      markSessionResolved: jest.fn(),
    };
  });

  it("should restore session when stored session exists", () => {
    (getSession as jest.Mock).mockReturnValue({
      user: {
        id: 1,
        username: "admin",
        name: "Admin",
        role: "admin",
      },
      accessToken: "mock-token",
    });

    render(
      <SessionInitializer>
        <div>App content</div>
      </SessionInitializer>,
    );

    expect(mockSessionStoreState.setSession).toHaveBeenCalledWith({
      user: {
        id: 1,
        username: "admin",
        name: "Admin",
        role: "admin",
      },
      accessToken: "mock-token",
    });

    expect(mockSessionStoreState.markSessionResolved).not.toHaveBeenCalled();
    expect(screen.getByText("App content")).toBeInTheDocument();
  });

  it("should mark session as resolved when there is no stored session", () => {
    (getSession as jest.Mock).mockReturnValue(null);

    render(
      <SessionInitializer>
        <div>App content</div>
      </SessionInitializer>,
    );

    expect(mockSessionStoreState.markSessionResolved).toHaveBeenCalled();
    expect(mockSessionStoreState.setSession).not.toHaveBeenCalled();
    expect(screen.getByText("App content")).toBeInTheDocument();
  });

  it("should mark session as resolved when stored session does not contain user", () => {
    (getSession as jest.Mock).mockReturnValue({
      accessToken: "mock-token",
    });

    render(
      <SessionInitializer>
        <div>App content</div>
      </SessionInitializer>,
    );

    expect(mockSessionStoreState.markSessionResolved).toHaveBeenCalled();
    expect(mockSessionStoreState.setSession).not.toHaveBeenCalled();
    expect(screen.getByText("App content")).toBeInTheDocument();
  });
});
