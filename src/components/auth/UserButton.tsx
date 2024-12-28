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

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-40 mt-5 shadow-lg p-4 bg-white border-sky-700 border-[1px] rounded-sm"
        align="end"
      >
        <LogoutButton>
          <DropdownMenuItem className="flex items-center text-sky-600">
            <IoExitOutline className="h-5 w-5 mr-2 text-sky-600" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
