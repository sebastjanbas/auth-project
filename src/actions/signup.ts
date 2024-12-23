"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

import { SignupSchema } from "../../shemas";
import { getUserByEmail } from "@/data/user";

export const signup = async (values: z.infer<typeof SignupSchema>) => {

    console.log(values);
    const validateField = SignupSchema.safeParse(values);

    
    if (!validateField.success) {
        return { error: "Invalid fields" } ;
    }
    
    const {email, password, confirmPassword, firstName, lastName} = validateField.data; // Destructure the values
    
    if (password !== confirmPassword) {
        return { error: "Passwords do not match" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: "User already exists" };
    }

    await db.user.create({
        data: {
            name: firstName + " " + lastName,
            email,
            password: hashedPassword,
        }
    });

    // TODO: Send verification email

    return { success: "User Created" };
}