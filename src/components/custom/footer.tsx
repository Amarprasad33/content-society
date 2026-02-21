import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="flex flex-col items-center w-full min-h-[40vh]"
    >
      <div className="max-w-7xl w-[85%] md:w-[75%] flex flex-col px-8 pt-6 pb-6 mt-16">
        <section
          aria-label="details"
          className="flex justify-between flex-col sm:flex-row gap-6 sm:gap-0"
        >
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 items-center">
              <img
                className="w-[36px] h-[36px]"
                alt="ContentSociety Logo"
                src="/templanding/mini_assets/cs-logo.svg"
              />
              <div className="font-bold text-white text-xl leading-[19px] [font-family:'Inter',Helvetica]">
                ContentSociety
              </div>
            </div>
            <span className="text-sm font-normal text-[#9DA7B3] w-60">
              The best place to find you next best hire for your content
              creation.
            </span>
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col gap-3">
              <h2 className="text-base font-semibold text-white">Pages</h2>
              <Link href="/pricing" className="footer-links">
                Pricing
              </Link>
              <span className="footer-links">Contact</span>
              <span className="footer-links">Blog</span>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-base font-semibold text-white">
                Getting Started
              </h2>
              <Link href="/signin" className="footer-links">
                Sign Up
              </Link>
              <span className="footer-links">Forgot Password</span>
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
            <div className="text-[#9DA7B3] text-xs font-normal">
              Copyright @ 2025 ContentSociety. All rights reserverd
            </div>
            <div className="flex gap-11">
              <span className="text-[#9DA7B3] text-xs font-normal">
                Privacy Policy
              </span>
              <span className="text-[#9DA7B3] text-xs font-normal">
                Terms of services
              </span>
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
  );
}
