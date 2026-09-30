"use client";

import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";

const ROWS_OPTIONS = [10, 20, 50];

interface TableFooterProps {
  page: number;
  totalPages: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}

type PageItem = number | "ellipsis";

/** 5 slots like the Figma pagination: `1 2 3 … 10`. */
function getPageItems(page: number, total: number): PageItem[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  if (page <= 3) return [1, 2, 3, "ellipsis", total];
  if (page >= total - 2) return [1, "ellipsis", total - 2, total - 1, total];
  return [1, "ellipsis", page, "ellipsis", total];
}

const boxClass =
  "flex size-8 shrink-0 items-center justify-center rounded-chip p-2.5";

export function TableFooter({
  page,
  totalPages,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: TableFooterProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4.5">
        <p className="text-[14px] whitespace-nowrap text-ink">
          Har sahifada qatorlar:
        </p>
        <div className="relative rounded-select bg-surface-muted py-1.75 pr-2.5 pl-3.75">
          <div className="flex items-center gap-0.75">
            <span className="font-(family-name:--font-poppins) text-[16px] text-ink">
              {rowsPerPage}
            </span>
            <Icon name="arrow-down" size={16} className="text-ink-arrow" />
          </div>
          <select
            aria-label="Har sahifada qatorlar"
            value={rowsPerPage}
            onChange={(event) => onRowsPerPageChange(Number(event.target.value))}
            className="absolute inset-0 cursor-pointer opacity-0"
          >
            {ROWS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-start gap-1.25 font-(family-name:--font-open-sans) text-[13px] font-semibold">
        <button
          type="button"
          aria-label="Oldingi sahifa"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className={cn(boxClass, "bg-brand-soft disabled:cursor-default")}
        >
          <Icon name="pagination-prev" size={16} className="text-brand" />
        </button>

        {getPageItems(page, totalPages).map((item, index) =>
          item === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className={cn(boxClass, "bg-white text-ink-page")}
            >
              ...
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              className={cn(
                boxClass,
                item === page
                  ? "bg-brand text-white"
                  : "border border-line-page bg-white text-ink-page",
              )}
            >
              {item}
            </button>
          ),
        )}

        <button
          type="button"
          aria-label="Keyingi sahifa"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className={cn(boxClass, "bg-brand-soft disabled:cursor-default")}
        >
          <Icon name="pagination-next" size={16} className="text-brand" />
        </button>
      </div>
    </div>
  );
}
