import { UserRole } from '@prisma/client';
import * as z from 'zod';


export const SettingsSchema = z.object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.USER, UserRole.ADMIN]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
})
.refine((data) => {
    if (data.password && !data.newPassword) {
        return false;
    }
    return true;
}, {
    message: "New Password is required!",
    path: ["newPassword"],
})
.refine((data) => {
    if (data.newPassword && !data.password) {
        return false;
    }
    return true;
}, {
    message: "Password is required!",
    path: ["password"],
})

export const ResetPassSchema = z.object({
    email: z.string().email({
        message: 'Please enter a valid email address',
    }),
});

export const NewPassSchema = z.object({
    password: z.string().min(6,{
        message: 'Please enter your password',
    }),
    confirmPassword: z.string().min(6,{
        message: 'Please enter your password',
    }),
});

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Please enter a valid email address',
    }),
    password: z.string().min(1, {
        message: "Please enter your password",
    }),

    code: z.optional(z.string()),

    // code: z.optional(z.string().min(6, {
    //     message: "Please enter your code",
    // })),
    });

export const SignupSchema = z.object({
    firstName: z.string().min(1, {
        message: "Enter your first name",
    }),
    lastName: z.string().min(1, {
        message: "Enter your last name",
    }),
    email: z.string().email({
        message: 'Please enter a valid email address',
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters",
    }),
    confirmPassword: z.string().min(6, {
        message: "Please confirm your password",
    }),
});
