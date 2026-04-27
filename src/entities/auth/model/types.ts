import {SessionUser} from "../../user";
import {LoginRequest} from "../api/sessionApi";

export interface SessionPayload {
  user: SessionUser | null;
}
export interface SessionStore {
  user: SessionUser | null;
  isAuthenticated: boolean;
  isSessionResolved: boolean;
  isLoading: boolean;
  error: string | null;

  setSession: (payload: SessionPayload) => void;
  clearSession: () => void;
  markSessionResolved: () => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;

  checkSession: () => Promise<void>;
  login: (loginRequest: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
}
