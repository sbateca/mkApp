import {render, screen} from "@testing-library/react";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import {ProtectedRoute} from "./ProtectedRoute";
import {useSessionStore} from "../../entities/session/model/store";

describe("ProtectedRoute", () => {
  beforeEach(() => {
    useSessionStore.setState({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isSessionResolved: true,
    });
  });

  it("should redirect to login when user is not authenticated", () => {
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
      accessToken: "mock-token",
      isAuthenticated: true,
      isSessionResolved: true,
    });

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

    expect(screen.getByText("Reports page")).toBeInTheDocument();
  });
});
