import { Icon } from "@/components/icon";
import { TableFooter } from "@/components/admin-table/table-footer";
import { usePagination } from "@/components/admin-table/use-pagination";
import {
  AdminTable,
  type AdminColumn,
} from "@/components/admin-table/admin-table";

import type { StudentSearchResult } from "../types/student";

const columns: AdminColumn<StudentSearchResult>[] = [
  { key: "index", label: "#", left: 21, headLeft: 22, cell: (_, i) => i + 1 },
  {
    key: "fullName",
    label: "F.I.SH",
    left: 59,
    headLeft: 60,
    top: "calc(50% - 9.5px)",
    cell: (row) => row.fullName,
  },
  {
    key: "jshshir",
    label: "JSHSHIR",
    left: 248,
    headLeft: 253,
    cell: (row) => row.jshshir,
  },
  {
    key: "direction",
    label: "Yo’nalish",
    left: 401,
    headLeft: 400,
    cell: (row) => row.direction,
  },
  {
    key: "company",
    label: "Firma",
    left: 534,
    headLeft: 535,
    cell: (row) => row.company,
  },
];

interface StudentResultsTableProps {
  rows: StudentSearchResult[];
  onAdd: (student: StudentSearchResult) => void;
  /** more than one page of results: fill the card like the Guruhlar page and show the footer */
  paged: boolean;
}

export function StudentResultsTable({
  rows,
  onAdd,
  paged,
}: StudentResultsTableProps) {
  const pagination = usePagination(rows);

  return (
    <AdminTable
      columns={[
        ...columns,
        // header-only column for the action button
        {
          key: "action",
          label: "Qo’shish",
          left: 0,
          headLeft: 658,
          cell: () => null,
        },
      ]}
      rows={paged ? pagination.visibleRows : rows}
      indexOffset={paged ? pagination.offset : 0}
      getRowKey={(row) => row.id}
      headHeight={40}
      headTop="calc(50% - 8px)"
      textClassName="text-[14px]"
      className="mx-auto w-181.5 rounded-field"
      style={paged ? { height: "100%" } : undefined}
      footerStyle={{ left: 14, bottom: 14, width: 696 }}
      footer={
        paged ? (
          <TableFooter
            page={pagination.page}
            totalPages={pagination.totalPages}
            rowsPerPage={pagination.rowsPerPage}
            onPageChange={pagination.setPage}
            onRowsPerPageChange={pagination.setRowsPerPage}
          />
        ) : undefined
      }
      rowActions={(row) => (
        <button
          type="button"
          aria-label="Guruhga qo’shish"
          onClick={() => onAdd(row)}
          className="absolute top-1.5 left-167.25 flex h-10.5 w-11 items-center justify-center overflow-clip rounded-chip bg-brand"
        >
          <Icon name="add" size={28} className="text-white" />
        </button>
      )}
    />
  );
}
