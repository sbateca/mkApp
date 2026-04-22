import {STORAGE_KEYS} from "../../../config/storage";
import {SessionUser} from "../../user";

export type StoredSession = {
  user: SessionUser | null;
  accessToken: string | null;
};

export const saveSession = (storedSession: StoredSession): void => {
  localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(storedSession));
};

export const getSession = (): StoredSession | null => {
  const raw = localStorage.getItem(STORAGE_KEYS.SESSION);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as StoredSession;
  } catch {
    return null;
  }
};

export const clearStoredSession = (): void => {
  localStorage.removeItem(STORAGE_KEYS.SESSION);
};
