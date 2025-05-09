// components/job-form.tsx
"use client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { MultiSelect } from './multi-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { uploadToClouodinary } from '@/actions/upload-to-cdn';
import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

type JobAPIErrorResponse = {
  status: boolean;
  error: {
    code: string | number;
    message: string;
    statusCode: boolean | false | number;
  };
  requiresSessionUpdate?: boolean
};

type JobAPISuccessResponse = {
  status: boolean
  job?: JobSchemaType
  error?: {
    code: string | number;
    message: string;
    statusCode: boolean | false | number;
  };
  requiresSessionUpdate?: boolean
}

export default function JobForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const { data: session, update } = useSession();

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
      logoUrl: ''
    }
  });

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>){
    console.log("fileEvent", e);
    const file = e.target.files?.[0];
    if(!file) return;
    
    console.log('file', file);
    const sizeinKb = Math.ceil(file.size / 1024);
    console.log("size-Kb", sizeinKb);
    if(sizeinKb > 1024){
      toast({
        variant: 'destructive',
        title: "Please upload a smaller image (less than 1MB)",
      });
      e.target.value = '';
      return;
    }
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const uploadRes = await uploadToClouodinary(formData, 'job');
    console.log("img-uploadd--", uploadRes);
    if(uploadRes.success){
      setImageUrl(uploadRes.url);
      setUploading(false);
    }else{
      toast({
        variant: 'destructive',
        title: uploadRes?.message || "Image upload failed, Please try again",
      });
      console.error(uploadRes.message);
    }
  }

  if(session?.user?.role !== 'USER'){
    console.log("Not a user, you shouldn't have access to this page.")
  }

  async function onSubmit(data: JobSchemaType) {
    try {
      console.log("data", data);
      const result: JobAPISuccessResponse | JobAPIErrorResponse = await createJob(data, imageUrl);
      console.log("Ress--", result);
      if (!result.status) {
        toast({
          variant: 'destructive',
          title: result?.error?.message || "Error while creating a job! Please try again.",
        });
      } else {
        if(result.status && result?.requiresSessionUpdate){
          console.log("Triggering SESSION Update");
          await update({ updateRole: true });
        }
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
    <div className='max-w-2xl w-[60%] mb-8 py-6 px-7 bg-[#060606] border border-[#2a2a2b] rounded-2xl relative shadow-[0px_-3px_12px_2px_rgba(141,_63,_217,_0.32)]'>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="logoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Org. logo</FormLabel>
                <FormControl>
                  <Input 
                    {...field}
                    type='file' 
                    placeholder="Upload Org. logo" 
                    className='file:text-white file:bg-zinc-700/80 file:rounded-md placeholder:text-slate-600 border-[#312F37]'
                    onChange={(e) => {
                      handleFileChange(e);
                      field.onChange(e);
                    }}
                  />         
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {
            uploading && <div>Uploading...</div>
          }
          {imageUrl && 
            <div className='my-1.5! w-fit p-2 rounded-lg border border-slate-700'> 
              <Image src={imageUrl} width={36} height={36} alt='org-logo' />
            </div>
          }

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex font-semibold'>
                  Job Title
                  <Image 
                    src="/images/create/asterisk.svg"
                    alt='asterisk'
                    width={20}
                    height={20}
                  />
                </FormLabel>
                <FormControl>
                  <Input {...field} className='bg-[#121115] border border-[#312F37]' placeholder="Enter job title" />
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
                <FormLabel className='flex font-semibold'>
                  Job Description
                  <Image 
                    src="/images/create/asterisk.svg"
                    alt='asterisk'
                    width={20}
                    height={20}
                  />
                </FormLabel>
                <FormControl>
                  <Input {...field} className='bg-[#121115] border border-[#312F37]' placeholder="Enter job description" />
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
                  <Input {...field} placeholder="Enter organization name" className='bg-[#121115] border border-[#312F37]'/>
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
                  <Input {...field} placeholder="Enter organization email" className='bg-[#121115] border border-[#312F37]'/>
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
                  <Input {...field} placeholder="Enter organization bio" className='bg-[#121115] border border-[#312F37]'/>
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
                  <Input {...field} placeholder="Enter job category" className='bg-[#121115] border border-[#312F37]'/>
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
                  <Select {...field} onValueChange={(e) => field.onChange(e)}>
                    <SelectTrigger className="w-full bg-[#121115] border border-[#312F37]">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full_time">Full-time</SelectItem>
                      <SelectItem value="Part_time">Part-time</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
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
                  {/* <CustomSelect {...field} className='bg-black border border-slate-700'>
                    
                  </CustomSelect> */}
                  <Select {...field} onValueChange={(e) => field.onChange(e)}>
                    <SelectTrigger className="w-full bg-[#121115] border border-[#312F37]">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">INR</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} placeholder="Enter salary" className='bg-[#121115] border border-[#312F37]'/>
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
                  {/* <Input {...field} placeholder="Enter required skills (comma separated)" /> */}
                  <MultiSelect 
                    selected={field.value}
                    options={[
                      { value: "Video", label: "Video" },
                      { value: "Audio", label: "Audio" },
                      { value: "Editing", label: "Editing" },
                      { value: "Photography", label: "Photography" },
                    ]}
                    onChange={(selectedValues) => { field.onChange(selectedValues)}}
                  />
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
                  <Input {...field} placeholder="Enter required experience"  className='bg-[#121115] border border-[#312F37]'/>
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


/*
  --- Custom file upload

  <FormField
  control={form.control}
  name="logoUrl"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Org. logo</FormLabel>
      <FormControl>
        <div>
           Hide the default file input 
          <input
            id="file-upload"
            type="file"
            style={{ display: 'none' }}
            onChange={(e) => {
              handleFileChange(e);
              field.onChange(e);
            }}
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Choose File
          </label>
           
          {field.value && typeof field.value === "string" && (
            <span className="ml-2 text-slate-300">{field.value.split('\\').pop()}</span>
          )}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

*/