"use client";


import { Icon } from "@/components/icon";
import {
  AdminTable,
  type AdminColumn,
} from "@/components/admin-table/admin-table";
import { TableFooter } from "@/components/admin-table/table-footer";
import { usePagination } from "@/components/admin-table/use-pagination";

import type { Teacher } from "../types/teacher";

const columns: AdminColumn<Teacher>[] = [
  { key: "index", label: "#", left: 14, headLeft: 15, top: "18px", cell: (_, i) => i + 1 },
  { key: "fullName", label: "O’qituvchi ismi", left: 61, headLeft: 59, top: "17px", cell: (row) => row.fullName },
  { key: "direction", label: "Yo’nalish", left: 418, headLeft: 419, top: "17px", cell: (row) => row.direction },
];

export function TeachersTable({ rows }: { rows: Teacher[] }) {
  const pagination = usePagination(rows);

  return (
    <AdminTable
      columns={columns}
      rows={pagination.visibleRows}
      indexOffset={pagination.offset}
      getRowKey={(row) => row.id}
      headHeight={50}
      headTop="17px"
      textClassName="text-[16px]"
      className="absolute top-19.5 left-3.75 w-342.75 rounded-card"
      style={{ height: "calc(100% - 93px)" }}
      rowActions={() => (
        <button
          type="button"
          aria-label="O’chirish"
          className="absolute top-3.75 right-3.75 size-6"
        >
          <Icon name="trash" size={24} className="text-danger" />
        </button>
      )}
      footerStyle={{ left: 14, bottom: 14, width: 1329 }}
      footer={
        <TableFooter
          page={pagination.page}
          totalPages={pagination.totalPages}
          rowsPerPage={pagination.rowsPerPage}
          onPageChange={pagination.setPage}
          onRowsPerPageChange={pagination.setRowsPerPage}
        />
      }
    />
  );
}
