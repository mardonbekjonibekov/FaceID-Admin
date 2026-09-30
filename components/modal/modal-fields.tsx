import type { ComponentProps, ReactNode } from "react";

import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";

const controlClass =
  "h-12.5 w-full rounded-field bg-surface text-[16px] text-ink outline-none";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="relative flex h-18.75 flex-col gap-1.25">
      <span className="text-[14px] text-ink">{label}</span>
      {children}
      {error ? (
        <span
          role="alert"
          className="absolute top-19.5 left-0 text-[12px] leading-4 text-danger"
        >
          {error}
        </span>
      ) : null}
    </label>
  );
}

const errorRing = "ring-1 ring-danger";

interface TextFieldProps extends ComponentProps<"input"> {
  label: string;
  error?: string;
}

export function ModalTextField({
  label,
  error,
  className,
  ...props
}: TextFieldProps) {
  return (
    <Field label={label} error={error}>
      <input
        aria-invalid={error ? true : undefined}
        className={cn(
          controlClass,
          "px-3.25 placeholder:text-ink-placeholder",
          error && errorRing,
          className,
        )}
        {...props}
      />
    </Field>
  );
}

interface SelectFieldProps extends ComponentProps<"select"> {
  label: string;
  placeholder: string;
  options: string[];
  error?: string;
}

export function ModalSelectField({
  label,
  placeholder,
  options,
  error,
  className,
  ...props
}: SelectFieldProps) {
  return (
    <Field label={label} error={error}>
      <span className="relative block">
        <select
          aria-invalid={error ? true : undefined}
          className={cn(
            controlClass,
            "cursor-pointer appearance-none pr-11 pl-3.25 font-medium text-ink",
            error && errorRing,
            className,
          )}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <Icon
          name="chevron-down"
          size={24}
          className="pointer-events-none absolute top-3.25 right-3 text-ink"
        />
      </span>
    </Field>
  );
}

export function ModalReadonlyField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <Field label={label}>
      <input
        readOnly
        value={value}
        className={cn(controlClass, "bg-surface-readonly px-3.25 font-medium")}
      />
    </Field>
  );
}

/** "901234567" -> "90 123-45-67" */
export function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 9);
  const parts = [
    digits.slice(0, 2),
    digits.slice(2, 5),
    digits.slice(5, 7),
    digits.slice(7, 9),
  ].filter(Boolean);
  if (parts.length <= 2) return parts.join(" ");
  return `${parts[0]} ${parts[1]}${parts[2] ? `-${parts[2]}` : ""}${parts[3] ? `-${parts[3]}` : ""}`;
}

interface PhoneFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function ModalPhoneField({
  label,
  value,
  onChange,
  error,
}: PhoneFieldProps) {
  return (
    <Field label={label} error={error}>
      <span
        className={cn(
          controlClass,
          "flex items-center gap-2.5 px-3.25",
          error && errorRing,
        )}
      >
        <span className="font-medium">+998</span>
        <input
          value={value}
          onChange={(event) => onChange(formatPhone(event.target.value))}
          placeholder="00 000-00-00"
          inputMode="numeric"
          aria-invalid={error ? true : undefined}
          className="h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-ink-placeholder"
        />
      </span>
    </Field>
  );
}
