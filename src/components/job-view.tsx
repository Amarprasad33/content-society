"use client"
import { getJobById } from "@/actions/job.actions";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Button } from "./ui/button";

interface JobViewProps {
    jobId: string;
    setDetailView: (value: boolean) => void;
}

interface JobData {
    id: string;
    title: string;
    description: string;
    type: string;
    experience: string;
    salary: number;
    currency: string;
    requiredSkills: string[];
    orgLogo: string,
    orgName: string
    // Add other fields as needed
}

export default function JobView({ jobId, setDetailView }: JobViewProps) {
    const [job, setJob] = useState<JobData | null>(null);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        async function fetchJobDetails() {
            try {
                const result = await getJobById(jobId);
                if (result.status && result.job) {
                    setJob(result.job);
                } else {
                    toast({
                        variant: "destructive",
                        title: "Error",
                        description: "Failed to fetch job details"
                    });
                }
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Something went wrong"
                });
                console.log("err", error);
            } finally {
                setLoading(false);
            }
        }

        fetchJobDetails();
    }, [jobId, toast]);

    if (loading) {
        return (
            <section className="w-full h-full min-h-96 bg-zinc-900 rounded-t-xl py-3 px-5">
                <div className="animate-pulse">Loading...</div>
            </section>
        );
    }

    if (!job) {
        return (
            <section className="w-full h-full min-h-96 bg-zinc-900 rounded-t-xl py-3 px-5">
                <div>Job not found</div>
            </section>
        );
    }

    return (
        <section className="w-full h-full min-h-96 bg-zinc-900 rounded-t-xl py-3 px-5 overflow-y-auto
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-zinc-800
            [&::-webkit-scrollbar-thumb]:bg-zinc-600
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:border-2
            [&::-webkit-scrollbar-thumb]:border-zinc-800
            [&::-webkit-scrollbar-thumb]:hover:bg-zinc-500"
        >
            <button 
                className="absolute top-4 right-7" 
                onClick={() => setDetailView(false)}
            >
                X
            </button>
            
            <div className="max-w-4xl mx-auto pt-8">
                <div className="flex items-start gap-4">
                    <Image
                        src={job.orgLogo}
                        alt={job.orgName}
                        width={80}
                        height={80}
                        className="rounded-lg"
                    />
                    <div>
                        <h1 className="text-2xl font-semibold text-white">{job.title}</h1>
                        <p className="text-zinc-400">{job.orgName}</p>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4">
                    <div className="bg-zinc-800/50 p-4 rounded-lg">
                        <p className="text-zinc-400">Job Type</p>
                        <p className="text-white">{job.type}</p>
                    </div>
                    <div className="bg-zinc-800/50 p-4 rounded-lg">
                        <p className="text-zinc-400">Experience</p>
                        <p className="text-white">{job.experience} Years</p>
                    </div>
                    <div className="bg-zinc-800/50 p-4 rounded-lg">
                        <p className="text-zinc-400">Salary</p>
                        <p className="text-white">
                            {job.currency === 'USD' && `$ ${job.salary/1000}k`}
                            {job.currency === 'INR' && `₹ ${job.salary/100000}L`}
                        </p>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-white mb-4">Required Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {job.requiredSkills.map((skill) => (
                            <span 
                                key={skill}
                                className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-white mb-4">Job Description</h2>
                    <p className="text-zinc-400 whitespace-pre-wrap">{job.description}</p>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-white mb-4">Want to apply ? Write a cover letter</h2>
                    <textarea 
                        name="" id="" 
                        placeholder="Write your cover letter" 
                        className="w-1/2 rounded-xl focus:outline-none py-2 px-4 text-black"
                    ></textarea>
                </div>
                
                <div className="mt-8">
                    <Button variant="default" className="text-black bg-white hover:bg-zinc-300">Apply</Button>
                </div>
            </div>
        </section>
    );
}