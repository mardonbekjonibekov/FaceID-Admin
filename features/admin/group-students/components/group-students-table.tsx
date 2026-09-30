"use client";


import { Icon } from "@/components/icon";
import {
  AdminTable,
  type AdminColumn,
} from "@/components/admin-table/admin-table";
import { TableFooter } from "@/components/admin-table/table-footer";
import { usePagination } from "@/components/admin-table/use-pagination";

import type { GroupStudent } from "../types/group-student";

const columns: AdminColumn<GroupStudent>[] = [
  { key: "index", label: "#", left: 14, headLeft: 15, cell: (_, i) => i + 1 },
  {
    key: "fullName",
    label: "O’quvchi ismi",
    left: 61,
    headLeft: 59,
    cell: (row) => row.fullName,
  },
  {
    key: "jshshir",
    label: "JSHSHR",
    left: 252,
    headLeft: 250,
    cell: (row) => row.jshshir,
  },
  {
    key: "lessonDays",
    label: "Dars kunlari",
    left: 468,
    headLeft: 466,
    cell: (row) => row.lessonDays,
  },
  {
    key: "lessonTime",
    label: "Dars vaqti",
    left: 639,
    headLeft: 640,
    cell: (row) => row.lessonTime,
  },
  {
    key: "faceIdOperator",
    label: "FACE ID chi",
    left: 802,
    headLeft: 803,
    cell: (row) => row.faceIdOperator,
  },
  {
    key: "direction",
    label: "Yo’nalish",
    left: 998,
    headLeft: 995,
    cell: (row) => row.direction,
  },
  {
    key: "teacher",
    label: "O’qituvchi",
    left: 1161,
    headLeft: 1162,
    cell: (row) => row.teacher,
  },
];

interface GroupStudentsTableProps {
  rows: GroupStudent[];
}

export function GroupStudentsTable({ rows }: GroupStudentsTableProps) {
  const pagination = usePagination(rows);

  return (
    <AdminTable
      columns={columns}
      rows={pagination.visibleRows}
      indexOffset={pagination.offset}
      getRowKey={(row) => row.id}
      headHeight={50}
      headTop="calc(50% - 8px)"
      textClassName="text-[14px]"
      className="absolute top-19.5 left-3.75 w-342.5 rounded-card"
      style={{ height: "calc(100% - 93px)" }}
      rowActions={() => (
        <button
          type="button"
          aria-label="O’chirish"
          className="absolute top-3.75 right-4.75 size-6"
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
