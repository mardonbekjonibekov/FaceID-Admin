import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  /** padding-left of the text (Figma differs between frames) */
  textLeft?: number;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder,
  textLeft = 44,
  className,
}: SearchInputProps) {
  return (
    <label
      className={cn(
        "relative block h-12 w-78.75 shrink-0 overflow-clip rounded-field border border-line-search bg-surface",
        className,
      )}
    >
      <Icon
        name="search-normal"
        size={20}
        className="absolute top-1/2 left-2.75 -translate-y-1/2 text-ink-muted"
      />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-full w-full bg-transparent pr-3 text-[16px] text-ink outline-none placeholder:text-ink-muted"
        style={{ paddingLeft: textLeft }}
      />
    </label>
  );
}
