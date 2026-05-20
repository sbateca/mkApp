import {LoginRequest} from "../../../../entities/auth";
import {FormProps, getFormStringValue} from "../../../../utils/constants";

export const formToSignInRequest = (form: FormProps) => {
  const signInRequest: LoginRequest = {
    username: getFormStringValue(form, "username"),
    password: getFormStringValue(form, "password"),
  };
  return signInRequest;
};
