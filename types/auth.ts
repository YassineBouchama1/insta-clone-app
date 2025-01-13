import { z } from 'zod';

export const LoginSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be less than 50 characters'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    // .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    // .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    // .regex(/[0-9]/, 'Password must contain at least one number'),
});

export type LoginCredentials = z.infer<typeof LoginSchema>;

export interface AuthUser {
  username: string;
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
