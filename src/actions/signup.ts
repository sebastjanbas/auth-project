"use server";
import * as z from "zod";

import { SignupSchema } from "../../shemas";

export const signup = async (values: z.infer<typeof SignupSchema>) => {

    console.log(values);
    const validateField = SignupSchema.safeParse(values);

    if (values.password !== values.confirmPassword) {
        return { error: "Passwords do not match" };
    }

    if (!validateField.success) {
        return { error: "Invalid fields" } ;
    }

    return { success: "Email sent" };
}