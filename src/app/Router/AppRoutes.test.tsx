import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";

import {AppRoutes} from "./AppRoutes";
import {useSessionStore} from "../../entities/auth/model/store";
import {NOT_FOUND_TEXT} from "../../utils/constants";

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

jest.mock("../../pages/ClientsPage", () => ({
  ClientsPage: () => <div>Clients Page</div>,
}));

jest.mock("../../pages/AnalytesPage", () => ({
  AnalytesPage: () => <div>Analytes Page</div>,
}));

jest.mock("../../pages/AnalysisMethodsPage", () => ({
  AnalysisMethodsPage: () => <div>Analysis Methods Page</div>,
}));

jest.mock("../../pages/CriteriasPage", () => ({
  CriteriasPage: () => <div>Criterias Page</div>,
}));

jest.mock("../../pages/NotFound", () => ({
  NotFoundPage: () => <div>Not Found Page</div>,
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

  it("should render clients page when user is authenticated", () => {
    setAuthenticatedSession();

    renderAppRoutes("/clients");

    expect(screen.getByText("Admin Layout")).toBeInTheDocument();
    expect(screen.getByText("Clients Page")).toBeInTheDocument();
  });

  it("should render analytes page when user is authenticated", () => {
    setAuthenticatedSession();

    renderAppRoutes("/analytes");

    expect(screen.getByText("Admin Layout")).toBeInTheDocument();
    expect(screen.getByText("Analytes Page")).toBeInTheDocument();
  });

  it("should render analysis methods page when user is authenticated", () => {
    setAuthenticatedSession();

    renderAppRoutes("/analysisMethods");

    expect(screen.getByText("Admin Layout")).toBeInTheDocument();
    expect(screen.getByText("Analysis Methods Page")).toBeInTheDocument();
  });

  it("should render criterias page when user is authenticated", () => {
    setAuthenticatedSession();

    renderAppRoutes("/criterias");

    expect(screen.getByText("Admin Layout")).toBeInTheDocument();
    expect(screen.getByText("Criterias Page")).toBeInTheDocument();
  });

  it("should render not found page for unsupported routes", () => {
    const expectedPageText = NOT_FOUND_TEXT;
    setAuthenticatedSession();

    renderAppRoutes("/unsupported-route");

    expect(screen.getByText(expectedPageText)).toBeInTheDocument();
  });
});
