import {render, screen} from "@testing-library/react";
import {MemoryRouter, Route, Routes} from "react-router-dom";

import {PublicOnlyRoute} from "./PublicOnlyRoute";
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

const renderPublicOnlyRoute = () => {
  render(
    <MemoryRouter initialEntries={["/login"]}>
      <Routes>
        <Route path="/samples" element={<div>Samples page</div>} />
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<div>Login page</div>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
};

describe("PublicOnlyRoute", () => {
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

    renderPublicOnlyRoute();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render public content when user is not authenticated", () => {
    renderPublicOnlyRoute();

    expect(screen.getByText("Login page")).toBeInTheDocument();
  });

  it("should redirect to samples when user is authenticated", () => {
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

    renderPublicOnlyRoute();

    expect(screen.getByText("Samples page")).toBeInTheDocument();
  });
});
