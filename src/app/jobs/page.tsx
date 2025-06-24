"use client"
import { getJobs } from "@/actions/job.actions"
import CustomTooltip from "@/components/custom/Tooltip"
import JobView from "@/components/job-view"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { JobSchemaType } from "@/lib/schema/jobSchema"

interface JobType extends JobSchemaType {
  id: string,
  orgLogo: string,
  Salary?: string,
  userId: string,
}

export default function Jobs() {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [jobDetailView, setJobDetailView] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedJobId, setSelectedJobId] = useState('');
  const viewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (jobDetailView) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    }
  }, [jobDetailView])



  useEffect(() => {
    setLoading(true);
    console.log('loading', loading)
    const fetchJobs = async () => {
      const jobsData = await getJobs();
      const processedJobs = jobsData.map(job => ({
        ...job,
        orgLogo: job.orgLogo || '',
        Salary: job.Salary?.toString() || undefined,
        description: job.description?.toString() || undefined,
        orgBio: job.orgBio?.toString() || undefined,
        experience: job.experience?.toString() || undefined,
      }));
      console.log("jobs", processedJobs);
      // Convert `null` orgLogo values to an empty string
      setJobs(processedJobs);
      setLoading(false);
      console.log('loading', loading)
    }
    fetchJobs();

    const handleMouseClick = (event: MouseEvent) => {
      if (viewRef.current && !viewRef.current.contains(event.target as Node)) {
        setJobDetailView(false);
      }
    }
    document.addEventListener('mousedown', handleMouseClick);

    return () => {
      document.removeEventListener('mousedown', handleMouseClick)
    }
  }, []);

  if (loading) {
    return (
      <div className="jobs-page flex flex-col items-center justify-center h-screen ">
        <div role="status">
          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
        <div className="text-3xl mt-8 text-white font-semibold">Loading....</div>
      </div>
    )
  }

  return (
    <div className="jobs-page flex flex-col items-center justify-center mt-20 ">
      <h1 className="font-semibold text-4xl mb-8">Explore Jobs</h1>
      <div className="max-w-6xl flex flex-col gap-4">
        {jobs.map((job: JobType) => (
          <Card onClick={() => {
            setJobDetailView(true);
            setSelectedJobId(job.id)
          }}
            key={job.id}
            className="w-full max-w-2xl md:min-w-[40rem] bg-inherit hover:bg-[#111111] border-zinc-800 p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <Image
                  src={job.orgLogo}
                  alt="Company logo"
                  className="w-[4rem] h-[4.2rem] rounded-lg"
                  width={64}
                  height={67.2}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-white font-medium">{job.title}</h2>
                    <span className="text-emerald-400 text-sm flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                      Actively Hiring
                    </span>
                  </div>
                  <p className="text-zinc-400 text-sm mt-0.5">
                    <CustomTooltip triggerContent={job.description ?? ''} tooltipContent={job.description ?? ''} className="bg-white text-black shadow-md" />
                  </p>
                  <p className="text-zinc-500 text-sm mt-0.5">Posted 3 days ago</p>
                </div>
              </div>
              <button className="text-zinc-400 hover:text-white transition-colors">
                {/* <BookmarkIcon className="w-6 h-6" /> */}
                <Image
                  src='/images/bookmark-icon.svg'
                  width={18}
                  height={18}
                  alt="bookmark"
                />
                <span className="sr-only">Bookmark job</span>
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-2.5 py-1 bg-zinc-800 text-zinc-300 rounded-full text-xs">
                {job.type}
              </span>
              <span className="px-2.5 py-1 bg-zinc-800 text-emerald-400 rounded-full text-xs">
                {/* $ {(job.minSalary)/1000}k-{(job.maxSalary)/1000}k */}
                {job.Salary && job.currency === 'USD' && <>$ {Number(job.Salary) / 1000}k</>}
                {job.Salary && job.currency === 'INR' && <>₹ {Number(job.Salary) / 1000}k</>}
              </span>
              <span className="px-2.5 py-1 bg-zinc-800 text-zinc-300 rounded-full text-xs">
                {/* {job.minExperience}-{job.maxExperience} Yrs */}
                {job.experience} Yrs
              </span>
              <span className="px-2.5 py-1 bg-zinc-800 text-zinc-300 rounded-full text-xs flex items-center gap-1">
                <span>Gislasonberg</span>
                <span className="text-purple-400">Remote</span>
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {job.requiredSkills.slice(0, 4).map((skill: string) => (
                <span key={skill} className="px-2.5 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs">
                  {skill}
                </span>
              ))}
              {job.requiredSkills.length > 4 && (
                <span className="px-2.5 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs">
                  +{(job.requiredSkills.length - 4)} more
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>
      {jobDetailView &&
        <div className="inset-0 fixed z-10 w-full h-screen bg-zinc-700/70 backdrop-blur-xs">
          <AnimatePresence mode="wait">
            <motion.div
              key="job-view-modal"
              initial={{
                opacity: 0.7,
                translateY: 50,
              }}
              animate={{
                opacity: 1,
                translateY: 0,
              }}
              exit={{
                opacity: 0.6,
                translateY: 50
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut"
              }}
              ref={viewRef}
              className="absolute bottom-[0rem] w-full  h-[calc(100%-12rem)] "
            >
              {/**/}
              <JobView jobId={selectedJobId} setDetailView={setJobDetailView} />
            </motion.div>
          </AnimatePresence>
        </div>
      }
    </div>
  )
}

