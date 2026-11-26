export type AuthTokens = {access_token: string; refresh_token: string};

const TOKEN_KEY = "mk.auth.tokens";

export const getAuthTokens = (): AuthTokens | null => {
  try {
    const value = sessionStorage.getItem(TOKEN_KEY);
    const tokens = value ? JSON.parse(value) : null;
    return typeof tokens?.access_token === "string" &&
      typeof tokens?.refresh_token === "string"
      ? tokens
      : null;
  } catch {
    return null;
  }
};

export const setAuthTokens = (tokens: AuthTokens): void => {
  if (
    !tokens ||
    typeof tokens.access_token !== "string" ||
    !tokens.access_token ||
    typeof tokens.refresh_token !== "string" ||
    !tokens.refresh_token
  ) {
    throw new Error("Invalid authentication response");
  }
  sessionStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
};

export const clearAuthTokens = (): void => sessionStorage.removeItem(TOKEN_KEY);
