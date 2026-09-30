"use client";

import { useState } from "react";
import { toast } from "sonner";

import { PrimaryButton } from "@/components/admin-table/primary-button";
import { SearchInput } from "@/components/admin-table/search-input";
import { ConfirmDeleteModal } from "@/components/modal/confirm-delete-modal";
import { useAdminData } from "@/providers/admin-data-provider";

import { CreateTeacherModal } from "../components/create-teacher-modal";
import { TeachersTable } from "../components/teachers-table";
import type { Teacher } from "../types/teacher";

export function TeachersSection() {
  const { teachers, deleteTeacher } = useAdminData();
  const [query, setQuery] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [toDelete, setToDelete] = useState<Teacher | null>(null);

  const search = query.trim().toLowerCase();
  const rows = teachers.filter((teacher) =>
    teacher.fullName.toLowerCase().includes(search),
  );

  const confirmDelete = () => {
    if (!toDelete) return;
    deleteTeacher(toDelete.id);
    toast.success(`${toDelete.fullName} o’chirildi`);
    setToDelete(null);
  };

  return (
    <main className="min-h-screen pt-32.25 pb-8.5">
      <section className="relative mr-auto ml-5 h-[min(861px,max(760px,calc(100vh-163px)))] w-350.25 overflow-clip rounded-card bg-white">
        <h1 className="absolute top-6.75 left-4.25 text-[20px] leading-[normal] font-semibold whitespace-nowrap text-ink">
          O’qituvchilar ro’yxati
        </h1>

        <div className="absolute top-3.75 left-216.25 flex gap-2.5">
          <SearchInput value={query} onChange={setQuery} placeholder="Search..." />
          <PrimaryButton poppins className="w-49" onClick={() => setCreateOpen(true)}>
            O’qituvchi qo’shish
          </PrimaryButton>
        </div>

        <TeachersTable rows={rows} onDelete={setToDelete} />
      </section>

      <CreateTeacherModal open={createOpen} onOpenChange={setCreateOpen} />
      <ConfirmDeleteModal
        open={toDelete !== null}
        onOpenChange={(open) => !open && setToDelete(null)}
        itemName={toDelete?.fullName ?? ""}
        onConfirm={confirmDelete}
      />
    </main>
  );
}
