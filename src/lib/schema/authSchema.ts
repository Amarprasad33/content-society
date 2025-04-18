import { z } from 'zod';


export const signInFormSchema = z.object({
    email: z.string().email('Email is invalid').min(1, 'Email is required'),
    password: z.string().min(1, 'Password is required'),
})

export type SigninSchemaType = z.infer<typeof signInFormSchema>;

export const signupFormSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Email is invalid').min(1, 'Email is required'),
    password: z.string().min(1, 'Password is required'),
});

export type SignupSchemaType = z.infer<typeof signupFormSchema>;
