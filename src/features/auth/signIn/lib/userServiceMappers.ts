import {FormProps} from "../../../../utils/constants";
import {SignInRequest} from "../api/signInRequest";

export const formToSignInRequest = (form: FormProps) => {
  const signInRequest: SignInRequest = {
    username: form.username,
    password: form.password,
  };
  return signInRequest;
};
