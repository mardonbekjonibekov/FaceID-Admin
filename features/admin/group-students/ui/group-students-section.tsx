"use client";

import Link from "next/link";
import { useState } from "react";

import { Icon } from "@/components/icon";
import { SearchInput } from "@/components/admin-table/search-input";

import { mockGroupStudents } from "../api/mock-group-students";
import { GroupStudentsTable } from "../components/group-students-table";

interface GroupStudentsSectionProps {
  groupName: string;
}

export function GroupStudentsSection({ groupName }: GroupStudentsSectionProps) {
  const [query, setQuery] = useState("");

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
          {groupName}’dagi o’quvchilar ro’yxati
        </h1>

        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Qidirsh"
          textLeft={45}
          className="absolute top-3.75 left-267.5"
        />

        <GroupStudentsTable
          rows={mockGroupStudents.filter((student) =>
            student.fullName.toLowerCase().includes(query.trim().toLowerCase()),
          )}
        />
      </section>
    </main>
  );
}
