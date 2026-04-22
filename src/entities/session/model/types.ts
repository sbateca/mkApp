import {SessionUser} from "../../user";

export interface SessionPayload {
  user: SessionUser | null;
  accessToken: string | null;
}

export interface SessionStore {
  user: SessionUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isSessionResolved: boolean;
  setSession: (payload: SessionPayload) => void;
  clearSession: () => void;
  markSessionResolved: () => void;
}
