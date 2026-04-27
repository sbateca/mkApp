import {render, screen} from "@testing-library/react";
import {MemoryRouter, Route, Routes} from "react-router-dom";

import {ProtectedRoute} from "./ProtectedRoute";
import {useSessionStore} from "../../entities/auth/model/store";

jest.mock("../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

jest.mock("../../shared/ui", () => ({
  Spinner: () => <div>Loading...</div>,
}));

const renderProtectedRoute = () => {
  render(
    <MemoryRouter initialEntries={["/reports"]}>
      <Routes>
        <Route path="/login" element={<div>Login page</div>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/reports" element={<div>Reports page</div>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
};

describe("ProtectedRoute", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    useSessionStore.setState({
      user: null,
      isAuthenticated: false,
      isSessionResolved: true,
    });
  });

  it("should render loading state when session is not resolved", () => {
    useSessionStore.setState({
      isSessionResolved: false,
      isAuthenticated: false,
    });

    renderProtectedRoute();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should redirect to login when user is not authenticated", () => {
    renderProtectedRoute();

    expect(screen.getByText("Login page")).toBeInTheDocument();
  });

  it("should render protected content when user is authenticated", () => {
    useSessionStore.setState({
      user: {
        id: 1,
        username: "admin",
        name: "Admin",
        role: "admin",
      },
      isAuthenticated: true,
      isSessionResolved: true,
    });

    renderProtectedRoute();

    expect(screen.getByText("Reports page")).toBeInTheDocument();
  });
});
