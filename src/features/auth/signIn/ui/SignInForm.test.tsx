import {fireEvent, render, screen, waitFor} from "@testing-library/react";

import {SignInForm} from "./SignInForm";
import {LoginRequest} from "../../../../entities/auth";
import {SnackBarSeverity} from "../../../../utils/enums";

const mockHandleSignIn = jest.fn();
const mockShowSnackBarMessage = jest.fn();

let mockUseSignInState = {
  handleSignIn: mockHandleSignIn,
  isLoading: false,
  errorMessage: null as string | null,
};

jest.mock("../model/useSignIn", () => ({
  useSignIn: () => mockUseSignInState,
}));

jest.mock("../../../snackbar/model/store", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSnackBarStore: (selector: any) =>
    selector({
      showSnackBarMessage: mockShowSnackBarMessage,
    }),
}));

const mockSignInRequest: LoginRequest = {
  username: "mockusername",
  password: "mockPassword",
};

const renderSignInForm = () => {
  render(<SignInForm />);

  return {
    usernameInput: screen.getByLabelText(/username/i),
    passwordInput: screen.getByLabelText(/password/i),
    submitButton: screen.getByRole("button", {name: /sign in/i}),
  };
};

describe("Sign In form", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseSignInState = {
      handleSignIn: mockHandleSignIn,
      isLoading: false,
      errorMessage: null,
    };
  });

  it("should submit successfully", async () => {
    const {usernameInput, passwordInput, submitButton} = renderSignInForm();

    fireEvent.change(usernameInput, {
      target: {value: mockSignInRequest.username},
    });

    fireEvent.change(passwordInput, {
      target: {value: mockSignInRequest.password},
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockHandleSignIn).toHaveBeenCalledWith(mockSignInRequest);
    });

    expect(mockShowSnackBarMessage).not.toHaveBeenCalled();
  });

  it("should show error message when credentials are invalid", async () => {
    mockUseSignInState = {
      handleSignIn: mockHandleSignIn,
      isLoading: false,
      errorMessage: "Invalid credentials",
    };

    renderSignInForm();

    await waitFor(() => {
      expect(mockShowSnackBarMessage).toHaveBeenCalledWith(
        "Invalid credentials",
        SnackBarSeverity.ERROR,
      );
    });
  });
});
