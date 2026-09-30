import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";

const controlClass =
  "h-12.5 w-full rounded-field bg-surface text-[16px] text-ink outline-none";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex h-18.75 flex-col gap-1.25">
      <span className="text-[14px] text-ink">{label}</span>
      {children}
    </label>
  );
}

interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function ModalTextField({ label, className, ...props }: TextFieldProps) {
  return (
    <Field label={label}>
      <input
        className={cn(
          controlClass,
          "px-3.25 placeholder:text-ink-placeholder",
          className,
        )}
        {...props}
      />
    </Field>
  );
}

interface SelectFieldProps {
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export function ModalSelectField({
  label,
  placeholder,
  options,
  value,
  onChange,
}: SelectFieldProps) {
  return (
    <Field label={label}>
      <span className="relative block">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={cn(
            controlClass,
            "cursor-pointer appearance-none pr-11 pl-3.25 font-medium text-ink",
          )}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option} className="text-ink">
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

export function ModalPhoneField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Field label={label}>
      <span
        className={cn(controlClass, "flex items-center gap-2.5 px-3.25")}
      >
        <span className="font-medium">+998</span>
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="00 000-00-00"
          inputMode="numeric"
          className="h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-ink-placeholder"
        />
      </span>
    </Field>
  );
}
