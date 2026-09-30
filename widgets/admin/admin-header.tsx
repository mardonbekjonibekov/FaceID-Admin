"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";
import { navLinks } from "@/widgets/model/nav-link";

export function AdminHeader() {
  const pathname = usePathname();

  return (
    <header className="mx-auto w-full max-w-350.25 rounded-shell bg-white px-34.25 py-5">
      <nav className="flex items-center justify-center gap-2.5">
        {navLinks.map((link, index) => {
          const active = (pathname ?? "").startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex h-11.25 w-57.5 shrink-0 items-center justify-center gap-2.75 rounded-field px-3.75 py-2.5 text-[16px] whitespace-nowrap",
                active
                  ? "bg-brand-tab text-brand"
                  : "bg-surface-muted text-ink-secondary",
                // Figma: only the first tab label is Medium, the rest are Regular.
                index === 0 ? "font-medium" : "font-normal",
              )}
            >
              <Icon name={link.icon} size={24} />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
