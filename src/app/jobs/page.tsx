"use client"
import { getJobs } from "@/actions/job.actions"
import CustomTooltip from "@/components/custom/Tooltip"
import JobView from "@/components/job-view"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { JobSchemaType } from "@/lib/schema/jobSchema"

interface JobType extends JobSchemaType{
  id: string,
  orgLogo: string,
  Salary?: string,
  userId: string,
}

export default function Jobs() {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [jobDetailView, setJobDetailView] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState('');
  const viewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if(jobDetailView){
      document.body.style.overflow = 'hidden';
    }else{
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    }
  }, [jobDetailView])

  

  useEffect(() => {
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
    }
    fetchJobs();

    const handleMouseClick = (event: MouseEvent) => {
      if(viewRef.current && !viewRef.current.contains(event.target as Node)){
        setJobDetailView(false);
      }
    }
    document.addEventListener('mousedown', handleMouseClick);

    return () => {
      document.removeEventListener('mousedown', handleMouseClick)
    }
  }, []);

  


  return (
    <div className="jobs-page border flex justify-center border-green-600 my-30 ">
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
                    <CustomTooltip triggerContent={job.description?? ''} tooltipContent={job.description?? ''} className="bg-white text-black shadow-md" />
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
                {job.Salary && job.currency === 'USD' && <>$ {Number(job.Salary)/1000}k</>}
                {job.Salary && job.currency === 'INR' && <>₹ {Number(job.Salary)/1000}k</>}
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
      { jobDetailView && 
        <div className="inset-0 absolute w-full h-full bg-zinc-700/70 backdrop-blur-xs">
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
              className="absolute bottom-0 w-full h-[calc(100%-16rem)]"
            >
              <JobView jobId={selectedJobId} setDetailView={setJobDetailView} />
            </motion.div>
          </AnimatePresence>
        </div>
      }
    </div>
  )
}

