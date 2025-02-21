"use client"
import { getJobById, recordApplyJob } from "@/actions/job.actions";
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
    Salary: number;
    currency: string;
    requiredSkills: string[];
    orgLogo: string,
    orgName: string
}

export default function JobView({ jobId, setDetailView }: JobViewProps) {
    const [job, setJob] = useState<JobData | null>(null);
    const [loading, setLoading] = useState(true);
    const [letter, setLetter] = useState("");
    const { toast } = useToast();

    useEffect(() => {
        async function fetchJobDetails() {
            try {
                const result = await getJobById(jobId);
                if (result.status && result.job) {
                    console.log("job--", result);
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

    async function applyToJob(){
        try {            
            const appliedRes: any = await recordApplyJob(jobId, letter);
            // console.log("appliedRes", appliedRes);
            if(!appliedRes.status){
                toast({
                    variant: "destructive",
                    title: appliedRes?.message || "Your application couldn't be submitted, Please try again later.",
                });
                return;
            }
            toast({
                variant: "default",
                title: "Successfully applied!",
                description: "You can check other jobs which intrests you"
            });
        } catch (error) {
            console.log("error", error);
        }
    }

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
                className="absolute top-4 right-7 p-1 rounded-full hover:bg-zinc-800" 
                onClick={() => setDetailView(false)}
            >
                <Image
                  src='/images/Clear.svg'
                  width={18}
                  height={18}
                  alt="bookmark"
                />
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
                            {job.currency === 'USD' && `$ ${job.Salary/1000}k`}
                            {job.currency === 'INR' && `₹ ${job.Salary/1000}k`}
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
                        onChange={(e) => setLetter(e.target.value)}
                    ></textarea>
                </div>
                
                <div className="mt-8">
                    <Button 
                        disabled={letter.length < 1} 
                        variant="default" className="text-black bg-white hover:bg-zinc-300 w-1/2"
                        onClick={applyToJob}
                    >
                        Apply
                    </Button>
                </div>
            </div>
        </section>
    );
}