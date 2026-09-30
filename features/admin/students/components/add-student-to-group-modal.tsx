"use client";

import { useState } from "react";

import { AdminModal } from "@/components/modal/admin-modal";
import {
  ModalPhoneField,
  ModalReadonlyField,
  ModalSelectField,
} from "@/components/modal/modal-fields";
import {
  FACE_ID_OPERATORS,
  LESSON_DAYS,
  LESSON_TIMES,
  TEACHERS,
} from "@/shared/config/options";

import type { StudentSearchResult } from "../types/student";

interface AddStudentToGroupModalProps {
  student: StudentSearchResult | null;
  onClose: () => void;
}

export function AddStudentToGroupModal({
  student,
  onClose,
}: AddStudentToGroupModalProps) {
  const [days, setDays] = useState("");
  const [time, setTime] = useState("");
  const [faceId, setFaceId] = useState("");
  const [teacher, setTeacher] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <AdminModal
      open={student !== null}
      onOpenChange={(open) => !open && onClose()}
      title="O’quvchini guruhga qo’shish"
      top={168.5}
      onSubmit={onClose}
    >
      <ModalSelectField
        label="Dars kunlari"
        placeholder="-Dars kunlarini tanlang-"
        options={LESSON_DAYS}
        value={days}
        onChange={setDays}
      />
      <ModalSelectField
        label="Dars vaqti"
        placeholder="-Dars vaqtini tanlang-"
        options={LESSON_TIMES}
        value={time}
        onChange={setTime}
      />
      <ModalSelectField
        label="Face ID chi"
        placeholder="-FaceID’chini tanlang-"
        options={FACE_ID_OPERATORS}
        value={faceId}
        onChange={setFaceId}
      />
      <ModalReadonlyField label="Yonalish" value={student?.direction ?? ""} />
      <ModalSelectField
        label="O’qituvchi"
        placeholder="-O’qituvchini tanlang-"
        options={TEACHERS}
        value={teacher}
        onChange={setTeacher}
      />
      <ModalPhoneField
        label="Oquvchi telefon nomer"
        value={phone}
        onChange={setPhone}
      />
    </AdminModal>
  );
}
