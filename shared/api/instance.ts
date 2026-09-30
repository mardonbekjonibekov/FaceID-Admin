import axios, { type AxiosError } from "axios";

import { ApiError } from "./api-error";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

function extractErrorMessage(data: unknown, fallback: string): string {
  if (!data || typeof data !== "object") return fallback;

  const record = data as Record<string, unknown>;

  if (
    typeof record.error === "object" &&
    record.error !== null &&
    typeof (record.error as { message?: unknown }).message === "string"
  ) {
    return (record.error as { message: string }).message;
  }

  if (typeof record.detail === "string") return record.detail;

  const fieldErrors = Object.entries(record)
    .filter((entry): entry is [string, string[]] => Array.isArray(entry[1]))
    .map(([field, msgs]) => `${field}: ${msgs.join(", ")}`)
    .join("; ");

  return fieldErrors || fallback;
}

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const data = error.response?.data;
    const message = extractErrorMessage(
      data,
      error.message || "Something went wrong. Please try again.",
    );

    return Promise.reject(
      new ApiError({
        status: error.response?.status ?? 0,
        message,
        raw: data ?? error,
      }),
    );
  },
);
