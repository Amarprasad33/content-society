"use client"
import { getProfiles } from "@/actions/profile.action";
import { useToast } from "@/hooks/use-toast";
import { UserRole } from "@prisma/client";
import Image from "next/image";
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
                console.log("res--", result)
                if (result.status && result.profiles) {
                    setProfiles(result.profiles);
                    setIsLoading(false);
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

    if(isLoading){
        return <div>Loading...</div>
    }

    return (
        <div className="container w-full min-h-screen flex flex-col items-center py-7">
            <h2 className="text-white">Find the best talent for your needs</h2>
            <div className="mt-10">
                {profiles.map((profileData: Profile) => (
                    <div className="border border-neutral-800 px-3 py-4 rounded-xl flex flex-col gap-3" key={profileData.id}>
                        <div className="flex gap-4">
                            <Image
                                className="w-14 h-14 rounded-lg"
                                alt="Textured background"
                                src={profileData.profileImg || ''}
                                width={300}
                                height={300}
                            />
                            <div className="flex flex-col gap-2">
                                <div>{profileData.name}</div>
                                <div>Exp: {profileData.experience}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}