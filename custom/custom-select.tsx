"use client";

import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

export type CustomSelectOption = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  value: string;
  onValueChange: (value: string) => void;
  options: CustomSelectOption[];
  placeholder?: string;
  className?: string;
};

const CustomSelect = ({
  value,
  onValueChange,
  options,
  placeholder,
  className,
}: CustomSelectProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className={cn(
          "h-8 rounded-[10px] border-input-border bg-white px-3 text-[14px] text-label-color shadow-none focus-visible:ring-0",
          className,
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent position="popper" className="rounded-[10px] p-1.25">
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="rounded-none border-b border-[#EBEBEB] last:border-b-0"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { CustomSelect };
