// components/job-form.tsx
"use client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { jobFormSchema, JobSchemaType } from '@/lib/schema/jobSchema';
import { Input } from "@/components/ui/input";
import { ButtonLoading } from './custom/button-loading';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { createJob } from '@/actions/job.actions';

export default function JobForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<JobSchemaType>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: '',
      description: '',
      orgName: '',
      orgEmail: '',
      orgBio: '',
      category: '',
      type: "Full_time",
      currency: "INR",
      salary: undefined,
      requiredSkills: [],
      experience: '',
    }
  });

  async function onSubmit(data: JobSchemaType) {
    try {
      const result = await createJob(data);
      if (!result.status) {
        toast({
          variant: 'destructive',
          title: "Something went wrong! Please try again.",
        });
      } else {
        toast({
          variant: 'default',
          title: "Job created successfully!",
        });
        router.push('/jobs'); // Redirect to the jobs page or any other page
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: "Something went wrong! Please try again.",
      });
      console.log(error);
    }
  }

  return (
    <div className='max-w-7xl w-[55%] pb-12'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter job title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Description</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter job description" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="orgName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter organization name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="orgEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter organization email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="orgBio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Bio</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter organization bio" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter job category" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employment Type</FormLabel>
                <FormControl>
                  <select {...field}>
                    <option value="Full_time">Full-time</option>
                    <option value="Part_time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Currency</FormLabel>
                <FormControl>
                  <select {...field}>
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salary</FormLabel>
                <FormControl>
                  <Input type="number" {...field} placeholder="Enter salary" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="requiredSkills"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Required Skills</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter required skills (comma separated)" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter required experience" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <ButtonLoading
            className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white"
            type="submit"
            disabled={form.formState.isSubmitting}
            aria-label="submit"
          >
            {form.formState.isSubmitting ? 'Please wait' : 'Create Job'}
          </ButtonLoading>
        </form>
      </Form>
    </div>
  );
}