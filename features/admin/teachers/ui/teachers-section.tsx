"use client";

import { useState } from "react";

import { PrimaryButton } from "@/components/admin-table/primary-button";
import { SearchInput } from "@/components/admin-table/search-input";

import { mockTeachers } from "../api/mock-teachers";
import { CreateTeacherModal } from "../components/create-teacher-modal";
import { TeachersTable } from "../components/teachers-table";

export function TeachersSection() {
  const [query, setQuery] = useState("");
  const [createOpen, setCreateOpen] = useState(false);

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

        <TeachersTable
          rows={mockTeachers.filter((teacher) =>
            teacher.fullName.toLowerCase().includes(query.trim().toLowerCase()),
          )}
        />
      </section>

      <CreateTeacherModal open={createOpen} onOpenChange={setCreateOpen} />
    </main>
  );
}
