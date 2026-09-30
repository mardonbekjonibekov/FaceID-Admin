import type { IconName } from "@/components/icon";

export interface NavLink {
  href: string;
  label: string;
  icon: IconName;
}

export const navLinks: NavLink[] = [
  {
    href: "/students",
    label: "O’quvchi qo’shish",
    icon: "profile-circle",
  },
  {
    href: "/groups",
    label: "Guruhlar",
    icon: "people",
  },
  {
    href: "/teachers",
    label: "O’qituvchi qo’shish",
    icon: "user",
  },
];
