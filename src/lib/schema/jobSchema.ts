import { z } from 'zod';

export const jobFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  orgName: z.string().min(1, "Organization name is required"),
  orgEmail: z.string().email("Invalid email address"),
  orgBio: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  type: z.enum(["Full_time", "Part_time", "Internship", "Contract"]),
  currency: z.enum(["INR", "USD"]),
  salary: z.number().optional(),
  requiredSkills: z.array(z.string()).min(1, "At least one skill is required"),
  experience: z.string().optional(),
});

export type JobSchemaType = z.infer<typeof jobFormSchema>;