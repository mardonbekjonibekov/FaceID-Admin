"use client";

import { AdminModal } from "./admin-modal";

interface ConfirmDeleteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** what is being deleted, shown in the question */
  itemName: string;
  onConfirm: () => void;
}

/** "Haqiqatan ham o'chirasizmi?" confirmation shown before every delete. */
export function ConfirmDeleteModal({
  open,
  onOpenChange,
  itemName,
  onConfirm,
}: ConfirmDeleteModalProps) {
  return (
    <AdminModal
      open={open}
      onOpenChange={onOpenChange}
      title="O’chirishni tasdiqlang"
      submitLabel="O’chirish"
      danger
      onSubmit={onConfirm}
    >
      <p className="text-[16px] text-ink-secondary">
        Haqiqatan ham{" "}
        <span className="font-medium text-ink">{itemName}</span>
        ’ni o’chirmoqchimisiz? Bu amalni qaytarib bo’lmaydi.
      </p>
    </AdminModal>
  );
}
