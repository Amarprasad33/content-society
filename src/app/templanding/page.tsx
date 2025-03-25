


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

      

      <section className="flex flex-col items-center w-full h-[100vh] relative">
        <div className="relative w-full h-full max-w-[1920px] flex flex-col gap-5 border border-red-500">
          
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
            src="/templanding/abstract/textured-background.png"
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
                src="/templanding/abstract/circle-shine.png" 
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
                src="/templanding/abstract/circle-glow.png"
                width={1820}
                height={400}
              /> */}
              {/* Profile card */}
              <div className="absolute bottom-8 right-2">
                <Card className="h-fit bg-[#110d27] text-white rounded-3xl relative overflow-hidden border border-green-500">
                  <CardContent className="py-8 px-8">

                    <div className="flex items-center gap-4">
                      <Avatar className="w-[70px] h-[70px]">
                        <AvatarImage
                          src='/templanding/ellipse-4.png'
                          alt='Ava Scott'
                        />
                        {/* Should be the first char. of the name */}
                        <AvatarFallback>
                          A
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="[font-family:'Inter',Helvetica] font-medium text-white text-[18px]">
                            Ava Scott
                          </h3>
                          <div className="relative w-[27px] h-[27px]">
                            <Image
                              src={"/templanding/vefication.svg"}
                              alt="Verification"
                              className="absolute w-full h-full"
                              width={27}
                              height={27}
                            />
                          </div>
                        </div>
                        <p className="[font-family:'Inter',Helvetica] font-medium text-[#6b6b6b] text-[18px]">
                          Script writer
                        </p>
                      </div>

                      <button className="w-[34px] h-[34px] flex items-center justify-center">
                        <img
                          src='/templanding/material-symbols-bookmark-outline-rounded.svg'
                          alt="Bookmark"
                          className="w-full h-full"
                        />
                      </button>
                    </div>

                    <div className="pt-8 space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <Badge
                          variant="outline"
                          className="h-7 bg-[#7171712e] rounded-[25px] border-[#aeaeae] shadow-[inset_4px_7px_13.5px_#0000006b] px-3 py-1"
                        >
                          <img
                            src={'/templanding/bytesize-work.svg'}
                            alt="Work type"
                            className="w-5 h-5 mr-2"
                          />
                          <span className="[font-family:'Inter',Helvetica] font-normal text-white text-sm">
                            Full-time
                          </span>
                        </Badge>

                        <Badge
                          variant="outline"
                          className="h-7 bg-[#7171712e] rounded-[25px] border-[#aeaeae] shadow-[inset_4px_7px_13.5px_#0000006b] px-3 py-1"
                        >
                          <div className="w-4 h-4 mr-2">
                            <img
                              src={'/templanding/group-4.png'}
                              alt="Experience"
                              className="w-full h-full"
                            />
                          </div>
                          <span className="[font-family:'Inter',Helvetica] font-normal text-white text-sm">
                            3+ Years
                          </span>
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge
                          variant="outline"
                          className="h-7 bg-[#7171712e] rounded-[25px] border-[#aeaeae] shadow-[inset_4px_7px_13.5px_#0000006b] px-3 py-1"
                        >
                          <img
                            src={'/templanding/tdesign-money.svg'}
                            alt="Rate"
                            className="w-5 h-5 mr-2"
                          />
                          <span className="[font-family:'Inter',Helvetica] font-normal text-white text-sm">
                            $60/hr
                          </span>
                          <div className="w-4 h-4 mx-1 flex items-center justify-center">
                            <div className="w-[7px] h-[7px] bg-white rounded-[3.5px]"></div>
                          </div>
                          <span className="[font-family:'Inter',Helvetica] font-normal text-white text-sm">
                            Negotiable
                          </span>
                        </Badge>

                        <Badge
                          variant="outline"
                          className="h-7 bg-[#7171712e] rounded-[25px] border-[#aeaeae] shadow-[inset_4px_7px_13.5px_#0000006b] px-3 py-1"
                        >
                          <img
                            src={'/templanding/weui-location-outlined-1.svg'}
                            alt="Location"
                            className="w-5 h-5 mr-2"
                          />
                          <span className="[font-family:'Inter',Helvetica] font-normal text-white text-sm">
                            Onsite: CA, LA
                          </span>
                        </Badge>
                      </div>
                    </div>

                    {/* Separator */}
                    <div className="py-8">
                      <div className="w-full h-[0.1rem] bg-white/30" />
                    </div>

                    {/* Actino Button */}
                    <div className="flex flex-col items-center gap-4">
                      <Button className="w-[200px] h-10 bg-[#2d23634f] rounded-[58px] text-white hover:bg-[#2d2363] relative overflow-hidden">
                        <div className="absolute w-[145px] h-[38px] top-[-40px] left-[1.7rem] bg-[#7533c7] rounded-[103px/19px] blur-[18.15px]"></div>
                        <div className="absolute w-[145px] h-[38px] bottom-[-36px] left-[1.7rem] bg-[#7533c7] rounded-[103px/19px] blur-[18.15px]"></div>
                        <span className="relative z-10 [font-family:'Inter',Helvetica] font-normal text-sm">
                          Hire
                        </span>
                      </Button>

                      <Button
                        variant="ghost"
                        className="w-[200px] h-10 rounded-[58px] [background:linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(153,153,153,1)_100%)] [-webkit-background-clip:text] bg-clip-text hover:bg-transparent"
                      >
                        <span className="[font-family:'Inter',Helvetica] font-normal text-sm">
                          Discuss
                        </span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          {/* <div className="w-[70%] h-40 -bottom-[5rem] z-20 rounded-full border absolute  left-[15%] border-purple-700 bg-radial from-[#6738B8] from-20% via-[#6221D1] to-[#380987] blur-[38px]"></div> */}
          
        </div>
      </section>
    </main> 
    
  );
}
