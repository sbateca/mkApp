import {fireEvent, render, screen, waitFor} from "@testing-library/react";

import {SnackBarSeverity} from "../../../../utils/enums";
import {SignInRequest, SignInResponse} from "../api/types";
import * as authService from "../api/authService";
import {SignInForm} from "./SignInForm";

const mockSnackBarStoreState = {
  isSnackBarOpen: false,
  snackBarText: "Invalid credentials",
  snackBarSeverity: SnackBarSeverity.ERROR,
  callbackFunction: jest.fn(),
  showSnackBarMessage: jest.fn(),
  closeSnackBar: jest.fn(),
};

const mockSignInRequest: SignInRequest = {
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

jest.mock("../api/authService", () => ({
  signInRequest: jest.fn(),
}));

jest.mock("../../../snackbar/model/store", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useSnackBarStore: (selector: any) => selector(mockSnackBarStoreState),
}));

jest.mock("../api/authService", () => ({
  signInRequest: jest.fn(),
}));

const signInFunction = authService.signInRequest as jest.Mock;

describe("Sign In form", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should submit successfully", async () => {
    const mockResponse: SignInResponse = {
      user: {
        id: 1,
        username: "mockusername",
        name: "Mock User",
        role: "admin",
      },
      accessToken: "mock-token",
    };
    signInFunction.mockResolvedValue(mockResponse);
    const {usernameInput, passwordInput, submitButton} = renderSignInForm();

    fireEvent.change(usernameInput, {
      target: {value: mockSignInRequest.username},
    });
    fireEvent.change(passwordInput, {
      target: {value: mockSignInRequest.password},
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(authService.signInRequest).toHaveBeenCalledWith(mockSignInRequest);
    });
  });

  it("Should show error message when credentials are invalid", async () => {
    signInFunction.mockRejectedValue(new Error("Invalid credentials"));
    const {usernameInput, passwordInput, submitButton} = renderSignInForm();

    fireEvent.change(usernameInput, {
      target: {value: mockSignInRequest.username},
    });
    fireEvent.change(passwordInput, {
      target: {value: mockSignInRequest.password},
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSnackBarStoreState.showSnackBarMessage).toHaveBeenCalled();
    });
  });
});
