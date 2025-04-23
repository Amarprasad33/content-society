import Image from "next/image";

export default function SectionHeading({ mainHeading, subHeading }: { mainHeading: string, subHeading: string }) {
    return (
        <div className="mt-10 mb flex flex-col gap-3">
          <div className="relative mx-auto w-fit max-w-[64%] text-center">
            <figure className="w-4 h-4 rounded-full bg-gradient-to-t from-[#5C32F5] to-[#7268F6]/10 absolute top-4 -left-12">
              <div className="w-32 h-px bg-gradient-to-l from-white to-[#999999]/10 absolute top-[7px] right-6"></div>
            </figure>
            <div className="text-5xl font-semibold z-10 relative">{mainHeading}</div>
            <figure className="w-4 h-4 rounded-full bg-gradient-to-t from-[#5C32F5] to-[#7268F6]/10 absolute z-10 top-4 -right-12">
              <div className="w-32 h-px bg-gradient-to-r from-white to-[#999999]/10 absolute top-[7px] left-6"></div>
            </figure>
            <Image
              className="absolute z-0 -right-22 -top-2"
              alt="Textured background"
              src="/templanding/abstract/dots-light.png"
              width={100}
              height={100}
            />
            <Image
              className="absolute z-0 -left-23 -top-2"
              alt="Textured background"
              src="/templanding/abstract/dots-light.png"
              width={100}
              height={100}
            />
          </div>
          <p className="w-[85%] mx-auto [font-family:'Inter',Helvetica] font-normal text-[#9da7b3] text-base text-center leading-[24px]">
            {subHeading}
          </p>
        </div>
    )
}