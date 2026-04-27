export type ApiErrorResponse = {
  message?: string;
  code?: string;
  statusCode?: number;
};

export class AppApiError extends Error {
  status?: number;
  code?: string;

  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = "AppApiError";
    this.status = status;
    this.code = code;
  }
}
