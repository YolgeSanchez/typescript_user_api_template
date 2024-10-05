import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(2, 'name should be longer than or equal to 2 characters').max(50),
  email: z.string().email({ message: 'email should be a valid email' }),
  password: z.string().min(6, 'password should be at least 6 characters long'),
})

export const authSchema = z.object({
  email: z.string().email({ message: 'email should be a valid email' }),
  password: z.string().min(6, 'password should be at least 6 characters long'),
})

// don't forget to modify here each thing you change in the auth.interfaces file
