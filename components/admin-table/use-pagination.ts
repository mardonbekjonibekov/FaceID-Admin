import { useState } from "react";

/** Client-side paging for the admin tables: slices `rows` by page and page size. */
export function usePagination<T>(rows: T[]) {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPageState] = useState(10);

  const totalPages = Math.max(1, Math.ceil(rows.length / rowsPerPage));
  const currentPage = Math.min(page, totalPages);
  const offset = (currentPage - 1) * rowsPerPage;

  return {
    page: currentPage,
    setPage,
    rowsPerPage,
    setRowsPerPage: (next: number) => {
      setRowsPerPageState(next);
      setPage(1);
    },
    totalPages,
    offset,
    visibleRows: rows.slice(offset, offset + rowsPerPage),
  };
}
