// actions/job.actions.ts
import { JobSchemaType, jobFormSchema } from '@/lib/schema/jobSchema';
// import prisma from '@/lib/prisma';
import prisma from "@/config/prisma.config";
import { ErrorHandler } from '@/lib/error';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';


export async function createJob(_data: JobSchemaType) {
  try {
    const data = jobFormSchema.parse(_data);

    // Get the session
    const session = await getServerSession(authOptions);
    console.log('job-session', session)
    if (!session || !session.user?.email) {
      throw new ErrorHandler("Unauthorized: No user session found", 'UNAUTHORIZED');
    }

     // Fetch the user from the database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true }, // Only fetch the `id`
    });

    if (!user) {
      throw new ErrorHandler("User not found in the database", 'USER_NOT_FOUND');
    }

    console.log("user", user);

    const job = await prisma.job.create({
      data: {
        title: data.title,
        description: data.description,
        orgName: data.orgName,
        orgEmail: data.orgEmail,
        orgBio: data.orgBio || 'no bio provided',
        category: data.category,
        type: data.type,
        currency: data.currency,
        Salary: data.salary,
        requiredSkills: data.requiredSkills,
        experience: data.experience,
        userId: user.id, 
      },
    });

    return { status: true, job };
  } catch (error) {
    console.error("Error creating job:", error);
    return { status: false, error };
  }
}