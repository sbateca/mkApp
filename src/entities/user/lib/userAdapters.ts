import {AxiosResponse} from "axios";

import {getInvalidDataErrorMessage} from "../../../utils/constants";
import {User} from "../model/User";

export const localStorageToUser = (userData: string | null): User | null => {
  if (userData !== null) {
    const user: User = JSON.parse(userData);
    return user;
  }
  return null;
};

export const axiosResponseToUser = (response: AxiosResponse<unknown>): User => {
  if (isValidUser(response.data)) {
    return response.data as User;
  } else {
    throw new Error(getInvalidDataErrorMessage("user"));
  }
};

const isValidUser = (user: unknown): user is User => {
  if (typeof user === "object" && user !== null) {
    const userObj = user as Record<string, unknown>;
    return (
      typeof userObj.id === "string" &&
      typeof userObj.name === "string" &&
      typeof userObj.username === "string"
    );
  }
  return false;
};
