"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { AdminModal } from "@/components/modal/admin-modal";
import {
  ModalPhoneField,
  ModalReadonlyField,
  ModalSelectField,
} from "@/components/modal/modal-fields";
import { useAdminData } from "@/providers/admin-data-provider";
import {
  FACE_ID_OPERATORS,
  LESSON_DAYS,
  LESSON_TIMES,
} from "@/shared/config/options";

import {
  addStudentSchema,
  type AddStudentFormValues,
} from "../schema/add-student-schema";
import type { StudentSearchResult } from "../types/student";

const emptyValues: AddStudentFormValues = {
  lessonDays: "",
  lessonTime: "",
  faceIdOperator: "",
  teacher: "",
  phone: "",
};

interface AddStudentToGroupModalProps {
  student: StudentSearchResult | null;
  onClose: () => void;
}

export function AddStudentToGroupModal({
  student,
  onClose,
}: AddStudentToGroupModalProps) {
  const { teachers, addStudentToGroup } = useAdminData();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddStudentFormValues>({
    resolver: zodResolver(addStudentSchema),
    defaultValues: emptyValues,
  });

  const teacherNames = [...new Set(teachers.map((teacher) => teacher.fullName))];

  const close = () => {
    reset(emptyValues);
    onClose();
  };

  const onSubmit = handleSubmit((values) => {
    if (!student) return;

    const result = addStudentToGroup({ student, ...values });
    if (!result.ok) {
      toast.error(result.error);
      return;
    }

    toast.success(`${student.fullName} “${result.groupName}” guruhiga qo’shildi`);
    close();
  });

  return (
    <AdminModal
      open={student !== null}
      onOpenChange={(open) => !open && close()}
      title="O’quvchini guruhga qo’shish"
      top={168.5}
      onSubmit={onSubmit}
    >
      <ModalSelectField
        label="Dars kunlari"
        placeholder="-Dars kunlarini tanlang-"
        options={LESSON_DAYS}
        error={errors.lessonDays?.message}
        {...register("lessonDays")}
      />
      <ModalSelectField
        label="Dars vaqti"
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
      <ModalReadonlyField label="Yonalish" value={student?.direction ?? ""} />
      <ModalSelectField
        label="O’qituvchi"
        placeholder="-O’qituvchini tanlang-"
        options={teacherNames}
        error={errors.teacher?.message}
        {...register("teacher")}
      />
      <Controller
        control={control}
        name="phone"
        render={({ field }) => (
          <ModalPhoneField
            label="Oquvchi telefon nomer"
            value={field.value}
            onChange={field.onChange}
            error={errors.phone?.message}
          />
        )}
      />
    </AdminModal>
  );
}
