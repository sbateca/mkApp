import {render, screen} from "@testing-library/react";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import {PublicOnlyRoute} from "./PublicOnlyRoute";
import {useSessionStore} from "../../entities/session/model/store";

describe("PublicOnlyRoute", () => {
  beforeEach(() => {
    useSessionStore.setState({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isSessionResolved: true,
    });
  });

  it("should render public content when user is not authenticated", () => {
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
      accessToken: "mock-token",
      isAuthenticated: true,
      isSessionResolved: true,
    });

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

    expect(screen.getByText("Samples page")).toBeInTheDocument();
  });
});
