


import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";


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
                className="w-[26px] h-[26px] mt-[4px] ml-[2px]"
                alt="ContentSociety Logo"
                src="/group.png"
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

      

      <section className="flex flex-col items-center w-full h-[100vh] relative">
        <div className="relative w-full h-full max-w-[1920px] flex flex-col gap-5 border border-red-500 overflow-x-hidden">
          
          <div className="flex flex-col items-center justify-center text-center px-4 mt-[8rem] z-[1] border border-blue-400">
            <h1 className="w-full max-w-[900px] text-4xl lg:text-6xl [font-family:'Inter',Helvetica] font-semibold text-white leading-[60px]">
              Hire top talent for your
            </h1>
            <h1 className="[font-family:'Inter',Helvetica] font-semibold text-4xl lg:text-6xl leading-[70px] bg-gradient-to-r from-[#F0EEBD] via-[#F17945] to-[#7431E8] bg-clip-text text-transparent">
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
            src="/abstract/textured-background.png"
            width={1200}
            height={981}
          />
          {/* Radial glow */}
          <div className="z-10 mt-[2rem] w-full">
            <div className="relative flex h-full w-full border border-amber-500">
              <Image
                className="h-[490px] mx-auto z-1"
                // style={{'left': 'calc(100% - 98vw)'}}
                alt="circle shine"
                src="/abstract/circle-shine.png" 
                priority={true}
                placeholder='blur'
                blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMM5jszGQADqwHCQLH4TQAAAABJRU5ErkJggg=="
                width={1820}
                height={400}
              />
              {/* <Image
                className="w-full h-[429px] mx-auto absolute top-[3.4rem]"
                style={{'left': 'calc(100% - 96vw)'}}
                alt="Circle glow"
                src="/abstract/circle-glow.png"
                width={1820}
                height={400}
              /> */}
              {/* Profile card */}
              <div className="absolute bottom-2">
                <Card className="w-[483px] h-[518px] bg-[#110d27] rounded-3xl border-none relative overflow-hidden">
                  <CardContent className="p-0">
                    
                    {/* Profile Header */}
                    <div className="flex items-center p-6 gap-4">
                      <Avatar className="w-[100px] h-[100px]">
                        <AvatarImage
                          src='/ellipse-4.png'
                          alt='Ava Scott'
                        />
                        Should be the first char. of the name
                        <AvatarFallback>
                          A
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="[font-family:'Inter',Helvetica] font-medium text-white text-[22px]">
                            Ava Scott
                          </h3>
                          <div className="relative w-[27px] h-[27px]">
                            <img
                              src={"/star-1.svg"}
                              alt="Verification"
                              className="absolute w-full h-full"
                            />
                            <img
                              src='/qlementine-icons-check-tick-16-1.svg'
                              alt="Check"
                              className="absolute w-[18px] h-[18px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            />
                          </div>
                        </div>
                        <p className="[font-family:'Inter',Helvetica] font-medium text-[#6b6b6b] text-xl">
                          Script writer
                        </p>
                      </div>

                      <button className="w-[43px] h-[43px] flex items-center justify-center">
                        <img
                          src='/material-symbols-bookmark-outline-rounded.svg'
                          alt="Bookmark"
                          className="w-full h-full"
                        />
                      </button>
                    </div>

                    {/* Profile Details */}
                    <div className="px-6 pt-4 space-y-4">
                      <div className="flex flex-wrap gap-4">
                        <Badge
                          variant="outline"
                          className="h-8 bg-[#7171712e] rounded-[25px] border-[#aeaeae] shadow-[inset_4px_7px_13.5px_#0000006b] px-4 py-1.5"
                        >
                          <img
                            src={'/bytesize-work.svg'}
                            alt="Work type"
                            className="w-5 h-5 mr-2"
                          />
                          <span className="[font-family:'Inter',Helvetica] font-normal text-white text-base">
                            Full-time
                          </span>
                        </Badge>

                        <Badge
                          variant="outline"
                          className="h-8 bg-[#7171712e] rounded-[25px] border-[#aeaeae] shadow-[inset_4px_7px_13.5px_#0000006b] px-4 py-1.5"
                        >
                          <div className="w-4 h-4 mr-2">
                            <img
                              src={'/group-4.png'}
                              alt="Experience"
                              className="w-full h-full"
                            />
                          </div>
                          <span className="[font-family:'Inter',Helvetica] font-normal text-white text-base">
                            3+ Years
                          </span>
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-4">
                        <Badge
                          variant="outline"
                          className="h-8 bg-[#7171712e] rounded-[25px] border-[#aeaeae] shadow-[inset_4px_7px_13.5px_#0000006b] px-4 py-1.5"
                        >
                          <img
                            src={'/tdesign-money.svg'}
                            alt="Rate"
                            className="w-5 h-5 mr-2"
                          />
                          <span className="[font-family:'Inter',Helvetica] font-normal text-white text-base">
                            $60/hr
                          </span>
                          <div className="w-4 h-4 mx-1 flex items-center justify-center">
                            <div className="w-[7px] h-[7px] bg-white rounded-[3.5px]"></div>
                          </div>
                          <span className="[font-family:'Inter',Helvetica] font-normal text-white text-base">
                            Negotiable
                          </span>
                        </Badge>

                        <Badge
                          variant="outline"
                          className="h-8 bg-[#7171712e] rounded-[25px] border-[#aeaeae] shadow-[inset_4px_7px_13.5px_#0000006b] px-4 py-1.5"
                        >
                          <img
                            src={'/weui-location-outlined-1.svg'}
                            alt="Location"
                            className="w-5 h-5 mr-2"
                          />
                          <span className="[font-family:'Inter',Helvetica] font-normal text-white text-base">
                            Onsite: CA, LA
                          </span>
                        </Badge>
                      </div>
                    </div>

                    {/* Separator */}
                    <div className="px-6 pt-8">
                      <img
                        src='/line-1-2.svg'
                        alt="Separator"
                        className="w-full"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col items-center gap-4 pt-8">
                      <Button className="w-[243px] h-12 bg-[#2d23634f] rounded-[58px] text-white hover:bg-[#2d2363] relative overflow-hidden">
                        <div className="absolute w-[206px] h-[38px] top-[-30px] left-6 bg-[#7533c7] rounded-[103px/19px] blur-[18.15px]"></div>
                        <div className="absolute w-[206px] h-[38px] bottom-[-15px] left-6 bg-[#7533c7] rounded-[103px/19px] blur-[18.15px]"></div>
                        <span className="relative z-10 [font-family:'Inter',Helvetica] font-normal text-base">
                          Hire
                        </span>
                      </Button>

                      <Button
                        variant="ghost"
                        className="w-[243px] h-12 rounded-[58px] [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(153,153,153,1)_100%)] [-webkit-background-clip:text] bg-clip-text text-transparent hover:bg-transparent"
                      >
                        <span className="[font-family:'Inter',Helvetica] font-normal text-base">
                          Discuss
                        </span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="h-20 absolute bottom-1.5 z-50 w-20 bg-red-600">

              </div> 
            </div>
          </div>
          {/* <div className="w-[70%] h-40 -bottom-[5rem] z-20 rounded-full border absolute  left-[15%] border-purple-700 bg-radial from-[#6738B8] from-20% via-[#6221D1] to-[#380987] blur-[38px]"></div> */}
          
        </div>
      </section>
    </main> 
    
  );
}
