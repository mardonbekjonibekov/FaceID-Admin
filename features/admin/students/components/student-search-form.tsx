"use client";

import { useState } from "react";

interface StudentSearchFormProps {
  onSearch: (jshshir: string) => void;
}

export function StudentSearchForm({ onSearch }: StudentSearchFormProps) {
  const [value, setValue] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSearch(value);
      }}
      className="flex w-full items-end gap-3 rounded-panel bg-white px-4.25 py-5"
    >
      <label className="flex min-w-px flex-1 flex-col gap-2.5">
        <span className="text-[14px] text-ink">
          O’quvchi JSHSHR ni kitiing (14 ta raqam)
        </span>
        <input
          value={value}
          onChange={(event) =>
            setValue(event.target.value.replace(/\D/g, "").slice(0, 14))
          }
          inputMode="numeric"
          maxLength={14}
          placeholder="Masalan: 12345678910111"
          className="h-12 w-full rounded-field border border-line-input bg-surface pl-7.5 text-[16px] text-ink outline-none placeholder:text-ink-placeholder-soft"
        />
      </label>
      <button
        type="submit"
        className="flex h-12 w-51.5 shrink-0 items-center justify-center rounded-field bg-brand px-8.5 py-3.75 text-[16px] whitespace-nowrap text-white"
      >
        Qidirish
      </button>
    </form>
  );
}
