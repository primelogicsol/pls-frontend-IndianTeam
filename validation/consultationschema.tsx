import { z } from "zod"

export const consultationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(5, "Phone number is required"),
  address: z.string().optional(),
  date: z.string().min(1, "Please select a date and time"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Please provide a detailed message (minimum 10 characters)"),
})

export type ConsultationFormData = z.infer<typeof consultationSchema>
