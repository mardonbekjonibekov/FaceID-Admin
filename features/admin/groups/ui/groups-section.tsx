"use client";

import { useState } from "react";

import { PrimaryButton } from "@/components/admin-table/primary-button";
import { SearchInput } from "@/components/admin-table/search-input";

import { mockGroups } from "../api/mock-groups";
import { CreateGroupModal } from "../components/create-group-modal";
import { GroupsTable } from "../components/groups-table";

export function GroupsSection() {
  const [query, setQuery] = useState("");
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <main className="min-h-screen pt-32.5 pb-3.5">
      <section className="relative mr-auto ml-5 h-[min(880px,max(760px,calc(100vh-144px)))] w-348 overflow-clip rounded-card bg-white">
        <h1 className="absolute top-6.75 left-4.25 text-[20px] leading-[normal] font-semibold whitespace-nowrap text-ink">
          Guruhlar ro’yxati
        </h1>

        <div className="absolute top-3.75 left-221.5 flex gap-2.5">
          <SearchInput value={query} onChange={setQuery} placeholder="Search..." />
          <PrimaryButton poppins className="w-41.5" onClick={() => setCreateOpen(true)}>
            Guruh qo’shish
          </PrimaryButton>
        </div>

        <GroupsTable
          rows={mockGroups.filter((group) =>
            group.name.toLowerCase().includes(query.trim().toLowerCase()),
          )}
        />
      </section>

      <CreateGroupModal open={createOpen} onOpenChange={setCreateOpen} />
    </main>
  );
}
