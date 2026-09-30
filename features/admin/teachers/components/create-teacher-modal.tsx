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
import { DIRECTIONS } from "@/shared/config/options";

import {
  teacherSchema,
  type TeacherFormValues,
} from "../schema/teacher-schema";

const emptyValues: TeacherFormValues = { fullName: "", direction: "" };

interface CreateTeacherModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateTeacherModal({
  open,
  onOpenChange,
}: CreateTeacherModalProps) {
  const { addTeacher } = useAdminData();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeacherFormValues>({
    resolver: zodResolver(teacherSchema),
    defaultValues: emptyValues,
  });

  const handleOpenChange = (next: boolean) => {
    if (!next) reset(emptyValues);
    onOpenChange(next);
  };

  const onSubmit = handleSubmit((values) => {
    const fullName = values.fullName.trim().replace(/\s+/g, " ");
    addTeacher({ fullName, direction: values.direction });
    toast.success(`${fullName} o’qituvchilar ro’yxatiga qo’shildi`);
    handleOpenChange(false);
  });

  return (
    <AdminModal
      open={open}
      onOpenChange={handleOpenChange}
      title="O’qituvchi yaratish"
      top={339}
      onSubmit={onSubmit}
    >
      <ModalTextField
        label="Ism Familiya"
        placeholder="Ism Familiyani kiriting"
        error={errors.fullName?.message}
        {...register("fullName")}
      />
      <ModalSelectField
        label="Yo’nalish"
        placeholder="-Yo’nalishni tanlang-"
        options={DIRECTIONS}
        error={errors.direction?.message}
        {...register("direction")}
      />
    </AdminModal>
  );
}
