"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { searchStudents, mockStudents } from "../api/mock-students";
import { AddStudentToGroupModal } from "../components/add-student-to-group-modal";
import { StudentResultsTable } from "../components/student-results-table";
import { StudentSearchForm } from "../components/student-search-form";
import type { StudentSearchResult } from "../types/student";

export function StudentsSection() {
  const [results, setResults] = useState(mockStudents);
  const [selected, setSelected] = useState<StudentSearchResult | null>(null);

  // More than one page of results: behave like the Guruhlar page (card fills the screen, footer with paging).
  const paged = results.length > 10;

  return (
    <main
      className={cn(
        "flex min-h-screen justify-center",
        paged ? "items-start pt-31.25 pb-5" : "items-center py-31.25",
      )}
    >
      <div className="flex w-191.5 flex-col gap-2.5">
        <StudentSearchForm onSearch={(value) => setResults(searchStudents(value))} />

        <section
          className={cn(
            "relative overflow-clip rounded-panel bg-white p-5",
            paged && "h-[max(400px,calc(100vh-270px))]",
          )}
        >
          {results.length > 0 ? (
            <StudentResultsTable rows={results} onAdd={setSelected} paged={paged} />
          ) : (
            <div className="flex h-50.75 items-center justify-center">
              <p className="text-[17px] text-ink-muted">Ma’lumot topilmadi</p>
            </div>
          )}
        </section>
      </div>

      <AddStudentToGroupModal
        student={selected}
        onClose={() => setSelected(null)}
      />
    </main>
  );
}
