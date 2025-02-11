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
import { Input } from "@/components/ui/input";
import { ButtonLoading } from './custom/button-loading';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
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
import { profileSchema } from '@/lib/schema/profileSchema';
import type { ProfileSchemaType } from '@/lib/schema/profileSchema';
import { updateProfile } from '@/actions/profile.action';

export default function ProfileForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      profileImg: '',
      portfolioUrl: '',
      skills: [],
      experience: '',
      role: 'USER'
    }
  });

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if(!file) return;
    
    const sizeinKb = Math.ceil(file.size / 1024);
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

    const uploadRes = await uploadToClouodinary(formData, 'profile');
    console.log("img-upload-profile", uploadRes);
    if(uploadRes.success){
      setImageUrl(uploadRes.url);
    }else{
      toast({
        variant: 'destructive',
        title: uploadRes?.message || "Image upload failed, Please try again",
      });
      console.error(uploadRes.message);
    }
    setUploading(false);
  }

  async function onSubmit(data: ProfileSchemaType) {
    try {
      // TODO: Add your update profile action here
      console.log("Profile data", data);
      const res = await updateProfile(data, imageUrl);
      console.log("updateRes", res);
      toast({
        variant: 'default',
        title: "Profile updated successfully!",
      });
      // router.push('/profile'); // Redirect to the profile page
    } catch (error) {
      toast({
        variant: 'destructive',
        title: "Something went wrong! Please try again.",
      });
      console.error(error);
    }
  }

  return (
    <div className='max-w-2xl w-[55%] pb-12'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
                control={form.control}
                name="profileImg"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Profile Image</FormLabel>
                    <FormControl>
                        <Input 
                          type='file' 
                          placeholder="Upload profile image" 
                          className='file:text-white file:bg-zinc-700/80 file:rounded-md placeholder:text-slate-600' 
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
            {imageUrl && 
                <div className='!my-1.5 w-fit p-2 rounded-lg border border-slate-700'> 
                    <Image src={imageUrl} width={36} height={36} alt='profile-image' />
                </div>
            }

            <FormField
                control={form.control}
                name="portfolioUrl"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Portfolio URL</FormLabel>
                    <FormControl>
                        <Input {...field} placeholder="Enter your portfolio URL" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Skills</FormLabel>
                    <FormControl>
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
                        <Input {...field} placeholder="Enter your experience" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

            {/* <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                        <Select {...field} onValueChange={(e) => field.onChange(e)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="USER">User</SelectItem>
                            <SelectItem value="EMPLOYER">Employer</SelectItem>
                            <SelectItem value="APPLICANT">Applicant</SelectItem>
                            <SelectItem value="ADMIN">Admin</SelectItem>
                        </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            /> */}

            <ButtonLoading
                className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white"
                type="submit"
                disabled={form.formState.isSubmitting}
                aria-label="submit"
            >
                {form.formState.isSubmitting ? 'Please wait' : 'Update Profile'}
            </ButtonLoading>
        </form>
      </Form>
    </div>
  );
}