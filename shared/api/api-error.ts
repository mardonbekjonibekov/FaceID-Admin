import { AxiosError } from "axios";
import { ApiErrorBody } from "./types";

export class ApiError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly raw: unknown;

  constructor(params: {
    status: number;
    code?: string;
    message: string;
    raw: unknown;
  }) {
    super(params.message);
    this.name = "ApiError";
    this.status = params.status;
    this.code = params.code;
    this.raw = params.raw;
  }
}

function isApiErrorBody(value: unknown): value is ApiErrorBody {
  return (
    typeof value === "object" &&
    value !== null &&
    "error" in value &&
    typeof (value as ApiErrorBody).error?.message === "string"
  );
}

export function getApiError(err: unknown): ApiErrorBody["error"] | null {
  if (err instanceof ApiError) return getApiError(err.raw);
  if (isApiErrorBody(err)) return err.error;
  if (err instanceof AxiosError && isApiErrorBody(err.response?.data)) {
    return err.response.data.error;
  }
  return null;
}

export function getApiErrorStatus(err: unknown): number | undefined {
  if (err instanceof ApiError) return err.status || undefined;
  if (err instanceof AxiosError) return err.response?.status;
  return undefined;
}

export function getApiErrorMessage(err: unknown, fallback?: string): string {
  const defaultMessage = fallback ?? "Something went wrong. Please try again.";

  if (err instanceof ApiError) {
    if (err.message) return err.message;
    return getApiErrorMessage(err.raw, defaultMessage);
  }

  const apiError = getApiError(err);
  if (apiError) {
    if (apiError.details) {
      const fieldErrors = Object.entries(apiError.details)
        .filter((entry): entry is [string, string[]] => Array.isArray(entry[1]))
        .map(([field, msgs]) => `${field}: ${msgs.join(", ")}`)
        .join("; ");
      if (fieldErrors) return fieldErrors;

      const detailsMessage = (apiError.details as { message?: unknown })
        ?.message;
      if (typeof detailsMessage === "string") return detailsMessage;
    }

    return apiError.message || defaultMessage;
  }

  if (err instanceof AxiosError) {
    const data = err.response?.data;
    if (data && typeof data === "object") {
      const record = data as Record<string, unknown>;
      if (typeof record.detail === "string") return record.detail;

      const fieldErrors = Object.entries(record)
        .filter((entry): entry is [string, string[]] => Array.isArray(entry[1]))
        .map(([field, msgs]) => `${field}: ${msgs.join(", ")}`)
        .join("; ");
      if (fieldErrors) return fieldErrors;
    }
  }

  if (
    err &&
    typeof err === "object" &&
    "detail" in err &&
    typeof (err as { detail: unknown }).detail === "string"
  ) {
    return (err as { detail: string }).detail;
  }

  return defaultMessage;
}

export function getApiFieldErrors(
  err: unknown,
  allowedFields: readonly string[],
): Record<string, string> | null {
  const apiError = getApiError(err);
  if (!apiError?.details) return null;

  const result: Record<string, string> = {};
  for (const [field, messages] of Object.entries(apiError.details)) {
    if (
      allowedFields.includes(field) &&
      Array.isArray(messages) &&
      messages[0]
    ) {
      result[field] = messages[0];
    }
  }
  return Object.keys(result).length > 0 ? result : null;
}
