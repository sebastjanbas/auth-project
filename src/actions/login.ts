"use server";
import * as z from "zod";
import { signIn } from "@/auth";
import { LoginSchema } from "../../shemas";
import { DEFAULT_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

type LoginResponse = {
  error: string;
  success: string;
};

export const login = async (values: z.infer<typeof LoginSchema>): Promise<LoginResponse> => {

    const validateField = LoginSchema.safeParse(values);

    if (!validateField.success) {
        return { error: "Invalid fields", success: "" };
    }

    const { email, password } = validateField.data;

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_REDIRECT,
        });
        return { error: "", success: "Login successful" };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {error: "Invalid credentials", success: ""};
                default:
                    return {error: "Something went wrong", success: ""};
            };
        }
        throw error;
    }
}
