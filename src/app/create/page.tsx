"use client"
import JobForm from "@/components/job-form";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import Image from "next/image";

export default function Create() {
  const { toast } = useToast();
  const {data: session, status} = useSession();
  const pathName = usePathname();

  useEffect(() => {
    console.log("SESSION ->", session)
    if(session?.user?.role === "APPLICANT"){
      console.log("APPLICANT USER")
      toast({
        variant: 'destructive',
        title: "Access Denied",
        description: "You have created a profile. To create a job, try with a different account.",
      })
      return redirect("/");
    }
    // console.log("session", session);
  }, [session, toast])
  if (status === "loading") {
    return <div>Loading...</div>
  }
  if (status === "unauthenticated") {
    toast({
      variant: 'destructive',
      title: "You are not signed in! Please sign in to create a job.",
    });
    // return redirect("/signin");
    return redirect(`/signin?callbackUrl=${encodeURIComponent(pathName)}`);
  }
  return (
    <div className="w-full flex flex-col items-center pt-10 bg-[#04040F]">
        <Image
          className="absolute w-full h-[70%] top-0"
          alt="lineart"
          src="/images/create/soft-lights.png"
          width={880}
          height={944}
        />
        <h1 className="text-5xl font-semibold text-white mb-6">
          <span>Post a</span> 
          <span className="[font-family:'Inter',Helvetica] ml-3 bg-linear-to-r from-[#F17945] via-[#A531E8] to-[#7431E8] bg-clip-text text-transparent">job</span>
        </h1>
        <JobForm />
    </div>
  )
}