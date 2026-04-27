import {LoginRequest} from "../../../../entities/auth";
import {FormProps} from "../../../../utils/constants";

export const formToSignInRequest = (form: FormProps) => {
  const signInRequest: LoginRequest = {
    username: form.username,
    password: form.password,
  };
  return signInRequest;
};
