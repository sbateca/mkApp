import {create} from "zustand";
import {SessionStore} from "./types";
import {clearStoredSession, saveSession} from "../lib/sessionStorage";

export const useSessionStore = create<SessionStore>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isSessionResolved: false,

  setSession: ({user, accessToken}) => {
    saveSession({user, accessToken});
    set({
      user: user,
      accessToken: accessToken,
      isAuthenticated: true,
      isSessionResolved: true,
    });
  },

  clearSession: () => {
    clearStoredSession();

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
