import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import HeroProfileCard from "@/components/custom/heroProfileCard";


// Data for navigation items
const navItems = [
  { label: "Jobs", href: "#" },
  { label: "Features", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
];



export default function TempLanding() {
  return (
    <main className="flex flex-col items-center w-full min-h-screen">
      {/* Navigation Bar - Reduced height and spacing */}
      <header className="absolute w-full h-[80px] backdrop-blur-[5.85px] z-40">
        <div className="flex items-center justify-between px-[180px] h-full">
          {/* Logo - Adjusted alignment */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8">
              <img
                className="w-[26px] h-[26px] ml-[2px]"
                alt="ContentSociety Logo"
                src="/templanding/group.png"
              />
            </div>
            <span className="font-bold text-white text-base leading-[19px] [font-family:'Inter',Helvetica]">
              ContentSociety
            </span>
          </div>

          {/* Navigation Links - Reduced spacing */}
          <nav className="flex items-center gap-[40px] px-[30px] py-[8px]">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="[font-family:'Inter',Helvetica] font-medium text-[#86878a] text-base leading-[19px] hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Post a job button */}
          <Button
            variant="outline"
            className="w-[120px] h-10 bg-white text-black rounded-xl hover:bg-gray-100 text-sm"
          >
            Post a job
          </Button>
        </div>
      </header>
      {/* Hero Section */}
      <section className="flex flex-col items-center w-full min-h-screen relative overflow-hidden">
        <div className="relative w-full h-full max-w-[1920px] flex flex-col gap-5 border border-red-500">
          
          <div className="flex flex-col items-center justify-center text-center px-4 mt-[8rem] z-1 border border-blue-400">
            <h1 className="w-full max-w-[900px] text-4xl lg:text-6xl [font-family:'Inter',Helvetica] font-semibold text-white leading-[60px]">
              Hire top talent for your
            </h1>
            <h1 className="[font-family:'Inter',Helvetica] font-semibold text-4xl lg:text-6xl leading-[70px] bg-linear-to-r from-[#F0EEBD] via-[#F17945] to-[#7431E8] bg-clip-text text-transparent">
              content creation
            </h1>
            <p className="max-w-[600px] mt-4 [font-family:'Inter',Helvetica] font-normal text-[#9da7b3] text-base text-center leading-[24px]">
              Connect with skilled professionals to bring your content vision to
              life. From videographers to editors, find your perfect team.
            </p>
            <Button className="mt-8 w-[209px] h-14 rounded-[106px] bg-white text-black hover:bg-gray-100">
              <span className="[font-family:'Inter',Helvetica] font-medium text-base">
                Hire Talent
              </span>
            </Button>
          </div>

          {/* Background images */}
          <Image
            className="absolute w-[99%] top-[60px] left-0 z-0"
            alt="Textured background"
            src="/templanding/abstract/textured-background.png"
            width={1200}
            height={981}
          />
          {/* Radial glow */}
          <div className="z-10 relative mt-[2rem] w-full border border-blue-800">
            <div className="relative flex h-full w-full mt-28">
              <Image
                className="h-[490px] mx-auto z-1"
                // style={{'left': 'calc(100% - 98vw)'}}
                alt="circle shine"
                src="/templanding/abstract/circle-shine.png" 
                priority={true}
                placeholder='blur'
                blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMM5jszGQADqwHCQLH4TQAAAABJRU5ErkJggg=="
                width={1820}
                height={400}
              />
            </div>
            {/* Profile Cards */}
            <div className="absolute inset-0 border border-pink-500 w-full h-fit flex items-center justify-center">
              <div className="w-fit z-30">
                <HeroProfileCard />
              </div>
              <div className="absolute z-10 h-[27rem] w-[30rem] border border-red-500">
                <div className="absolute -right-56 top-[3.9rem] rotate-[17.6deg]">
                  <HeroProfileCard />
                </div>
                <div className="absolute -left-56 top-[3.9rem] -rotate-[17.6deg]">
                  <HeroProfileCard />
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Bento-section */}
      <section className="flex flex-col items-center w-full border border-slate-400 min-h-screen">
        {/* First bento gradient */}
        {/* <div class="w-[640px] h-[420px] rounded-lg bg-[linear-gradient(to_bottom,_#120E25_14%,_#352390_69%)]"></div> */}
        {/* <div className="grid gap-6 p-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-6 auto-rows-fr">
          <!-- Box 1: Flexible Search (Takes 2 columns on large screens) -->
          <div className="lg:col-span-4 bg-[#1a1235] rounded-xl p-6"> 
              <h3 className="text-white font-semibold">Flexible Search</h3>
              <p className="text-gray-400">Find the right candidate...</p>
          </div>

          <!-- Box 2: Master Social Presence -->
          <div className="lg:col-span- bg-[#1a1235] rounded-xl p-6">
              <h3 className="text-white font-semibold">Master Social Presence</h3>
              <p className="text-gray-400">Free social media managers...</p>
          </div>

          <!-- Box 3: Effortless Hiring Process (Takes 2 columns on large screens) -->
          <div className="lg:col-span-2 bg-[#1a1235] rounded-xl p-6">
              <h3 className="text-white font-semibold">Effortless Hiring Process</h3>
              <p className="text-gray-400">Find and onboard top talent...</p>
          </div>

          <!-- Box 4: Diverse Talent Pool -->
          <div className="bg-[#1a1235] rounded-xl p-6">
              <h3 className="text-white font-semibold">Diverse Talent Pool</h3>
              <p className="text-gray-400">Access a curated network...</p>
          </div>
        </div> */}

        <div className="border border-rose-600 w-[80%] h-[70vh] mt-8">
          <div className="w-full flex gap-6">
            {/* Card-1 */}
            <div className="relative w-[640px] h-[420px] overflow-hidden rounded-2xl bg-[linear-gradient(to_top,_rgba(18,14,37,0.84)_14%,_rgba(53,35,144,0.69)_100%)]">
              {/* Search Filter cards border-[#282D43] */}
              <div className="cards-container flex flex-col gap-8 absolute left-28 top-8">
                <div className="flex gap-6">
                  <Bento_1_FilterCard 
                    filterHeading="Categories"
                    filterOptions={["Creative", "Post production", "Design", "Video editing"]}
                  />
                  <Bento_1_FilterCard 
                    filterHeading="Markets"
                    filterOptions={["Entertainment", "Gaming & Esports", "Education", "IM", "Media"]}
                  />
                </div>
                <div className="flex gap-6">
                  <Bento_1_FilterCard 
                    filterHeading="Salary"
                    filterOptions={["$20,000", "-", "$80,000+"]}
                  />
                  <Bento_1_FilterCard 
                    filterHeading="Job Type"
                    filterOptions={["Full-time", "Part-time", "Remote", "On-site", "Hybrid", "Contract", "Freelance"]}
                  />
                </div>
              </div>
              <div className="p-[1px] rounded-lg z-1 bg-linear-to-r from-[#4E0AC2] to-[#25055C] w-fit bottom-[7rem] absolute" style={{'left': 'calc(100% - 23rem)'}}>
                <button className="bg-[#171036] px-[30px] pt-[5px] pb-[6px] w-full h-full text-xs font-normal rounded-[7px]">Search Filters</button>
              </div>
              {/* Copy */}
              <div className="absolute bottom-8 left-7 flex flex-col gap-1 ">
                <div className="text-base font-medium text-white">Flexible Search</div>
                <div className="text-sm w-[98%] leading-[20px] font-normal text-[#C4C5C8]">Find the right candidate your content needs according to your requirements</div>
              </div>
              <Image
                className=""
                alt="Light glow"
                src="/templanding/abstract/purple_light_bento-1.png"
                width={660}
                height={416}
              />
              <Image
                className="absolute bottom-[7.8rem] left-[4.3rem]"
                alt="Connecting lines"
                src="/templanding/mini_assets/connector-bento.svg"
                width={215}
                height={244}
              />
            </div>
            {/* Card-2 */}
            <div className="relative flex flex-col items-center rounded-2xl w-[428px] h-[420px] bg-[#110D27] overflow-hidden">
              {/* Copy */}
              <div className="absolute bottom-8 left-7 flex flex-col gap-1 ">
                <div className="text-base font-medium text-white">Flexible Search</div>
                <div className="text-sm w-[98%] leading-[20px] font-normal text-[#C4C5C8]">Find the right candidate your content needs according to your requirements</div>
              </div>
              <div className="bg-[#31177E] w-3/4 h-64 absolute -top-44 rounded-[20rem] blur-[60px]" />
              <div className="bg-[#31177E] w-3/4 h-40 absolute -bottom-24 rounded-[8rem] blur-[60px]" />
              {/* side - rods */}
              <div className="w-52 h-6 rounded-full overflow-hidden "></div>
            </div>
          </div>
        </div>

      </section>

    </main> 

  );
}


const Bento_1_FilterCard = ({ filterHeading, filterOptions }: { filterHeading: string, filterOptions: string[] }) => {
  return (
    <div className="relative w-fit rounded-lg p-4 border border-[#292e43] hover:shadow-[0px_0px_9px_3px_rgba(102,_47,_212,_0.35)] transition-shadow duration-200">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-[#101129] opacity-80 rounded-lg"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom_left,_rgba(120,86,220,0.4)_-47%,_rgba(0,0,0,0.1)_70%)] rounded-lg"></div>
      
      {/* Solid Color Overlay */}
        
      <div className="relative z-10 text-white flex flex-col gap-3">
        <div className="text-sm font-medium">{filterHeading}</div>
        <div className="text-[12px] font-normal flex gap-2 text-white/60">
          {filterOptions.map((item: string) => (
            <div key={item} className="whitespace-nowrap">{item}</div>
          ))}
        </div>
      </div>
    </div>
  )
}