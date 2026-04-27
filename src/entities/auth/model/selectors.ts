import {SessionStore} from "./types";

export const selectUser = (state: SessionStore) => state.user;
export const selectIsAuthenticated = (state: SessionStore) =>
  state.isAuthenticated;
export const selectIsSessionResolved = (state: SessionStore) =>
  state.isSessionResolved;
export const selectIsSessionLoading = (state: SessionStore) => state.isLoading;
export const selectSessionError = (state: SessionStore) => state.error;

export const selectSetSession = (state: SessionStore) => state.setSession;
export const selectClearSession = (state: SessionStore) => state.clearSession;
export const selectMarkSessionResolved = (state: SessionStore) =>
  state.markSessionResolved;

export const selectCheckSession = (state: SessionStore) => state.checkSession;
export const selectLogin = (state: SessionStore) => state.login;
export const selectLogout = (state: SessionStore) => state.logout;
