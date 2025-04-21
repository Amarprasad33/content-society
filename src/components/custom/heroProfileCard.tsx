import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function HeroProfileCard() {
    return (
        <Card className="h-fit bg-[#110d27] text-white rounded-3xl relative overflow-hidden border border-green-500">
            <CardContent className="py-8 px-8">

                <div className="flex items-center gap-4">
                    <Avatar className="w-[70px] h-[70px]">
                        <AvatarImage
                            src='/templanding/abstract/avatar.png'
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
                            <div className="relative w-[18px] h-[18px]">
                                <Image
                                    src={"/templanding/mini_assets/verification.svg"}
                                    alt="Verification"
                                    className="absolute w-full h-full"
                                    width={18}
                                    height={18}
                                />
                            </div>
                        </div>
                        <p className="[font-family:'Inter',Helvetica] font-medium text-[#6b6b6b] text-[18px]">
                            Script writer
                        </p>
                    </div>

                    <button className="w-[34px] h-[34px] flex items-center justify-center">
                        <img
                            src='/templanding/mini_assets/bookmark.svg'
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
                                src={'/templanding/mini_assets/bytesize-work.svg'}
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
                                <Image
                                    src={'/templanding/mini_assets/clock.svg'}
                                    alt="Experience"
                                    className="w-full h-full"
                                    width={18}
                                    height={18}
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
                                src={'/templanding/mini_assets/tdesign-money.svg'}
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
                                src={'/templanding/mini_assets/location.svg'}
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
    )
}