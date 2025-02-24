"use client"
import Signin from "@/components/auth/signin";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { redirect } from "next/navigation";


export default function SigninPage() {
  const { toast } = useToast();
  const {data: session, status} = useSession();
  useEffect(() => {
    if(session?.user){
      console.log("user logged in")
      toast(({
        variant: "default",
        title: "You are already logged in!!"
      }))
      return redirect("/");
    }
  }, [session])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-black inset-0 flex justify-center items-center" style={{'minHeight': 'calc(100vh - 3.23rem)'}}>
      <div className="form-container mx-auto bg-black border border-gray-800  w-[80%] sm:w-[60%] md:w-[40%] lg:w-[30%] max-w-[25rem] px-6 py-8 my-14 rounded-xl">
          <div className="space-y-2 text-center mb-4">
              <h1 className="text-2xl font-semibold text-white tracking-tight">Sign In To Your Account.</h1>
              <p className="text-sm text-gray-400">Let&apos;s sign in to your account and get started.</p>
          </div>
          <Signin />
      </div>
    </div>
  )
}