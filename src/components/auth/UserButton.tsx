"use client";

import { FaUser } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { LogoutButton } from "./LogoutButton";
import { cn } from "@/lib/utils";

const dropdownStyles = {
  item: "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
  content: cn(
    "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
    "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
  ),
};

const avatarStyles = {
  avatar: "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
  image: "aspect-square h-full w-full",
  fallback:
    "flex h-full w-full items-center justify-center rounded-full bg-sky-500",
};

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className={avatarStyles.avatar}>
          <AvatarImage
            className={avatarStyles.fallback}
            src={user?.image || ""}
          />
          <AvatarFallback
            className={avatarStyles.fallback}
            // className="bg-sky-500"
          >
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={dropdownStyles.content} align="end">
        <LogoutButton>
          <DropdownMenuItem className={dropdownStyles.item}>
            <IoExitOutline className="h-5 w-5 mr-2 text-sky-600" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
