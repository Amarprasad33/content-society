"use client"
import JobForm from "@/components/job-form";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

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
    <div className="w-full flex flex-col items-center mt-10">
        <h1 className="text-5xl font-semibold text-white mb-6">Post a job</h1>
        <JobForm />
    </div>
  )
}