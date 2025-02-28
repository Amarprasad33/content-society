"use client"
import { getProfiles } from "@/actions/profile.action";
import { useToast } from "@/hooks/use-toast";
import { UserRole } from "@prisma/client";
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
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [profiles, setProfiles] = useState<Profile[]>([]);

    useEffect(() => {
        console.log("profiles", profiles);
    }, [profiles])

    useEffect(() => {
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

    if(status === "loading" || isLoading){
        return <div>Loading...</div>
    }

    return (
        <div className="container w-full min-h-screen flex justify-center py-7">
            <h2 className="text-white">Find the best talent for your needs</h2>
        </div>
    )
}