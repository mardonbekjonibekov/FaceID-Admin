export type ApiErrorDetails = Record<string, string[] | unknown>;

export type ApiErrorBody = {
  error: {
    code: string;
    message: string;
    details?: ApiErrorDetails;
  };
};
