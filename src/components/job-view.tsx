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
    description: string | null;
    type: string;
    experience: string | null;
    Salary: number | null;
    currency: string;
    requiredSkills: string[];
    orgLogo: string | null,
    orgName: string
}

interface ApplyJobSuccessResponse {
    status: boolean;
    job?: {
        Salary: number | null;
        category: string;
        createdAt: Date;
        currency: string;
        description: string;
        experience: string;
        id: string;
        orgBio: string;
        orgEmail: string;
        orgLogo: string;
        orgName: string;
        requiredSkills: string[];
        title: string;
        type: string;
        userId: string;
    }
    error?: string;
    message?: string;
}

interface ApplyJobErrorResponse {
    status: boolean;
    error: string;
    message?: string;
    code: number;
}
type ApplyJobResponse = ApplyJobSuccessResponse | ApplyJobErrorResponse;

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

    async function applyToJob() {
        try {
            const appliedRes: ApplyJobResponse = await recordApplyJob(jobId, letter);
            // console.log("appliedRes", appliedRes);
            if (!appliedRes.status) {
                toast({
                    variant: "destructive",
                    title: appliedRes?.error || "Your application couldn't be submitted, Please try again later.",
                    description: appliedRes?.message
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
            <section className="w-full h-full min-h-96 flex gap-5 justify-center items-center bg-zinc-900 rounded-t-xl py-3 px-5">
                <div role="status">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="text-3xl text-white font-semibold">Loading....</div>
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
        <section className="w-full h-full min-h-96 bg-zinc-900 rounded-t-xl py-3 px-5 max-h-[85vh] overflow-y-auto
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
                        src={job.orgLogo ?? ''}
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
                            {job.currency === 'USD' && `$ ${Number(job.Salary) / 1000}k`}
                            {job.currency === 'INR' && `₹ ${Number(job.Salary) / 1000}k`}
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
                    <p className="text-zinc-400 whitespace-pre-wrap">{job.description ?? "No description available"}</p>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-white mb-4">Want to apply ? Write a cover letter</h2>
                    <textarea
                        name="" id=""
                        placeholder="Write your cover letter"
                        className="w-1/2 rounded-xl focus:outline-hidden py-2 px-4 text-white"
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