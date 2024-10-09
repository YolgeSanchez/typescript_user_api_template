import z from 'zod'

export const authSchema = z.object({
  email: z.string().email({ message: 'email should be a valid email' }),
  password: z.string().min(6, 'password should be at least 6 characters long'),
})
