"use client"
// import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";


import React from "react";
import Image from "next/image";
import HeroProfileCard from "@/components/custom/heroProfileCard";
import SectionHeading from "@/components/custom/section-heading";
import { testimonialsData } from "@/lib/utils";


export default function Home() {
  const { toast } = useToast();
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get('error');
    const message = searchParams.get('message');
    console.log("error", error);
    console.log("message", message);
    if(error === 'unauthorized' && message){
      console.log("IFF")
      toast({
        variant: 'destructive',
        title: "Access Denied",
        description: decodeURIComponent(message),
      });
    }
  }, [searchParams, toast])

  return (
      <main className="flex flex-col items-center w-full min-h-screen bg-[#0B051D]">
        {/* Hero Section */}
        <section className="flex flex-col items-center w-full min-h-screen relative overflow-hidden">
          <div className="relative w-full h-full max-w-[1920px] flex flex-col gap-5 ">
            
            <div className="flex flex-col items-center justify-center text-center px-4 mt-[8rem] z-1">
              <h1 className="w-full max-w-[900px] text-4xl lg:text-6xl [font-family:'Inter',Helvetica] font-semibold text-white leading-[60px]">
                Hire top talent for your
              </h1>
              <h1 className="[font-family:'Inter',Helvetica] font-semibold -mt-4 md:mt-0 text-4xl lg:text-6xl leading-[70px] bg-linear-to-r from-[#F0EEBD] via-[#F17945] to-[#7431E8] bg-clip-text text-transparent">
                content creation
              </h1>
              <p className="max-w-[600px] mt-4 [font-family:'Inter',Helvetica] font-normal text-[#9da7b3] text-base text-center leading-[24px]">
                Connect with skilled professionals to bring your content vision to
                life. From videographers to editors, find your perfect team.
              </p>
              <button className="mt-8 w-fit px-12 cursor-pointer py-3 rounded-[106px] bg-white text-black hover:bg-gray-100">
                <span className="[font-family:'Inter',Helvetica] font-medium text-base">
                  Hire Talent
                </span>
              </button>
            </div>
  
            {/* Background images */}
            <Image
              className="absolute w-[99%] top-[-10px] left-0 z-0"
              alt="Textured background"
              src="/templanding/abstract/textured-background.png"
              width={1200}
              height={981}
            />
            {/* Radial glow */}
            <div className="z-10 relative mt-[2rem] w-full">
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
              <div className="absolute inset-0 w-full h-fit flex items-center justify-center">
                <div className="w-fit z-30">
                  <HeroProfileCard />
                </div>
                <div className="absolute z-10 h-[27rem] w-[30rem]">
                  <div className="absolute -right-12 md:-right-56 top-[2.9rem] md:top-[3.99rem] rotate-[10.6deg] md:rotate-[17.6deg]">
                    <HeroProfileCard />
                  </div>
                  <div className="absolute -left-12 md:-left-56 top-[2.9rem] md:top-[3.99rem] -rotate-[10.6deg] md:-rotate-[17.6deg]">
                    <HeroProfileCard />
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </section>
  
        {/* Bento-section */}
        <section className="flex flex-col items-center w-full min-h-screen">
          <SectionHeading
            mainHeading="Why Us?"
            subHeading="Discover the benefits of out platform designed specifically for content creators and creative individuals"
          />
          <div className="bento-container w-[80%] min-h-screen mt-20 flex flex-col items-center gap-6 pb-16">
            <div className="bento-row w-fit flex gap-6">
              {/* Card-1 */}
              <div className="relative w-[428px] sm:w-[640px] h-[420px] overflow-hidden rounded-2xl bg-[linear-gradient(to_top,_rgba(18,14,37,0.84)_14%,_rgba(53,35,144,0.69)_100%)]">
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
              <div className="bento-card-sm relative flex flex-col items-center rounded-2xl w-[428px] h-[420px] bg-[#110D27] overflow-hidden">
                {/* central design */}
                <div className="rounded-[9px] mt-12 bg-[linear-gradient(to_bottom,_rgba(192,180,251,0.5)_-30%,_rgba(0,0,0,0)_50%)] z-10 p-[1px] w-[60%] h-[60%]">
                  <div className="bg-transparent bg-[linear-gradient(to_bottom,_rgba(46,37,95,1)_0%,_rgba(28,23,56,0.6)_100%)] w-full h-full rounded-[8px] flex items-centers justify-center">
                    <div className="rounded-[9px] bg-[linear-gradient(to_bottom,_rgba(192,180,251,0.4)_-50%,_rgba(0,0,0,0)_50%)] z-10 p-[1px] w-[85%] h-[85%] self-center">
                      <div className="bg-transparent bg-[linear-gradient(to_bottom,_rgba(46,37,95,1)_0%,_rgba(28,23,56,0.6)_100%)] w-full h-full rounded-[8px] flex items-centers justify-center">
                        <div className="rounded-[8px] bg-[linear-gradient(to_bottom,_rgba(192,180,251,0.5)_-70%,_rgba(0,0,0,0)_50%)] p-[1px] w-[85%] h-[85%] self-center">
                          <div className="w-full h-full bg-[#19133ddd] rounded-[7px] flex items-center justify-center shadow-[4px_9px_12px_0px_rgba(0,_0,_0,_0.2)]">
                            <Image
                              className="absolute"
                              alt="Connecting lines"
                              src="/templanding/mini_assets/sm-connector.svg"
                              width={118}
                              height={118}
                            />
                            <div className="w-[118px] h-[118px] relative">
                              <figure className="w-7 h-7 rounded-full absolute -top-2 -left-3 bg-[#190E4E] border border-[#8F7CFC] flex items-center justify-center">
                                <Image
                                  className=""
                                  alt="facebook"
                                  src="/templanding/mini_assets/facebook.svg"
                                  width={20}
                                  height={20}
                                />
                              </figure>
                              <figure className="w-7 h-7 rounded-full absolute -top-2 -right-3 bg-[#190E4E] border border-[#8F7CFC] flex items-center justify-center">
                                <Image
                                  className=""
                                  alt="instagram"
                                  src="/templanding/mini_assets/instagram.svg"
                                  width={20}
                                  height={20}
                                />
                              </figure>
                              <figure className="w-7 h-7 rounded-full absolute -bottom-2 -left-3 bg-[#190E4E] border border-[#8F7CFC] flex items-center justify-center">
                                <Image
                                  className=""
                                  alt="youtube"
                                  src="/templanding/mini_assets/youtube.svg"
                                  width={20}
                                  height={20}
                                />
                              </figure>
                              <figure className="w-7 h-7 rounded-full absolute -bottom-2 -right-3 bg-[#190E4E] border border-[#8F7CFC] flex items-center justify-center">
                                <Image
                                  className=""
                                  alt="X"
                                  src="/templanding/mini_assets/X.svg"
                                  width={18}
                                  height={18}
                                />
                              </figure>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> 
                  </div>
                </div>
                {/* side - rods */}
                <div className="w-44 h-[2rem] p-[1px] absolute top-[4rem] right-[-8rem] rounded-full z-10 bg-radial-[at_10%_15%] from-[#A9A0FA] to-transparent/5 to-25%">
                  <div className="w-full h-full rounded-full bg-[linear-gradient(to_top,_rgba(28,16,70,1)_13%,_rgba(90,60,185,1)_170%)]"></div>
                </div>
                <div className="w-44 h-[2rem] p-[1px] absolute bottom-[9rem] right-[-6.5rem] rounded-full z-10 bg-radial-[at_10%_15%] from-[#A9A0FA] to-transparent/5 to-25%">
                  <div className="w-full h-full rounded-full bg-[linear-gradient(to_top,_rgba(28,16,70,1)_13%,_rgba(90,60,185,1)_170%)]"></div>
                </div>
                <div className="w-44 h-[2rem] p-[1px] absolute bottom-[11rem] left-[-8rem] rounded-full z-10 bg-radial-[at_90%_15%] from-[#A9A0FA] to-transparent/5 to-25%">
                  <div className="w-full h-full rounded-full bg-[linear-gradient(to_top,_rgba(28,16,70,1)_13%,_rgba(90,60,185,1)_170%)]"></div>
                </div>
                <div className="w-44 h-[2rem] p-[1px] absolute top-[2.5rem] left-[-6.5rem] rounded-full z-10 bg-radial-[at_90%_15%] from-[#A9A0FA] to-transparent/5 to-25%">
                  <div className="w-full h-full rounded-full bg-[linear-gradient(to_top,_rgba(28,16,70,1)_13%,_rgba(90,60,185,1)_170%)]"></div>
                </div>
                {/* Copy */}
                <div className="absolute bottom-8 left-7 flex flex-col gap-1 ">
                  <div className="text-base font-medium text-white">Master Social Presence</div>
                  <div className="text-sm w-[98%] leading-[20px] font-normal text-[#C4C5C8]">Find social media managers, strategists who can amplify your online presence.</div>
                </div>
                <div className="bg-[#31177E] w-3/4 h-64 absolute -top-44 rounded-[20rem] blur-[60px]" />
                <div className="bg-[#31177E] w-3/4 h-40 absolute -bottom-24 rounded-[8rem] blur-[60px]" />
              </div>
              
            </div>
            <div className="bento-row w-fit flex gap-6">
              {/* card  - 3 */}
              <div className="bento-card-sm relative flex flex-col items-center rounded-2xl w-[428px] h-[460px] bg-[#110D27] overflow-hidden">
                  <Image
                    className="absolute z-20"
                    alt="Person"
                    src="/templanding/abstract/particle-glow.png"
                    width={64}
                    height={373}
                  />
                <div className="center-dzn w-[170px] h-[170px] absolute top-20 ml-[10px] flex items-center justify-center">
                  <div className="w-full h-full rounded-full" style={{
                    backgroundImage: `
                      radial-gradient(at 50% 0%, #A9A0FA, transparent 45%),
                      radial-gradient(at 50% 95%, #A9A0FA, transparent 45%)
                    `
                  }}></div>
                  <div className="bg-[#110D27] w-[99%] h-[99%] rounded-full absolute top-[1px]" style={{
                    backgroundImage: `
                      radial-gradient(at 50% -260%, rgba(169, 160, 250, 0.3) 0%, transparent 80%),
                      radial-gradient(at 50% 420%, rgba(169, 160, 250, 0.3) 0%, transparent 80%)
                    `,
                  }}></div>
                  <Image
                    className="absolute top-3 -left-0.5"
                    alt="connector"
                    src="/templanding/mini_assets/bento-3-connector-upleft.svg"
                    width={50}
                    height={60}
                  />
                  <Image
                    className="absolute bottom-3 -right-0.5"
                    alt="connector"
                    src="/templanding/mini_assets/bento-3-connector-downright.svg"
                    width={50}
                    height={60}
                  />
                  <div className="absolute rounded-full w-[60%] h-[60%] bg-[#120E29] flex items-center justify-center" style={{
                    boxShadow: `
                      inset 0px 1px 12px -5px rgba(152, 126, 248, 1),
                      4px 9px 12px 0px rgba(0, 0, 0, 0.2)
                    `
                  }}>
                    <figure className="h-px bg-[#D4C6FF] w-[80%] absolute top-[49%] mx-auto left-2.5 -rotate-45"></figure>
                    <div className="bg-[#120E29]/50 backdrop-blur-sm z-10 w-[55%] h-[55%] rounded-full flex items-center justify-center">
                      <div className="w-[70%] h-[70%] rounded-full bg-radial-[at_50%_50%] from-[#19133A] to-[#3F318F] from-10% to-190% flex items-center justify-center">
                        <Image
                          className=""
                          alt="Person"
                          src="/templanding/mini_assets/person.svg"
                          width={18}
                          height={18}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <Image
                  className=""
                  alt="grid"
                  src="/templanding/abstract/masked-grid.png"
                  width={450}
                  height={390}
                />
                {/* copy */}
                <div className="absolute bottom-8 left-7 flex flex-col gap-1 ">
                  <div className="text-base font-medium text-white">Effortless Hiring Process</div>
                  <div className="text-sm w-[98%] leading-[20px] font-normal text-[#C4C5C8]">Find and onboard top creative talent quickly with a seamless, hassle-free hiring experience</div>
                </div>
                <div className="bg-[#31177E] w-3/4 h-[20rem] absolute -top-60 rounded-[20rem] blur-[60px]" />
                <div className="bg-[#31177E] w-3/4 h-[20rem] absolute -bottom-72 rounded-[18rem] blur-[60px]" />
              </div>
              {/* Card - 4 */}
              <div className="relative flex flex-col items-center justify-center rounded-2xl w-[428px] sm:w-[640px] h-[460px] bg-[linear-gradient(to_top,_rgba(18,14,37,0.84)_20%,_rgba(43,29,111,0.63)_130%)] overflow-hidden">
                <div className="z-10 relative -mt-24 h-64 w-full flex items-center justify-center overflow-hidden" aria-label="card-center-dzn">
                  <div className="relative w-[28rem] h-[28rem] rounded-full bg-[#1A1243] border border-[#8975FD] mt-[15rem] flex items-center justify-center">
                    <figure className="w-9 h-9 z-20 rounded-full bg-[#190E4E] border border-[#8F7CFC] absolute -top-1 right-32 flex items-center justify-center">
                      <Image
                        className=""
                        alt="chart"
                        src="/templanding/mini_assets/chart.svg"
                        width={22}
                        height={22}
                      />
                    </figure>
                    <div className="relative w-[80%] h-[80%] rounded-full bg-[#1A1243] border border-[#8975FD] flex items-center justify-center shadow-[0px_-4px_11px_10px_rgba(0,_0,_0,_0.25)]">
                      <figure className="w-9 h-9 z-20 rounded-full bg-[#190E4E] border border-[#8F7CFC] absolute top-5 left-12 flex items-center justify-center">
                        <Image
                          className=""
                          alt="pen"
                          src="/templanding/mini_assets/pen.svg"
                          width={22}
                          height={22}
                        />
                      </figure>
                      <div className="relative w-[76%] h-[76%] rounded-full bg-[#1A1243] border border-[#8975FD] flex items-center justify-center shadow-[0px_-4px_11px_10px_rgba(0,_0,_0,_0.25)]">
                        <figure className="w-9 h-9 z-20 rounded-full bg-[#190E4E] border border-[#8F7CFC] absolute top-7 right-[1.1rem] flex items-center justify-center">
                          <Image
                            className=""
                            alt="camera"
                            src="/templanding/mini_assets/camera.svg"
                            width={22}
                            height={22}
                          />
                        </figure>
                        <div className="relative w-[69%] h-[69%] rounded-full bg-[#1A1243] flex items-center justify-center border border-[#8975FD] shadow-[0px_-4px_11px_10px_rgba(0,_0,_0,_0.25)]">
                          <figure className="w-9 h-9 z-20 rounded-full bg-[#190E4E] border border-[#8F7CFC] absolute top-8 -left-[0.4rem] flex items-center justify-center">
                            <Image
                              className=""
                              alt="mic"
                              src="/templanding/mini_assets/mic.svg"
                              width={22}
                              height={22}
                            />
                          </figure>
                        </div>
                      </div>
                    </div>
                    {/* Gradient overlay */}
                    <div className="w-full h-full rounded-t-[222px] absolute bg-[linear-gradient(to_top,_rgba(22,19,68,0.7)_0%,_rgba(83,69,129,0.2)_120%)]"></div>
                  </div>
                </div>
                    <div className="absolute bottom-[6rem] w-[7rem] h-[7rem] rounded-full z-100 bg-[#2a2475eb] flex items-center justify-center">
                      <div className="w-[90%] h-[90%] border border-[#5D41FA]/60 bg-[#1D1647] rounded-full flex items-center justify-center">
                        <Image
                          className=""
                          alt="mic"
                          src="/templanding/mini_assets/cs-logo-violet.svg"
                          width={49}
                          height={49}
                        />
                      </div>
                    </div>
                <div className="w-[86%] h-[5rem] absolute bottom-[7rem] blur-[23px] z-20 bg-[#10082c]"></div>
                <Image
                  className="absolute -right-4 top-0"
                  alt="soft-light"
                  src="/templanding/abstract/soft-light.png"
                  width={718}
                  height={586}
                />
                <div className="absolute bottom-8 left-7 flex flex-col gap-1 ">
                  <div className="text-base font-medium text-white">Diverse Talent Pool</div>
                  <div className="text-sm w-[98%] leading-[20px] font-normal text-[#C4C5C8]">Access a curated network of skilled content creators, from video editors to strategists, ensuring you find the perfect match for your projects</div>
                </div>
              </div>
            </div>
          </div>
  
        </section>
        
        {/* Features Section */}
        <section className="flex flex-col items-center w-full min-h-[90vh] overflow-hidden">
          <SectionHeading
            mainHeading="Find and Hire Top Creative Talent"
            subHeading="Discover the benefits of out platform designed specifically for content creators and creative individuals"
          />
          <div className="mt-20 grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            <div className="fc-1 overflow-hidden flex flex-col justify-end relative px-7 py-[22px] min-h-[30rem] w-[26rem] md:w-[23rem] lg:w-[26rem] bg-[#0F0B28] rounded-2xl border border-[#363151]">
              <div className="center-dzn w-[270px] h-[270px] absolute top-1/10 left-[17%] mx-auto flex items-center justify-center">
                <div className="w-full h-full rounded-full" style={{
                  backgroundImage: `
                    radial-gradient(at 50% 0%, #7E5BFF, transparent 45%)
                  `
                }}></div>
                <div className="bg-[#110D27] w-[99%] h-[99%] rounded-full absolute top-[1px] flex items-center justify-center" style={{
                  backgroundImage: `
                    linear-gradient(to top, rgba(109, 72, 242, 1) -30%, transparent 30%)
                  `,
                }}>
                  <div className="p-[1px] h-[60%] w-[60%] rounded-full bg-[linear-gradient(to_bottom,_#6D48F2_0%,_#00000000_35%)] to-0%">
                    <div className=" w-full h-full rounded-full bg-[linear-gradient(to_bottom,_#120d28d1_0%,_#00000000_45%)] to-0%"></div>
                  </div>
                  <div className="w-18 h-18 rounded-full blur-md bg-[#6D48F2]/13 absolute bottom-[2rem] right-[5rem]" />
                  <div className="w-18 h-18 rounded-full blur-md bg-[#6D48F2]/13 absolute bottom-[2rem] left-[2rem]" />
                  <div className="w-16 h-16 rounded-full border border-[#9091F3] absolute"></div>
                  <div className="absolute w-[24rem] h-16 rounded-xl flex gap-8 items-center justify-center" >
                    <div className="w-full h-full absolute rounded-xl z-20" style={{
                      backgroundImage: `
                        linear-gradient(to right, #0F0B28 3%, transparent 30%),
                        linear-gradient(to left, #0F0B28 3%, transparent 30%)
                      `
                    }}/>
                    <Person_Icon_Container imgSrc="/templanding/mini_assets/person.svg" />
                    <Person_Icon_Container imgSrc="/templanding/mini_assets/person.svg" />
                    <Person_Icon_Container imgSrc="/templanding/mini_assets/person.svg" />
                    <Person_Icon_Container imgSrc="/templanding/mini_assets/person.svg" />
                    <Person_Icon_Container imgSrc="/templanding/mini_assets/person.svg" />
                  </div>
                  <Image
                    className="absolute -top-4"
                    alt="lineart"
                    src="/templanding/svgs/lineart-in-circle.svg"
                    width={75}
                    height={290}
                  />
                </div>
                <div className="rounded-sm w-10 h-3 absolute bottom-[3.6rem] bg-radial-[at_10%_15%] from-[#9E73F4]/60 to-transparent/5 to-75% p-[1px] shadow-[0px_9px_8px_0px_rgba(0,_0,_0,_0.25)]">
                  <div className="w-full h-full bg-[#211357] rounded-[3px] relative flex items-center justify-center"><div className="block w-[26px] h-[4px] bg-[#B4A1FA] rounded-full"></div></div>
                </div>
              </div>
  
              <div className="flex flex-col gap-1">
                <div className="text-base font-medium text-white">Find the Perfect Creative Talent</div>
                <div className="text-sm w-[98%] leading-[20px] font-normal text-[#C4C5C8]">Discover and connect with skilled talents, from video editors to social media strategists, who bring your vision to life.</div>
              </div>
            </div> 
  
            <div className="fc-2 overflow-hidden flex flex-col justify-end relative px-7 py-[22px] min-h-[30rem] w-[26rem] md:w-[23rem] lg:w-[26rem] bg-[#0E0C36] rounded-2xl border border-[#363151]">
              <div className="h-[72%] w-full rounded-t-2xl absolute left-0 top-0">
                <Image
                  className="w-full h-full rounded-t-2xl"
                  alt="lineart"
                  src="/templanding/abstract/feature-card-2-bg.png"
                  width={320}
                  height={221}
                />
              </div>
              {/* job-card */}
              <Image
                className="z-10 absolute top-12 -right-28 mask-r-to-60%"
                alt="lineart"
                src="/templanding/abstract/job-card-sm.png"
                width={320}
                height={221}
              />
              <Image
                className="z-10 absolute top-48 -left-20 mask-l-to-70%"
                alt="lineart"
                src="/templanding/abstract/job-card-sm.png"
                width={320}
                height={221}
              />
              <div className="flex flex-col gap-1 mb-[1.3rem]">
                <div className="text-base font-medium text-white">Sophisticated Job Listings</div>
                <div className="text-sm w-[98%] leading-[20px] font-normal text-[#C4C5C8]">Specify time zone, benefits, and skill requirements to get in the front  of the most relevant candidates</div>
              </div>
            </div>
  
            <div className="fc-3 overflow-hidden flex flex-col items-center justify-end relative px-7 py-[22px] w-[26rem] min-h-[30rem] md:w-[23rem] lg:w-[26rem] bg-[#0F0B28] rounded-2xl border border-[#363151] md:col-span-2 md:place-self-center xl:col-span-1 xl:place-self-end">
              <Image
                className="z-10 absolute top-1 right-0"
                alt="lineart"
                src="/templanding/abstract/bg-visuals.png"
                width={673}
                height={379}
              />
              <div className="absolute top-[20%] z-10">
                <div className="w-40 h-40 rounded-full bg-[#4E16F6]  blur-3xl flex items-center justify-center"></div>
                <div className="w-28 h-28 z-20 rounded-2xl bg-[#4E16F6] absolute top-6 left-6 blur-xs"></div>
                <div className="w-[108px] h-[108px] z-20 rounded-2xl bg-[#15112D] border border-[#8e7ffe] absolute top-[1.7rem] left-[1.7rem] flex items-center justify-center">
                  <div className="w-[70%] h-[70%] border border-[#515050] bg-[#0B0821] rounded-[10px] shadow-[0px_2px_12px_5px_rgba(0,_0,_0,_0.35)] flex items-center justify-center">
                    <img
                      className="w-[28px] h-[28px]"
                      alt="ContentSociety Logo"
                      src="/templanding/mini_assets/cs-logo.svg"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-base font-medium text-white">Showcase Your Brand & Vision</div>
                <div className="text-sm w-[98%] leading-[20px] font-normal text-[#C4C5C8]">Share your company&apos;s culture, creative process, and tools to attract professionals who align with your workflow and values.</div>
              </div>
            </div>
          </div>
        </section>
  
        {/* Testimonials section */}
        <section className="flex flex-col items-center w-full min-h-screen overflow-hidden">
          <SectionHeading
            mainHeading="Find & Collaborate with Top Creative Talent"
            subHeading="From video editors to content strategists, agencies and brands have found the project creative minds to bring their vision to life"
          />
          <div className="testimonials-container mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-[85%] lg:w-[75%] max-w-7xl">
            {testimonialsData.map((item, idx) => (
              <div id="card" key={idx} className="px-7 py-6 bg-[#0F0B28] flex flex-col gap-3 border border-[#26176A] rounded-[6px]">
                <div className="w-full flex justify-between items-center">
                  <div className="flex gap-3">
                    <Image
                      className=""
                      alt="person-feedback"
                      src="/templanding/abstract/person-feedback.png"
                      width={45}
                      height={45}
                    />
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-normal text-[#9DA7B3]">Anon</p>
                      <p className="text-xs font-normal text-[#737678]">@anon</p>
                    </div>
                  </div>
                  
                  <div className="px-4 py-[2px] h-fit bg-inherit border border-[#23105A] rounded-full text-sm font-normal">Creator</div>
                </div>
  
                <p className="text-sm font-normal text-[#9DA7B3] ">{item.feedbackText}</p>
                <div className="w-full flex justify-between items-center">
                  <span className="text-sm font-normal text-[#737678]">{item.createdAt}</span>
                  <div className="flex gap-1">
                    <Image
                      className=""
                      alt="star"
                      src="/templanding/svgs/purple-star.svg"
                      width={12}
                      height={12}
                    />
                    <span className="text-xs">4.4</span>
                  </div>
                </div>
              </div>
            ))}
              
          </div>
        </section>
  
        {/* Footer -- add border when done - border-top  [#241B36]/90     */}
        <footer id="footer" className="flex flex-col items-center w-full min-h-[40vh]">
            <div className="max-w-7xl w-[85%] md:w-[75%] flex flex-col px-8 pt-6 pb-6 mt-16">
              <section aria-label="details" className="flex justify-between flex-col sm:flex-row gap-6 sm:gap-0">
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3 items-center">
                    <img
                      className="w-[36px] h-[36px]"
                      alt="ContentSociety Logo"
                      src="/templanding/mini_assets/cs-logo.svg"
                    />
                    <div className="font-bold text-white text-xl leading-[19px] [font-family:'Inter',Helvetica]">ContentSociety</div>
                  </div>
                  <span className="text-sm font-normal text-[#9DA7B3] w-60">The best place to find you next best hire for your content creation.</span>
                </div>
                <div className="flex gap-6">
                  <div className="flex flex-col gap-3">
                    <h2 className="text-base font-semibold text-white">Pages</h2>
                    <span className="footer-links">Pricing</span>
                    <span className="footer-links">Contact</span>
                    <span className="footer-links">Blog</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h2 className="text-base font-semibold text-white">Getting Started</h2>
                    <span className="footer-links">Sign Up</span>
                    <span className="footer-links">Forgot Password</span>
                    {/* <span className="footer-links">Change this ☝️ section</span> */}
                  </div>
                  <div className="flex flex-col gap-3">
                    <h2 className="text-base font-semibold text-white">Socials</h2>
                    <span className="footer-links">Twitter / X</span>
                    <span className="footer-links">Discort</span>
                  </div>
                </div>
              </section>
              <div className="w-full mt-6">
                <div className="h-px bg-[#241B36]/90 mb-4"></div>
                <div className="flex justify-between select-none">
                  <div className="text-[#9DA7B3] text-xs font-normal">Copyright @ 2025 ContentSociety. All rights reserverd</div>
                  <div className="flex gap-11">
                    <span className="text-[#9DA7B3] text-xs font-normal">Privacy Policy</span>
                    <span className="text-[#9DA7B3] text-xs font-normal">Terms of services</span>
                  </div>
                </div>
              </div>
              <div className="w-full mt-5 relative">
                <div className="w-full glow-gradient h-[1px]"></div>
                <div className="w-full glow-gradient h-[1px] blur-[3px]"></div>
              </div>
              <div className="mt-8">
                <p className="text-[clamp(40px,8vw,152px)] 3xl:text-[152px] leading-[1.1] w-fit font-bold mx-auto bg-gradient-to-t from-[#1B1040]/0 to-[#271b59] to-[120%] bg-clip-text text-transparent">
                  ContentSociety
                </p>
              </div>
            </div>
        </footer>
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

const Person_Icon_Container = ({ imgSrc }: { imgSrc: string }) => {
  return (
    <figure className="w-[50px] h-[50px] z-10 rounded-full bg-[linear-gradient(to_top,_#19133A_30%,_#3F318F_100%)] border border-[#765EFF]/53 flex justify-center items-center">
      <Image
        className=""
        alt="lineart"
        src={imgSrc}
        width={20}
        height={20}
      />
    </figure>
  )
}