import { z } from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .min(3, 'Username must be at least 3 characters')
  ,
  password: z
    .string()
    .min(4, 'Password must be at least 4 characters')
  // .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  // .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  // .regex(/[0-9]/, 'Password must contain at least one number'),
});

export type LoginCredentials = z.infer<typeof LoginSchema>;

export interface AuthUser {
  email: string;
  token: string;
}

export class AuthError extends Error {
  constructor(
    message: string,
    public code:
      | 'INVALID_CREDENTIALS'
      | 'NETWORK_ERROR'
      | 'VALIDATION_ERROR'
      | 'SERVER_ERROR'
      | 'STORAGE_ERROR',
    public details?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'AuthError';
  }
}
