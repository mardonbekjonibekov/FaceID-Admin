import type { IconProps } from "./types";

export function PaginationNextIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <g>
      <path d="M6.94001 4L6.00001 4.94L9.05335 8L6.00001 11.06L6.94001 12L10.94 8L6.94001 4Z" fill="currentColor"/>
      </g>
    </svg>
  );
}
