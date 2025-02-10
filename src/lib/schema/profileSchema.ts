import { z } from 'zod';

export const profileSchema = z.object({
    profileImg: z.string().optional(),
    portfolioUrl: z.string().optional(),
    skills: z.array(z.string()).min(1, "At least one skill is required"),
    experience: z.string().optional(),
    role: z.enum(['USER', 'EMPLOYER', 'APPLICANT', 'ADMIN'])
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;