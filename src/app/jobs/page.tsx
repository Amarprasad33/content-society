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
    }
  ]


  return (
    <div className="jobs-page border flex justify-center border-green-600 my-30 ">
      <div className="max-w-6xl flex flex-col gap-4 border border-red-500">
        {jobs.map((job) => (
          <div key={job.id} className="border border-gray-600 rounded-xl">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#1DA1F2] rounded-lg flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current">
                      <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Grant</span>
                      {/* <Badge variant="secondary" className="bg-red-500/10 text-red-500 hover:bg-red-500/20">New</Badge> */}
                    </div>
                    <h3 className="text-xl font-semibold text-white">Senior Business Systems Analyst</h3>
                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        {/* <MapPin className="w-4 h-4" /> */}
                        Work from anywhere
                      </div>
                      <div className="flex items-center gap-1">
                        {/* <Clock className="w-4 h-4" /> */}
                        Work anytime
                      </div>
                      <div className="flex items-center gap-1">
                        {/* <FileText className="w-4 h-4" /> */}
                        40 hrs/week
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-lg font-semibold text-foreground">$90K</span>
                  {/* <Button variant="outline">View job</Button> */}
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">You match!</span>
                  <div className="flex -space-x-1">
                    <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-background" />
                    <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-background" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                </div>
              </div>
            </div>

          
          </div>
        ))}
      </div>
    </div>
  )
}

