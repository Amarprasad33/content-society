"use client"
import { getProfiles } from "@/actions/profile.action";
import { useToast } from "@/hooks/use-toast";
import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Profile {
    id: string;
    role: UserRole;
    name: string;
    profileImg: string | null;
    portfolioUrl: string | null;
    skills: string[];
    experience: string | null;
    email: string;
}

export default function ProfilesPage() {
    const {data: session, status} = useSession();
    const { toast } = useToast();
    const pathName = usePathname();
    const [initialReq, setInitialReq] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [profiles, setProfiles] = useState<Profile[]>([]);

    useEffect(() => {
        console.log("profiles", profiles);
    }, [profiles])

    useEffect(() => {
        console.log("SESSION frm--profiles ->", session)
        // if(session?.user?.role !== "EMPLOYER"){
        //   console.log("NOT an Employer")
        //   toast({
        //     variant: 'destructive',
        //     title: "Access Denied",
        //     description: "You have create a job to view the profiles.",
        //   })
        // //   return redirect("/");
        // }
        async function fetchProfiles() {            
            try {
                setIsLoading(true);
                console.log("INSIDE FETCH PROFILES")
                const result = await getProfiles();
                if (result.status && result.profiles) {
                    setProfiles(result.profiles);
                } else {
                    toast({
                        variant: 'destructive',
                        title: "Error fetching profiles",
                        description: "Please try again later.",
                    });
                }
            } catch (error) {
                console.error("Error fetching profiles:", error);
                toast({
                    variant: 'destructive',
                    title: "Error fetching profiles",
                    description: "Please try again later.",
                });
            }
        }
        
        fetchProfiles();

    }, [toast]);

    // if (status === "loading") {
    //     return <div>Loading...</div>
    // }
    // if (status === "unauthenticated") {
    //     toast({
    //       variant: 'destructive',
    //       title: "You are not signed in! Please sign in to see the profiles.",
    //     });
    //     // return redirect("/signin");
    //     return redirect(`/signin?callbackUrl=${encodeURIComponent(pathName)}`);
    // }

    return (
        <div className="container w-full min-h-screen flex justify-center py-7">
            <h2 className="text-white">Find the best talent for your needs</h2>
        </div>
    )
}