"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { Button } from "../ui/button";
import { DEFAULT_REDIRECT } from "@/routes";

export const Social = () => {
  const handleOAuth = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_REDIRECT,
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size={"lg"}
        variant={"outline"}
        className="w-full"
        onClick={() => handleOAuth("google")}
      >
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button
        size={"lg"}
        variant={"outline"}
        className="w-full"
        onClick={() => handleOAuth("github")}
      >
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
};
