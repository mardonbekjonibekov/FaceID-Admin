import { AddIcon } from "@/assets/icons/add";
import { ArrowDownIcon } from "@/assets/icons/arrow-down";
import { ArrowLeftIcon } from "@/assets/icons/arrow-left";
import { ChevronDownIcon } from "@/assets/icons/chevron-down";
import { CloseIcon } from "@/assets/icons/close";
import { EyeIcon } from "@/assets/icons/eye";
import { PaginationNextIcon } from "@/assets/icons/pagination-next";
import { PaginationPrevIcon } from "@/assets/icons/pagination-prev";
import { PeopleIcon } from "@/assets/icons/people";
import { ProfileCircleIcon } from "@/assets/icons/profile-circle";
import { SearchNormalIcon } from "@/assets/icons/search-normal";
import { TrashIcon } from "@/assets/icons/trash";
import { UserIcon } from "@/assets/icons/user";

import { cn } from "@/lib/utils";

const icons = {
  "add": AddIcon,
  "arrow-down": ArrowDownIcon,
  "arrow-left": ArrowLeftIcon,
  "chevron-down": ChevronDownIcon,
  "close": CloseIcon,
  "eye": EyeIcon,
  "pagination-next": PaginationNextIcon,
  "pagination-prev": PaginationPrevIcon,
  "people": PeopleIcon,
  "profile-circle": ProfileCircleIcon,
  "search-normal": SearchNormalIcon,
  "trash": TrashIcon,
  "user": UserIcon,
};

export type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  size: number;
  /** color comes from `currentColor`, e.g. `text-brand` */
  className?: string;
}

/** Renders a design icon as inline SVG so its color follows the text color tokens. */
export function Icon({ name, size, className }: IconProps) {
  const Component = icons[name];
  return <Component size={size} className={cn("block shrink-0", className)} />;
}
