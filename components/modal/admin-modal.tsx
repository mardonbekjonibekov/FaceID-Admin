"use client";

import { Dialog } from "radix-ui";

import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";

interface AdminModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  /** distance from the top of the 1024px Figma frame; omit to center vertically */
  top?: number;
  children: React.ReactNode;
  submitLabel?: string;
  cancelLabel?: string;
  onSubmit?: () => void;
  /** red submit button, used by delete confirmations */
  danger?: boolean;
  submitting?: boolean;
}

/**
 * Figma modal: 509px wide, 20px side padding, title row, 1px divider,
 * fields (20px gap) and a right-aligned 140 + 138px button pair.
 */
export function AdminModal({
  open,
  onOpenChange,
  title,
  top,
  children,
  submitLabel = "Qo’shish",
  cancelLabel = "Bekor qilish",
  onSubmit,
  danger,
  submitting,
}: AdminModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Dialog.Content
          aria-describedby={undefined}
          className={cn(
            "fixed left-[calc(50%+0.5px)] z-50 w-127.25 -translate-x-1/2 rounded-shell bg-white px-5 pt-6.25 pb-5 font-(family-name:--font-poppins) outline-none",
            top === undefined && "top-1/2 -translate-y-1/2",
          )}
          style={top === undefined ? undefined : { top }}
        >
          <form
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              onSubmit?.();
            }}
          >
            <div className="flex h-6 items-center justify-between">
              <Dialog.Title className="font-sans text-[20px] font-semibold whitespace-nowrap text-ink">
                {title}
              </Dialog.Title>
              <Dialog.Close aria-label="Yopish" className="size-6">
                <Icon name="close" size={24} className="text-ink" />
              </Dialog.Close>
            </div>

            <div className="mt-4.75 h-px w-full bg-line-divider" />

            <div className="mt-5 flex flex-col gap-5">{children}</div>

            <div className="mt-5 ml-auto flex w-71.75 gap-2.25">
              <Dialog.Close className="flex h-12 w-35 items-center justify-center rounded-field bg-brand-cancel text-[16px] whitespace-nowrap text-brand">
                {cancelLabel}
              </Dialog.Close>
              <button
                type="submit"
                disabled={submitting}
                className={cn(
                  "flex h-12 w-34.5 items-center justify-center rounded-field text-[16px] whitespace-nowrap text-white disabled:opacity-60",
                  danger ? "bg-danger" : "bg-brand",
                )}
              >
                {submitLabel}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
