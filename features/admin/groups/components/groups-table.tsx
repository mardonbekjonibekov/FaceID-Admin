"use client";

import Link from "next/link";

import { Icon } from "@/components/icon";
import {
  AdminTable,
  type AdminColumn,
} from "@/components/admin-table/admin-table";
import { TableFooter } from "@/components/admin-table/table-footer";
import { usePagination } from "@/components/admin-table/use-pagination";

import type { Group } from "../types/group";

const TEXT_TOP = "18px";

const columns: AdminColumn<Group>[] = [
  { key: "index", label: "#", left: 24, headLeft: 25, top: TEXT_TOP, cell: (_, i) => i + 1 },
  { key: "name", label: "Guruh nomi", left: 89, headLeft: 87, top: TEXT_TOP, cell: (row) => row.name },
  { key: "lessonDays", label: "Dars kunlari", left: 338, headLeft: 336, top: TEXT_TOP, cell: (row) => row.lessonDays },
  { key: "lessonTime", label: "Dars vaqti", left: 569, headLeft: 570, top: TEXT_TOP, cell: (row) => row.lessonTime },
  { key: "faceIdOperator", label: "FACE ID chi", left: 802, headLeft: 803, top: TEXT_TOP, cell: (row) => row.faceIdOperator },
  { key: "direction", label: "Yo’nalish", left: 1028, headLeft: 1029, top: TEXT_TOP, cell: (row) => row.direction },
];

export function GroupsTable({ rows }: { rows: Group[] }) {
  const pagination = usePagination(rows);

  return (
    <AdminTable
      columns={columns}
      rows={pagination.visibleRows}
      indexOffset={pagination.offset}
      emptyText="Ma’lumot topilmadi"
      getRowKey={(row) => row.id}
      headHeight={50}
      headTop="17px"
      textClassName="text-[16px]"
      className="absolute top-19.5 left-3.75 w-340.5 rounded-card"
      style={{ height: "calc(100% - 86px)" }}
      rowActions={(row) => (
        <Link
          href={`/groups/${row.id}`}
          className="absolute top-3.75 left-308.75 flex h-6 w-20.25 items-center gap-1.5 text-[16px] whitespace-nowrap text-brand"
        >
          <Icon name="eye" size={24} className="text-brand" />
          Ko’rish
        </Link>
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
