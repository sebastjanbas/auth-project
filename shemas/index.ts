import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Please enter a valid email address',
    }),
    password: z.string().min(1, {
        message: "Please enter your password",
    }),
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