import {User} from "../../../../entities/user";
import {getUserByUserName} from "./userService";

export type SignInRequest = {
  username: string;
  password: string;
};

export type SignInResponse = {
  user: User | null;
  accessToken: string | null;
};

export const signInRequest = async (
  payload: SignInRequest,
): Promise<SignInResponse> => {
  const response = await getUserByUserName(payload);

  if (response.length === 0) {
    return {
      user: null,
      accessToken: null,
    };
  }

  return {
    user: response[0],
    accessToken: "temporary-fake-token",
  };
};
