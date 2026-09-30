import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const CustomInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, onChange, type, error, ...props }, ref) => {
    return (
      <Input
        type={type}
        className={cn(
          "w-full bg-input-bg border-none shadow-none rounded-[10px] px-4.5 h-11 text-[16px] outline-none transition-all duration-200 placeholder:text-placeholder-text",
          error ? "border-red-500 bg-red-50" : "",
          className,
        )}
        onChange={onChange}
        ref={ref}
        {...props}
      />
    );
  },
);

CustomInput.displayName = "CustomInput";

export { CustomInput };
