import {create} from "zustand";
import {SessionStore} from "./types";
import {STORAGE_KEYS} from "../../../config/storage";
import {removeFromStorage, saveToStorage} from "../../../utils/browserStorage";

export const useSessionStore = create<SessionStore>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isSessionResolved: false,

  setSession: ({user, accessToken}) => {
    saveToStorage(STORAGE_KEYS.SESSION, {user, accessToken});
    set({
      user,
      accessToken,
      isAuthenticated: true,
      isSessionResolved: true,
    });
  },

  clearSession: () => {
    removeFromStorage(STORAGE_KEYS.SESSION);

    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isSessionResolved: true,
    });
  },

  markSessionResolved: () =>
    set({
      isSessionResolved: true,
    }),
}));
