"use client"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PATHS } from '@/config/path.config';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signupFormSchema, SignupSchemaType } from '@/lib/schema/authSchema';
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import GoogleOAuthButton from './social-auth';
import { ButtonLoading } from '../custom/button-loading';
import signUp  from '@/actions/auth.actions';

import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';


export default function Signup() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<SignupSchemaType>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    })

    async function formHandler(data: SignupSchemaType){
        try {
            console.log("data", data);
            const result = await signUp(data);
            console.log("result-signup", result);

            if(!result.status){
                toast({
                    variant: 'destructive',
                    title: "Something went wrong!! try again after sometime."
                })
            }else{
                toast({
                    variant: 'default',
                    title: "Signup successful, Welcome!"
                })
                router.push(PATHS.HOME);
            }
        } catch {
            toast({
                variant: 'destructive',
                title: "Something went wrong!! try again after sometime."
            })
        }
    }
    const togglePassword = () => {
        setPasswordVisible(!passwordVisible);
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(formHandler)}>
                    <div>
                        <FormField 
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem className='relative'>
                                    <FormLabel className='text-gray-400'>Name</FormLabel>
                                    <FormControl>
                                        <Input className='text-white bg-gray-900 border-gray-800' type='text' {...field} placeholder='Your name...' />
                                    </FormControl>
                                    <FormDescription className="text-gray-500">
                                        Enter your full name as you&apos;d like it to appear
                                    </FormDescription>
                                    <FormMessage className='text-rose-700' />
                                </FormItem>
                            )}
                        />
                    </div>
                    
                    <div className='mt-4'>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-gray-400'>Email address</FormLabel>
                                    <FormControl>
                                        <Input className='text-white bg-gray-900 border-gray-800' type='email' {...field} placeholder='name@example.com' />
                                    </FormControl>
                                    <FormDescription className="text-gray-500">
                                        We&apos;ll never share your email with anyone else
                                    </FormDescription>
                                    <FormMessage className='text-rose-700' />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className='mt-4'>
                        <FormField 
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem className='relative'>
                                    <FormLabel className='text-gray-400'>Password</FormLabel>
                                    <FormControl>
                                        <Input className='text-white bg-gray-900 border-gray-800' type={passwordVisible? 'text' : 'password'} {...field} placeholder='Password' />
                                    </FormControl>
                                    <FormDescription className="text-gray-500">
                                        Use 8+ characters with a mix of letters, numbers & symbols
                                    </FormDescription>
                                    <button className='absolute right-2 top-8' onClick={togglePassword}>
                                        {passwordVisible? <EyeOffIcon /> : <EyeIcon />}
                                    </button>
                                    <FormMessage className='text-rose-700' />
                                </FormItem>
                            )}
                        />
                    </div>

                    <ButtonLoading 
                        className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white"
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        aria-label="submit"
                    >
                        {form.formState.isSubmitting? 'Please wait' : 'Sign Up'}
                    </ButtonLoading>
                    <div className="text-center text-sm mt-4">
                        <div className="space-x-1">
                            <span className="text-gray-400">Already have an account?</span>
                            <Link className="text-indigo-600 hover:text-indigo-500" href="/signin">
                                Sign In
                            </Link>
                        </div>
                        <Link className="text-indigo-600 hover:text-indigo-500 block mt-2" href="#">
                            Forgot Password
                        </Link>
                    </div>
                    <div className="relative mt-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-800"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-black px-2 text-gray-400">or</span>
                        </div>
                    </div>
                    <GoogleOAuthButton callbackUrl='/' label='Sign in with Google'/>
                </form>
            </Form>
        </div>
    )
}