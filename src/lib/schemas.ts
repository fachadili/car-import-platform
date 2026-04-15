import { Role } from "@prisma/client";
import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.nativeEnum(Role),
  phone: z.string().optional(),
  whatsapp: z.string().optional()
});

export const signInSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters")
});

export const importerProfileSchema = z.object({
  companyName: z.string().min(2),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and hyphens"),
  bio: z.string().min(20),
  coveredCountries: z.string().min(2),
  servicesOffered: z.string().min(2),
  languagesSpoken: z.string().min(2),
  publicContactEmail: z.string().email().optional().or(z.literal("")),
  publicWhatsapp: z.string().optional()
});

export const clientProfileSchema = z.object({
  preferredLanguage: z.string().min(2, "Preferred language is required")
});
