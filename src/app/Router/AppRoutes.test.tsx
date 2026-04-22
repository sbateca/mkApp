import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {AppRoutes} from "./AppRoutes";
import {useSessionStore} from "../../entities/session/model/store";

jest.mock("../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

describe("AppRoutes", () => {
  beforeEach(() => {
    useSessionStore.setState({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isSessionResolved: true,
    });
  });

  it("should render login page for /login when user is not authenticated", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });
});
