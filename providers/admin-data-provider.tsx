"use client";

import { createContext, useContext, useState } from "react";

import { mockGroupStudents } from "@/features/admin/group-students/api/mock-group-students";
import type { GroupStudent } from "@/features/admin/group-students/types/group-student";
import { mockGroups } from "@/features/admin/groups/api/mock-groups";
import type { Group } from "@/features/admin/groups/types/group";
import type { StudentSearchResult } from "@/features/admin/students/types/student";
import { mockTeachers } from "@/features/admin/teachers/api/mock-teachers";
import type { Teacher } from "@/features/admin/teachers/types/teacher";

export type GroupInput = Omit<Group, "id">;
export type TeacherInput = Omit<Teacher, "id">;

export interface AddStudentInput {
  student: StudentSearchResult;
  lessonDays: string;
  lessonTime: string;
  faceIdOperator: string;
  teacher: string;
  phone: string;
}

export type AddStudentResult =
  | { ok: true; groupName: string }
  | { ok: false; error: string };

interface AdminData {
  groups: Group[];
  teachers: Teacher[];
  groupStudents: GroupStudent[];
  addGroup: (input: GroupInput) => void;
  addTeacher: (input: TeacherInput) => void;
  deleteTeacher: (id: number) => void;
  deleteGroupStudent: (id: number) => void;
  addStudentToGroup: (input: AddStudentInput) => AddStudentResult;
}

const AdminDataContext = createContext<AdminData | null>(null);

const nextId = (items: { id: number }[]) =>
  items.reduce((max, item) => Math.max(max, item.id), 0) + 1;

/**
 * Client-side store for the admin pages. Every action here is where the real
 * API call goes once the backend exists (keep the signatures, swap the bodies).
 */
export function AdminDataProvider({ children }: { children: React.ReactNode }) {
  const [groups, setGroups] = useState(mockGroups);
  const [teachers, setTeachers] = useState(mockTeachers);
  const [groupStudents, setGroupStudents] = useState(mockGroupStudents);

  const value: AdminData = {
    groups,
    teachers,
    groupStudents,

    addGroup: (input) =>
      setGroups((current) => [{ id: nextId(current), ...input }, ...current]),

    addTeacher: (input) =>
      setTeachers((current) => [{ id: nextId(current), ...input }, ...current]),

    deleteTeacher: (id) =>
      setTeachers((current) => current.filter((teacher) => teacher.id !== id)),

    deleteGroupStudent: (id) =>
      setGroupStudents((current) => current.filter((student) => student.id !== id)),

    addStudentToGroup: ({ student, ...lesson }) => {
      const group = groups.find(
        (item) =>
          item.lessonDays === lesson.lessonDays &&
          item.lessonTime === lesson.lessonTime &&
          item.direction === student.direction,
      );

      if (!group) {
        return {
          ok: false,
          error: `${lesson.lessonDays} kuni ${lesson.lessonTime} da "${student.direction}" yo’nalishi bo’yicha guruh topilmadi`,
        };
      }

      if (
        groupStudents.some(
          (item) => item.groupId === group.id && item.jshshir === student.jshshir,
        )
      ) {
        return { ok: false, error: "Bu o’quvchi allaqachon shu guruhda" };
      }

      setGroupStudents((current) => [
        {
          id: nextId(current),
          groupId: group.id,
          fullName: student.fullName,
          jshshir: student.jshshir,
          direction: student.direction,
          ...lesson,
        },
        ...current,
      ]);

      return { ok: true, groupName: group.name };
    },
  };

  return (
    <AdminDataContext.Provider value={value}>
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error("useAdminData must be used inside <AdminDataProvider>");
  }
  return context;
}
