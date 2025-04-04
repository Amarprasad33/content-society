"use client"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signInFormSchema, SigninSchemaType } from '@/lib/schema/authSchema';
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import GoogleOAuthButton from './social-auth';
import { ButtonLoading } from '../custom/button-loading';
import { signIn } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';

type signInResponseType = {
    error: string | null
    ok: boolean
    status: number
    url: string | null
}

export default function Signin() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { toast } = useToast();
    const [callbackURL, setCallbackUrl] = useState("/");
    useEffect(() => {
        const searchParams = new URLSearchParams(window?.location?.search);
        const cbUrl = searchParams.get('callbackUrl') || '/';
        console.log("searchParams", searchParams);
        console.log("callbackURL-", cbUrl);
        setCallbackUrl(cbUrl);
    }, []);

    const form = useForm<SigninSchemaType>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    async function formHandler(data: SigninSchemaType){
        try {
            const searchParams = new URLSearchParams(window?.location?.search);
            const callbackUrl = searchParams.get('callbackUrl') || '/';
            const result: signInResponseType | undefined = await signIn('signin', {
                ...data, 
                redirect: false, 
                callbackUrl, 
            });
            console.log("result-signin", result);
            console.log("callbackURL-", callbackUrl);
            if(!result?.ok){
                const errorMessage = result?.error?.includes('User') && result?.error?.includes('does not exist') 
                    ? 'User does not exist' : result?.error || 'Internal server error';

                toast({
                    title: errorMessage,
                    variant: 'destructive'
                })
            }else{
                toast({
                    title: 'Login successful!',
                    variant: 'default'
                })
                window.location.href = result.url || callbackUrl;
            }
        } catch (_error) {
            console.log("error while signin - ", _error)
            return toast({
                title: 'Internal server error',
                variant: 'destructive',
            });
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
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-gray-400'>Email address</FormLabel>
                                    <FormControl>
                                        <Input className='text-white bg-gray-900 border-gray-800' {...field} placeholder='name@example.com' />
                                    </FormControl>
                                    <FormDescription className="text-gray-500">
                                        Enter the email address you used during registration
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
                                        Your password must be at least 8 characters long
                                    </FormDescription>
                                    <button type='button' className='absolute right-2 top-8' onClick={(e) => {
                                            e.preventDefault();
                                            togglePassword();
                                        }}
                                    >
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
                        {form.formState.isSubmitting? 'Please wait' : 'Sign In'}
                    </ButtonLoading>
                    <div className="text-center text-sm mt-4">
                        <div className="space-x-1">
                            <span className="text-gray-400">Don&apos;t have an account?</span>
                            <Link className="text-indigo-600 hover:text-indigo-500" href="/signup">
                                Sign Up
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
                    <GoogleOAuthButton label='Sign in with Google' callbackUrl={callbackURL} />
                </form>
            </Form>
        </div>
    )
}