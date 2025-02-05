"use client";
import React, { useState } from "react";
import LoginButton from "./auth/LoginButton";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";

const ModalToggle = () => {
  const [isModal, setIsModal] = useState(false);

  return (
    <div className="flex flex-row gap-7 justify-center items-center">
      <LoginButton mode={isModal ? "modal" : "redirect"} asChild>
        <Button variant={"secondary"} size={"lg"}>
          Sign in
        </Button>
      </LoginButton>
      <Switch checked={isModal} onClick={() => setIsModal(!isModal)} />
    </div>
  );
};

export default ModalToggle;
