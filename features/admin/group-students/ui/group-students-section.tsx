"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Icon } from "@/components/icon";
import { SearchInput } from "@/components/admin-table/search-input";
import { ConfirmDeleteModal } from "@/components/modal/confirm-delete-modal";
import { useAdminData } from "@/providers/admin-data-provider";

import { GroupStudentsTable } from "../components/group-students-table";
import type { GroupStudent } from "../types/group-student";

interface GroupStudentsSectionProps {
  groupId: number;
}

export function GroupStudentsSection({ groupId }: GroupStudentsSectionProps) {
  const { groups, groupStudents, deleteGroupStudent } = useAdminData();
  const [query, setQuery] = useState("");
  const [toDelete, setToDelete] = useState<GroupStudent | null>(null);

  const group = groups.find((item) => item.id === groupId);
  if (!group) notFound();

  const search = query.trim().toLowerCase();
  const rows = groupStudents.filter(
    (student) =>
      student.groupId === groupId &&
      student.fullName.toLowerCase().includes(search),
  );

  const confirmDelete = () => {
    if (!toDelete) return;
    deleteGroupStudent(toDelete.id);
    toast.success(`${toDelete.fullName} guruhdan o’chirildi`);
    setToDelete(null);
  };

  return (
    <main className="min-h-screen pt-31.75 pb-9">
      <section className="relative mx-auto h-[min(861px,max(760px,calc(100vh-163px)))] w-350 overflow-clip rounded-card bg-white">
        <Link
          href="/groups"
          aria-label="Orqaga"
          className="absolute top-3.75 left-3.75 flex size-12 items-center justify-center overflow-clip rounded-field border border-line-table bg-surface"
        >
          <Icon name="arrow-left" size={24} className="text-brand" />
        </Link>

        <h1 className="absolute top-6.5 left-19.25 text-[20px] leading-[normal] font-semibold whitespace-nowrap text-ink">
          {group.name}’dagi o’quvchilar ro’yxati
        </h1>

        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Qidirsh"
          textLeft={45}
          className="absolute top-3.75 left-267.5"
        />

        <GroupStudentsTable rows={rows} onDelete={setToDelete} />
      </section>

      <ConfirmDeleteModal
        open={toDelete !== null}
        onOpenChange={(open) => !open && setToDelete(null)}
        itemName={toDelete?.fullName ?? ""}
        onConfirm={confirmDelete}
      />
    </main>
  );
}
