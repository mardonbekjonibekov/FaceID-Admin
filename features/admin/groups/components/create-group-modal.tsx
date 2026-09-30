"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AdminModal } from "@/components/modal/admin-modal";
import {
  ModalSelectField,
  ModalTextField,
} from "@/components/modal/modal-fields";
import { useAdminData } from "@/providers/admin-data-provider";
import {
  DIRECTIONS,
  FACE_ID_OPERATORS,
  LESSON_DAYS,
  LESSON_TIMES,
} from "@/shared/config/options";

import {
  groupSchema,
  type GroupFormValues,
} from "../schema/group-schema";

const emptyValues: GroupFormValues = {
  name: "",
  lessonDays: "",
  lessonTime: "",
  faceIdOperator: "",
  direction: "",
  teacher: "",
};

interface CreateGroupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateGroupModal({ open, onOpenChange }: CreateGroupModalProps) {
  const { teachers, addGroup } = useAdminData();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GroupFormValues>({
    resolver: zodResolver(groupSchema),
    defaultValues: emptyValues,
  });

  const teacherNames = [...new Set(teachers.map((teacher) => teacher.fullName))];

  const handleOpenChange = (next: boolean) => {
    if (!next) reset(emptyValues);
    onOpenChange(next);
  };

  const onSubmit = handleSubmit((values) => {
    addGroup({ ...values, name: values.name.trim() });
    toast.success(`“${values.name.trim()}” guruhi yaratildi`);
    handleOpenChange(false);
  });

  return (
    <AdminModal
      open={open}
      onOpenChange={handleOpenChange}
      title="Guruh yaratish"
      top={149}
      onSubmit={onSubmit}
    >
      <ModalTextField
        label="Guruh nomi"
        placeholder="Guruh nomini kiriting"
        error={errors.name?.message}
        {...register("name")}
      />
      <ModalSelectField
        label="Dars kunlari"
        placeholder="-Dars kunlarini tanlang-"
        options={LESSON_DAYS}
        error={errors.lessonDays?.message}
        {...register("lessonDays")}
      />
      <ModalSelectField
        label="Dars vaqtlari"
        placeholder="-Dars vaqtini tanlang-"
        options={LESSON_TIMES}
        error={errors.lessonTime?.message}
        {...register("lessonTime")}
      />
      <ModalSelectField
        label="Face ID chi"
        placeholder="-FaceID’chini tanlang-"
        options={FACE_ID_OPERATORS}
        error={errors.faceIdOperator?.message}
        {...register("faceIdOperator")}
      />
      <ModalSelectField
        label="Yo’nalish"
        placeholder="-Yo’nalishni tanlang-"
        options={DIRECTIONS}
        error={errors.direction?.message}
        {...register("direction")}
      />
      <ModalSelectField
        label="O’qituvchi"
        placeholder="-O’qituvchini tanlang-"
        options={teacherNames}
        error={errors.teacher?.message}
        {...register("teacher")}
      />
    </AdminModal>
  );
}
