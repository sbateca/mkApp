import {SessionUser} from "../../../../entities/user";

export type SignInRequest = {
  username: string;
  password: string;
};

export type SignInResponse = {
  user: SessionUser | null;
  accessToken: string | null;
};

export interface ErrorResponse {
  message?: string;
}
