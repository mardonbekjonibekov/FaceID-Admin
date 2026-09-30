import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface AdminColumn<T> {
  key: string;
  label: string;
  /** x offset of the cell inside the row (px, from the Figma layout) */
  left: number;
  /** x offset of the header label (px); differs from `left` in some Figma frames */
  headLeft: number;
  /** css `top` of the cell text, defaults to vertically centered */
  top?: string;
  cell: (row: T, index: number) => ReactNode;
}

interface AdminTableProps<T> {
  columns: AdminColumn<T>[];
  rows: T[];
  getRowKey: (row: T, index: number) => string | number;
  /** absolutely positioned per-row content (icons / buttons) */
  rowActions?: (row: T, index: number) => ReactNode;
  headHeight: number;
  /** css top of the header labels */
  headTop: string;
  textClassName: string;
  className?: string;
  style?: CSSProperties;
  footer?: ReactNode;
  footerStyle?: CSSProperties;
  /** number of rows on previous pages, so `#` keeps counting across pages */
  indexOffset?: number;
}

/**
 * Figma table: 1px outer border, header row, 55px rows overlapping by 1px.
 * Row `n` starts at `headHeight - 1 + 54 * n`, so the natural height is
 * `headHeight + 1 + 54 * rows` (203px for 3 rows + 40px header).
 */
export function AdminTable<T>({
  columns,
  rows,
  getRowKey,
  rowActions,
  headHeight,
  headTop,
  textClassName,
  className,
  style,
  footer,
  footerStyle,
  indexOffset = 0,
}: AdminTableProps<T>) {
  return (
    <div
      className={cn(
        "relative overflow-clip border border-line-table bg-white",
        className,
      )}
      style={{
        height: style?.height ?? headHeight + 1 + 54 * rows.length,
        ...style,
      }}
    >
      <div
        className={cn(
          "absolute -top-px -left-px w-[calc(100%+2px)] bg-surface font-medium whitespace-nowrap text-ink",
          textClassName,
        )}
        style={{ height: headHeight }}
      >
        {columns.map((column) => (
          <p
            key={column.key}
            className="absolute"
            style={{ left: column.headLeft, top: headTop }}
          >
            {column.label}
          </p>
        ))}
      </div>

      {/* Rows scroll inside the table when they do not fit (e.g. 50 rows per page). */}
      <div
        className="absolute inset-x-0 overflow-x-hidden overflow-y-auto"
        style={{ top: headHeight - 1, bottom: footer ? 66 : 0 }}
      >
        <div className="-ml-px flex w-[calc(100%+2px)] flex-col">
        {rows.map((row, index) => (
          <div
            key={getRowKey(row, index)}
            className={cn(
              "relative h-13.75 shrink-0 border border-line-row bg-white",
              index > 0 && "-mt-px",
            )}
          >
            {columns.map((column) => (
              <p
                key={column.key}
                className={cn(
                  "absolute whitespace-nowrap text-ink",
                  textClassName,
                )}
                style={{
                  left: column.left,
                  top: column.top ?? "calc(50% - 8.5px)",
                }}
              >
                {column.cell(row, index + indexOffset)}
              </p>
            ))}
            {rowActions?.(row, index)}
          </div>
        ))}
        </div>
      </div>

      {footer ? (
        <div className="absolute" style={footerStyle}>
          {footer}
        </div>
      ) : null}
    </div>
  );
}
