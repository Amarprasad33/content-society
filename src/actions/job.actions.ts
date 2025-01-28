// actions/job.actions.ts
import { JobSchemaType } from '@/lib/schema/jobSchema';
// import prisma from '@/lib/prisma';
import prisma from "@/config/prisma.config";


export async function createJob(data: JobSchemaType) {
  try {
    // const job = await prisma.job.create({
    //   data: {
    //     title: data.title,
    //     description: data.description,
    //     orgName: data.orgName,
    //     orgEmail: data.orgEmail,
    //     category: data.category,
    //     type: data.type,
    //     currency: data.currency,
    //     Salary: data.salary,
    //     requiredSkills: data.requiredSkills,
    //     experience: data.experience,
    //     userId: "user-id-here", // Replace with the actual user ID from the session or context
    //   },
    // });

    return { status: true, job };
  } catch (error) {
    console.error("Error creating job:", error);
    return { status: false, error };
  }
}