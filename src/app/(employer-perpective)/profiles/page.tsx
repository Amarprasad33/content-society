"use client"
import prisma from "@/config/prisma.config";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";


export default function Profiles() {
    const {data: session, status} = useSession();
    const { toast } = useToast();
    const pathName = usePathname();

    useEffect(() => {
        console.log("SESSION frm--profiles ->", session)
        if(session?.user?.role !== "EMPLOYER"){
          console.log("NOT an Employer")
          toast({
            variant: 'destructive',
            title: "Access Denied",
            description: "You have created a profile. To create a job, try with a different account.",
          })
        //   return redirect("/");
        }
        // NOTE -> Having issues in getting the APPLICANT profiles from db, maybe create some APPLICANT profiles then try
        async function getProfiles() {            
            try {
                const profiles = await prisma.user.findMany({
                    where: {
                        role: "APPLICANT"
                    },
                    // select: {
                    //     id: true,
                    //     name: true,
                    //     email: true,
                    //     profileImg: true,
                    //     role: true,
                    //     skills: true,
                    //     experience: true,
                    //     portfolioUrl: true,
                    //     // appliedJobs: {
                    //     //     select: {
                    //     //         resume: true,
                    //     //         createdAt: true,
                    //     //         job: true
                    //     //     }
                    //     // }
                    // },
                    // orderBy: {
                    //     name: 'asc'
                    // }
                })
                console.log("profiles--", profiles);
            } catch (error) {
                console.error("Error fetching profiles:", error);
                toast({
                    variant: 'destructive',
                    title: "Error fetching profiles",
                    description: "Please try again later.",
                });
            }
        }
        getProfiles();

    }, [session]);

    if (status === "loading") {
        return <div>Loading...</div>
    }
    if (status === "unauthenticated") {
        toast({
          variant: 'destructive',
          title: "You are not signed in! Please sign in to see the profiles.",
        });
        // return redirect("/signin");
        return redirect(`/signin?callbackUrl=${encodeURIComponent(pathName)}`);
    }

    return (
        <div className="container w-full min-h-screen flex justify-center py-7">
            <h2 className="text-white">Find the best talent for your needs</h2>

        </div>
    )
}