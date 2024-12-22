"use server";
import * as z from "zod";

import { LoginSchema } from "../../shemas";

export const login = async (values: z.infer<typeof LoginSchema>) => {

    const validateField = LoginSchema.safeParse(values);

    if (!validateField.success) {
        return { error: "Invalid fields" } ;
    }

    return { success: "Email sent" };
}