import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .refine(
    (val) => /[a-z]/.test(val),
    'Password must include at least one lowercase letter'
  )
  .refine(
    (val) => /[A-Z]/.test(val),
    'Password must include at least one uppercase letter'
  )
  .refine(
    (val) => /[0-9]/.test(val),
    'Password must include at least one number'
  )
  .refine(
    (val) => /[!@#$%^&*(),.?":{}|<>]/.test(val),
    'Password must include at least one special character'
  );

export const SignInSchema = z.object({
  userName: z
    .string()
    .min(2, 'Username must be at least 2 characters long')
    .max(20, 'Username must be at most 20 characters long'),
  password: passwordSchema,
});

export const CreateUserSchema = z.object({
  userName: z
    .string()
    .min(2, 'Username must be at least 2 characters long')
    .max(20, 'Username must be at most 20 characters long'),
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters long')
    .max(20, 'First name must be at most 20 characters long'),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters long')
    .max(20, 'Last name must be at most 20 characters long'),
  email: z.string().email('Invalid email address. Enter correct email'),
  phone: z
    .string()
    .length(
      12,
      'Phone number must be 12 characters long. Enter correct phone number'
    ),
  password: passwordSchema,
});

export const SignUpSchema = CreateUserSchema.extend({
  repeatPassword: passwordSchema,
}).refine((data) => data.password === data.repeatPassword, {
  message: 'Passwords do not match',
  path: ['repeatPassword'],
});

export type ISignInData = z.infer<typeof SignInSchema>;
export type ISignUpData = z.infer<typeof SignUpSchema>;
export type ICreateUserData = z.infer<typeof CreateUserSchema>;
