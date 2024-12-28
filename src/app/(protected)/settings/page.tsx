"use client";
import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import React from "react";

const SettingsPage = () => {
  const user = useCurrentUser();
  const handleClick = () => {
    logout();
  };

  return (
    <div className="bg-white p-10 rounded-xl shadow-lg">
      <Button onClick={handleClick} type="submit" variant={"outline"}>
        Sign Out
      </Button>
    </div>
  );
};

export default SettingsPage;

// Server component using form for logging out

//     <form action={ async () => {
//         "use server";
//         await singOut();
//       }}>
//       <Button onClick={handleClick} type="submit" variant={"outline"}>
//         Sign Out
//       </Button>
//     </form>
