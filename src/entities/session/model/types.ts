import {User} from "../../user";

export interface SessionPayload {
  user: User | null;
  accessToken: string | null;
}

export interface SessionStore {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isSessionResolved: boolean;
  setSession: (payload: SessionPayload) => void;
  clearSession: () => void;
  markSessionResolved: () => void;
}
