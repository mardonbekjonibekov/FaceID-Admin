"use client";

import { useState } from "react";

import { AdminModal } from "@/components/modal/admin-modal";
import {
  ModalSelectField,
  ModalTextField,
} from "@/components/modal/modal-fields";
import { DIRECTIONS } from "@/shared/config/options";

interface CreateTeacherModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateTeacherModal({
  open,
  onOpenChange,
}: CreateTeacherModalProps) {
  const [fullName, setFullName] = useState("");
  const [direction, setDirection] = useState("");

  return (
    <AdminModal
      open={open}
      onOpenChange={onOpenChange}
      title="O’qituvchi yaratish"
      top={339}
      onSubmit={() => onOpenChange(false)}
    >
      <ModalTextField
        label="Ism Familiya"
        placeholder="Ism Familiyani kiriting"
        value={fullName}
        onChange={(event) => setFullName(event.target.value)}
      />
      <ModalSelectField
        label="Yo’nalish"
        placeholder="-Yo’nalishni tanlang-"
        options={DIRECTIONS}
        value={direction}
        onChange={setDirection}
      />
    </AdminModal>
  );
}
