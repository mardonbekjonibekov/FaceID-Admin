"use client";

import { useState } from "react";

import { AdminModal } from "@/components/modal/admin-modal";
import {
  ModalSelectField,
  ModalTextField,
} from "@/components/modal/modal-fields";
import {
  DIRECTIONS,
  FACE_ID_OPERATORS,
  LESSON_DAYS,
  LESSON_TIMES,
  TEACHERS,
} from "@/shared/config/options";

interface CreateGroupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateGroupModal({ open, onOpenChange }: CreateGroupModalProps) {
  const [name, setName] = useState("");
  const [days, setDays] = useState("");
  const [time, setTime] = useState("");
  const [faceId, setFaceId] = useState("");
  const [direction, setDirection] = useState("");
  const [teacher, setTeacher] = useState("");

  return (
    <AdminModal
      open={open}
      onOpenChange={onOpenChange}
      title="Guruh yaratish"
      top={149}
      onSubmit={() => onOpenChange(false)}
    >
      <ModalTextField
        label="Guruh nomi"
        placeholder="Guruh nomini kiriting"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <ModalSelectField label="Dars kunlari" placeholder="-Dars kunlarini tanlang-" options={LESSON_DAYS} value={days} onChange={setDays} />
      <ModalSelectField label="Dars vaqtlari" placeholder="-Dars vaqtini tanlang-" options={LESSON_TIMES} value={time} onChange={setTime} />
      <ModalSelectField label="Face ID chi" placeholder="-FaceID’chini tanlang-" options={FACE_ID_OPERATORS} value={faceId} onChange={setFaceId} />
      <ModalSelectField label="Yo’nalish" placeholder="-Yo’nalishni tanlang-" options={DIRECTIONS} value={direction} onChange={setDirection} />
      <ModalSelectField label="O’qituvchi" placeholder="-O’qituvchini tanlang-" options={TEACHERS} value={teacher} onChange={setTeacher} />
    </AdminModal>
  );
}
