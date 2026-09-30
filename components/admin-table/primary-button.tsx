import { cn } from "@/lib/utils";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  poppins?: boolean;
}

/** Green 48px button used in the Figma toolbars. */
export function PrimaryButton({
  className,
  poppins,
  children,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-12 shrink-0 items-center justify-center rounded-field bg-brand px-5.75 text-[16px] whitespace-nowrap text-white",
        poppins && "font-(family-name:--font-poppins)",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
