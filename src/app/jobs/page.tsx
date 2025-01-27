import CustomTooltip from "@/components/custom/Tooltip"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"

export default function Jobs() {

  const jobs = [
    {
      id: '1',
      userId: '1',
      title: 'Video Editor',
      description: 'Create enganging content which will help the business grow and gather more distribution.',
      companyName: 'Tech Corp',
      companyBio:
        'Leading tech solutions provider specializing in innovative web development.',
      companyEmail: 'contact@techcorp.com',
      category: 'Editing',
      type: 'Full time',
      workMode: 'remote',
      currency: 'INR',
      hasExperiencerange: true,
      minExperience: 1,
      maxExperience: 2,
      companyLogo: '',
      hasSalaryRange: true,
      hasExpiryDate: true,
      expiryDate: new Date(new Date().setDate(new Date().getDate() + 49)),
      minSalary: 60000,
      maxSalary: 100000,
      isVerifiedJob: true,
      requiredSkills: ['Premiere Pro', 'After Effects', 'Audacity', 'Blender']
    },
    {
      id: '2',
      userId: '2',
      title: 'Script Writer',
      description: 'Develop compelling scripts and storylines to captivate and engage audiences.',
      companyName: 'Media Makers Inc.',
      companyBio:
        'A dynamic production company specializing in creating high-quality video content for a global audience.',
      companyEmail: 'hr@mediamakers.com',
      category: 'Writing',
      type: 'Part time',
      workMode: 'hybrid',
      currency: 'INR',
      hasExperiencerange: true,
      minExperience: 2,
      maxExperience: 4,
      companyLogo: '',
      hasSalaryRange: true,
      hasExpiryDate: true,
      expiryDate: new Date(new Date().setDate(new Date().getDate() + 30)),
      minSalary: 40000,
      maxSalary: 60000,
      isVerifiedJob: true,
      requiredSkills: ['Premiere Pro', 'After Effects', 'Audacity', 'Blender', 'Notion', 'Linear']
    }
  ]


  return (
    <div className="jobs-page border flex justify-center border-green-600 my-30 ">
      <div className="max-w-6xl flex flex-col gap-4">
        {jobs.map((job) => (
          <Card key={job.id} className="w-full max-w-2xl md:min-w-[40rem] bg-inherit hover:bg-[#111111] border-zinc-800 p-4">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Ay5BUIMh24KJJSa2GvpYd5BtmiiX8b.png"
                  alt="Company logo"
                  className="w-[4rem] h-[4.2rem] rounded-lg"
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
                $ {(job.minSalary)/1000}k-{(job.maxSalary)/1000}k
              </span>
              <span className="px-2.5 py-1 bg-zinc-800 text-zinc-300 rounded-full text-xs">
                {job.minExperience}-{job.maxExperience} Yrs
              </span>
              <span className="px-2.5 py-1 bg-zinc-800 text-zinc-300 rounded-full text-xs flex items-center gap-1">
                <span>Gislasonberg</span>
                <span className="text-purple-400">Remote</span>
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {job.requiredSkills.slice(0, 4).map((skill) => (
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

