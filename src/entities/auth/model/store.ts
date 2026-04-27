import {create} from "zustand";
import {SessionStore} from "./types";
import {LoginRequest, sessionApi} from "../api/sessionApi";
import {UNEXPECTED_ERROR} from "../../../utils/constants";

export const useSessionStore = create<SessionStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isSessionResolved: false,
  isLoading: false,
  error: null,

  setSession: ({user}) =>
    set({
      user: user,
      isAuthenticated: true,
      isSessionResolved: true,
      isLoading: false,
      error: null,
    }),

  clearSession: () =>
    set({
      user: null,
      isAuthenticated: false,
      isSessionResolved: true,
      isLoading: false,
      error: null,
    }),

  markSessionResolved: () =>
    set({
      isSessionResolved: true,
    }),

  setIsLoading: (isLoading: boolean) =>
    set({
      isLoading: isLoading,
    }),

  setError: (error: string | null) =>
    set({
      error: error,
    }),

  checkSession: async () => {
    set({isLoading: true, error: null});

    try {
      const response = await sessionApi.getCurrentSession();
      set({
        user: response.user,
        isAuthenticated: true,
        isSessionResolved: true,
        isLoading: false,
        error: null,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        isSessionResolved: true,
      });
    }
  },

  login: async (loginRequest: LoginRequest) => {
    set({isLoading: true, error: null});

    try {
      const response = await sessionApi.login(loginRequest);

      set({
        user: response.user,
        isAuthenticated: true,
        isSessionResolved: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : UNEXPECTED_ERROR;
      set({
        user: null,
        isAuthenticated: false,
        isSessionResolved: true,
        isLoading: false,
        error: message,
      });

      throw error;
    }
  },

  logout: async () => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      await sessionApi.logout();
    } finally {
      set({
        user: null,
        isAuthenticated: false,
        isSessionResolved: true,
        isLoading: false,
        error: null,
      });
    }
  },
}));
