"use client"
import JobForm from "@/components/job-form";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function Create() {
  const { toast } = useToast();
  const {data: session, status} = useSession();
  if (status === "loading") {
    return <div>Loading...</div>
  }
  if (status === "unauthenticated") {
    toast({
      variant: 'destructive',
      title: "You are not signed in! Please sign in to create a job.",
    });
    return redirect("/signin");
  }
  return (
    <div className="w-full flex flex-col items-center mt-10">
        <h1>Create a job</h1>

        <JobForm />
        
    </div>
  )
}