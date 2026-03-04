import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters.')
    .max(100, 'Name must be under 100 characters.'),
  company: z
    .string()
    .min(1, 'Company is required.')
    .max(200, 'Company must be under 200 characters.'),
  role: z
    .string()
    .min(1, 'Role is required.')
    .max(100, 'Role must be under 100 characters.'),
  email: z.string().email('Please enter a valid work email address.'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters.')
    .max(1000, 'Message must be under 1000 characters.'),
  honeypot: z.string().max(0, 'Bot detected.').optional(),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>
