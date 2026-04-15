import {render, screen} from "@testing-library/react";
import {Login} from "./useLogin";
import * as localStorageContainsFieldFunction from "../../../utils/localStorage";

jest.mock("../../../Config/envManager", () => ({
  __esModule: true,
  default: {
    BACKEND_URL: "http://mockurl.com/api",
  },
}));
jest.mock("../../../features/Login/ui/LoginForm", () => ({
  LoginForm: () => <div data-testid="login-form" />,
}));
jest.mock("react-router", () => ({
  useNavigate: () => jest.fn(),
}));

describe("Login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render LoginTemplate when there is no user data in local storage", () => {
    jest
      .spyOn(localStorageContainsFieldFunction, "localStorageContainsField")
      .mockReturnValue(false);

    render(<Login />);

    expect(screen.getByTestId("login-form")).toBeInTheDocument();
  });
});
