import {SessionStore} from "./types";

export const selectUser = (state: SessionStore) => state.user;
export const selectAccessToken = (state: SessionStore) => state.accessToken;
export const selectIsAuthenticated = (state: SessionStore) =>
  state.isAuthenticated;
export const selectIsSessionResolved = (state: SessionStore) =>
  state.isSessionResolved;
export const selectSetSession = (state: SessionStore) => state.setSession;
export const selectClearSession = (state: SessionStore) => state.clearSession;
export const selectMarkSessionResolved = (state: SessionStore) =>
  state.markSessionResolved;
