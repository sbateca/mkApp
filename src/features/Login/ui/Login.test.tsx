import {render, screen} from "@testing-library/react";
import {LoginTemplate} from "./Login";
import {COMPANY_NAME, LOGIN_FORM_FIELDS} from "../../../utils/constants";

jest.mock("../../../Config/envManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));
jest.mock("../../../features/Login/ui/LoginForm", () => ({
  LoginForm: () => (
    <div data-testid="login-form">
      {LOGIN_FORM_FIELDS.map((field) => (
        <div key={field.name}>
          <label>{field.label}</label>
          <input name={field.name} type={field.type} data-testid={field.name} />
        </div>
      ))}
      ,
    </div>
  ),
}));

describe("LoginTemplate", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without errors", async () => {
    render(<LoginTemplate />);

    const login = screen.queryByTestId("login-form");

    expect(login).toBeInTheDocument();
  });

  it("renders the login form", async () => {
    const {getByTestId} = render(<LoginTemplate />);

    const loginForm = getByTestId("login-form");

    expect(loginForm).toBeInTheDocument();
  });

  it("renders the company name", async () => {
    const {getByText} = render(<LoginTemplate />);

    const companyName = getByText(COMPANY_NAME);

    expect(companyName).toBeInTheDocument();
  });

  it("renders the login form fields", async () => {
    render(<LoginTemplate />);
    LOGIN_FORM_FIELDS.forEach((field) => {
      const formFieldLabel = screen.getByText(field.label);
      const formFieldInput = screen.getByText(field.label);
      expect(formFieldLabel).toBeInTheDocument();
      expect(formFieldInput).toBeInTheDocument();
    });
  });
});
