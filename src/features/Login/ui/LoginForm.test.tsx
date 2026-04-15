import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import {LoginForm} from "./LoginForm";
import {
  LOGIN_ERROR_ACCESS_DENIED_MESSAGE,
  LOGIN_FORM_SIGN_IN,
} from "../../../utils/constants";
import {LoginFormProps} from "./Types";
import {getUserByUserName} from "../../../services/userService";

jest.mock("../../../Config/EnvManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));

jest.mock("../../../Services/userService", () => ({
  getUserByUserName: jest.fn(),
}));

describe("LoginForm component", () => {
  const originalLocation = window.location;
  const mockReload = jest.fn();

  beforeAll(() => {
    Storage.prototype.removeItem = jest.fn();
    Object.defineProperty(window, "location", {
      configurable: true,
      value: {...window.location, reload: mockReload},
    });
  });

  afterAll(() => {
    Object.defineProperty(window, "location", {value: originalLocation});
  });

  it("renders form fields correctly", () => {
    render(
      <LoginForm
        fields={[
          {name: "username", label: "Username", type: "text", isRequired: true},
        ]}
      />,
    );

    expect(screen.getByText("Username")).toBeInTheDocument();
  });

  it("displays error message if login fails", async () => {
    (getUserByUserName as jest.Mock).mockResolvedValue([]);
    render(
      <LoginForm
        fields={[
          {name: "username", label: "Username", type: "text", isRequired: true},
        ]}
      />,
    );

    // eslint-disable-next-line quotes
    const usernameInput = document.querySelector('input[name="username"]');
    if (usernameInput) {
      fireEvent.change(usernameInput, {target: {value: "testuser"}});
      const submitButton = screen.getByText(LOGIN_FORM_SIGN_IN);
      fireEvent.click(submitButton);
    }

    await waitFor(() => {
      expect(getUserByUserName).toHaveBeenCalled();
      expect(
        screen.getByText(LOGIN_ERROR_ACCESS_DENIED_MESSAGE),
      ).toBeInTheDocument();
    });
  });

  it("displays required error if fields are empty and blur event has been dispatched", () => {
    const loginFormProps: LoginFormProps = {
      fields: [
        {name: "username", label: "Username", type: "text", isRequired: true},
      ],
    };
    render(<LoginForm fields={loginFormProps.fields} />);

    // eslint-disable-next-line quotes
    const usernameInput = document.querySelector('input[name="username"]');
    if (usernameInput) {
      fireEvent.blur(usernameInput);
      const errorMessage = "This field is required.";
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    }
  });
});
