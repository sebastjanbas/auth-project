"use server";

import { getUserByEmail } from "@/data/user";
import * as z from "zod";

import { ResetPassSchema } from "../../shemas";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswodResetToken } from "@/lib/tokens";

export const reset = async (values: z.infer<typeof ResetPassSchema>) => {
    const validateField = ResetPassSchema.safeParse(values);

    if (!validateField.success) {
        return { error: "Invalid email!" };
    }

    const { email } = validateField.data;
    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email) {
        return { error: "Email does not exist!" };
    }

    // TODO: Generate token and send email 
    const passwordResetToken = await generatePasswodResetToken(email);
    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

    return { success: "Email sent!" };
}