"use client"
import { getJobs } from "@/actions/job.actions"
import CustomTooltip from "@/components/custom/Tooltip"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Jobs() {
  const [jobs, setJobs] = useState<any>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const jobs = await getJobs();
      console.log("jobs", jobs);
      setJobs(jobs);
    }
    fetchJobs();
  }, []);


  return (
    <div className="jobs-page border flex justify-center border-green-600 my-30 ">
      <div className="max-w-6xl flex flex-col gap-4">
        {jobs.map((job) => (
          <Card key={job.id} className="w-full max-w-2xl md:min-w-[40rem] bg-inherit hover:bg-[#111111] border-zinc-800 p-4">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                {/* <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Ay5BUIMh24KJJSa2GvpYd5BtmiiX8b.png"
                  alt="Company logo"
                  className="w-[4rem] h-[4.2rem] rounded-lg"
                /> */}
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
                    <CustomTooltip triggerContent={job.description} tooltipContent={job.description} className="bg-white text-black shadow-md" />
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
                $ {job.Salary/1000}k
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
    </div>
  )
}

