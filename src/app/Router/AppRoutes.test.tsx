import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";

import {AppRoutes} from "./AppRoutes";
import {useSessionStore} from "../../entities/auth/model/store";

jest.mock("../../config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

jest.mock("../../pages/LoginPage", () => ({
  LoginPage: () => <div>Login Page</div>,
}));

jest.mock("../../pages/SamplesPage", () => ({
  SamplesPage: () => <div>Samples Page</div>,
}));

jest.mock("../../pages/ReportsPage", () => ({
  ReportsPage: () => <div>Reports Page</div>,
}));

jest.mock("../../layouts/AdminLayout", () => {
  const {Outlet} = jest.requireActual("react-router-dom");

  return {
    AdminLayout: () => (
      <div>
        <div>Admin Layout</div>
        <Outlet />
      </div>
    ),
  };
});

const renderAppRoutes = (initialRoute: string) => {
  render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <AppRoutes />
    </MemoryRouter>,
  );
};

const setUnauthenticatedSession = () => {
  useSessionStore.setState({
    user: null,
    isAuthenticated: false,
    isSessionResolved: true,
  });
};

const setAuthenticatedSession = () => {
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
};

describe("AppRoutes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setUnauthenticatedSession();
  });

  it("should render login page for /login when user is not authenticated", () => {
    renderAppRoutes("/login");

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("should redirect to login when user is not authenticated and tries to access /samples", () => {
    renderAppRoutes("/samples");

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("should redirect authenticated user from /login to /samples", () => {
    setAuthenticatedSession();

    renderAppRoutes("/login");

    expect(screen.getByText("Admin Layout")).toBeInTheDocument();
    expect(screen.getByText("Samples Page")).toBeInTheDocument();
  });

  it("should redirect authenticated user from / to /samples", () => {
    setAuthenticatedSession();

    renderAppRoutes("/");

    expect(screen.getByText("Admin Layout")).toBeInTheDocument();
    expect(screen.getByText("Samples Page")).toBeInTheDocument();
  });

  it("should render reports page when user is authenticated", () => {
    setAuthenticatedSession();

    renderAppRoutes("/reports");

    expect(screen.getByText("Admin Layout")).toBeInTheDocument();
    expect(screen.getByText("Reports Page")).toBeInTheDocument();
  });
});
