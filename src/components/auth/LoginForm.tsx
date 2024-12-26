"use client";
import React, { startTransition, useState, useTransition } from "react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import * as z from "zod";
import { CardWrapper } from "./CardWrapper";
import { useForm } from "react-hook-form";
import { LoginSchema } from "../../../shemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../FormError";
import { FormSuccess } from "../FormSuccess";
import { login } from "@/actions/login";
import Link from "next/link";
import { link } from "fs";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email is already registered with a different provider."
      : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, setTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values).then((data) => {
        if (data?.error) {
          setError(data.error);
        }

        if (data?.success) {
          setSuccess(data.success);
        }

        if (data?.twoFactor) {
          setShowTwoFactor(true);
        }
      });
      // .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial={!showTwoFactor}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-start gap-y-4">
                      <FormLabel>Two Factor code</FormLabel>
                      <FormControl>
                        <InputOTP
                          {...field}
                          maxLength={6}
                          disabled={isPending}
                          pattern="^[0-9]*$"
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} inputMode="numeric" />
                            <InputOTPSlot index={1} inputMode="numeric" />
                            <InputOTPSlot index={2} inputMode="numeric" />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} inputMode="numeric" />
                            <InputOTPSlot index={4} inputMode="numeric" />
                            <InputOTPSlot index={5} inputMode="numeric" />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                    </div>
                    <FormMessage>
                      {form.formState.errors.code?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="john.doe@example.com"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.email?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <Button
                        size={"sm"}
                        variant={"link"}
                        className="float-right p-0"
                        asChild
                      >
                        <Link href="/auth/reset-password">
                          Forgot password?
                        </Link>
                      </Button>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="*****"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.password?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            {showTwoFactor ? "Confirm" : "Log in"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
