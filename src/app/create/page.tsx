"use client"
import JobForm from "@/components/job-form";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
// import { motion } from 'motion/react';
import Image from "next/image";

export default function Create() {
  const { toast } = useToast();
  const { data: session, status } = useSession();
  const pathName = usePathname();

  // Animation for dots traveling clockwise
  // const clockwiseDotAnimation = {
  //   animate: {
  //     offsetDistance: ["0%", "100%"],
  //     transition: {
  //       duration: 10,
  //       ease: "linear",
  //       repeat: Infinity
  //     }
  //   }
  // };

  // // Animation for dots traveling counter-clockwise
  // const counterClockwiseDotAnimation = {
  //   animate: {
  //     offsetDistance: ["100%", "0%"],
  //     transition: {
  //       duration: 10,
  //       ease: "linear",
  //       repeat: Infinity
  //     }
  //   }
  // };


  useEffect(() => {
    console.log("SESSION ->", session)
    if (session?.user?.role === "APPLICANT") {
      console.log("APPLICANT USER")
      toast({
        variant: 'destructive',
        title: "Access Denied",
        description: "You have created a profile. To create a job, try with a different account.",
      })
      return redirect("/");
    }
    // console.log("session", session);
  }, [session, toast])
  if (status === "loading") {
    return <div>Loading...</div>
  }
  if (status === "unauthenticated") {
    toast({
      variant: 'destructive',
      title: "You are not signed in! Please sign in to create a job.",
    });
    // return redirect("/signin");
    return redirect(`/signin?callbackUrl=${encodeURIComponent(pathName)}`);
  }
  return (
    <div className="w-full flex flex-col items-center pt-10 bg-[#04040F]">
      <Image
        className="absolute w-full h-[70%] top-0"
        alt="lineart"
        src="/images/create/soft-lights.png"
        width={880}
        height={944}
      />
      <div className="h-fit w-fit absolute -top-[65px]">
        <svg width="1067" height="596" viewBox="0 0 1067 596" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="532.5" cy="61.5" r="487" stroke="url(#paint0_linear_589_273)" stroke-dasharray="12 12" />
          <circle cx="532.5" cy="53.5" r="451" stroke="url(#paint1_linear_589_273)" stroke-dasharray="12 12" />
          <circle cx="533" cy="61" r="405.5" stroke="url(#paint2_linear_589_273)" stroke-dasharray="12 12" />
          <circle cx="533.5" cy="62.5" r="533" stroke="url(#paint3_linear_589_273)" stroke-dasharray="12 12" />
          <g filter="url(#filter0_f_589_273)">
            <circle cx="196.5" cy="286.5" r="12.5" stroke="#4F3FAF" />
          </g>
          <g filter="url(#filter1_f_589_273)">
            <circle cx="196.5" cy="286.5" r="13" stroke="#791FDF" />
          </g>
          <circle cx="196.5" cy="286.5" r="12.5" fill="url(#paint4_linear_589_273)" />
          <circle cx="196.5" cy="286.5" r="12" stroke="#765EFF" stroke-opacity="0.53" />
          <path d="M194.55 280.167H199.45C201.317 280.167 202.833 281.683 202.833 283.55V288.45C202.833 289.347 202.477 290.208 201.842 290.842C201.208 291.477 200.347 291.833 199.45 291.833H194.55C192.683 291.833 191.167 290.317 191.167 288.45V283.55C191.167 282.653 191.523 281.792 192.157 281.158C192.792 280.523 193.653 280.167 194.55 280.167ZM194.433 281.333C193.876 281.333 193.342 281.555 192.948 281.948C192.554 282.342 192.333 282.876 192.333 283.433V288.567C192.333 289.727 193.272 290.667 194.433 290.667H199.567C200.123 290.667 200.658 290.445 201.051 290.052C201.445 289.658 201.667 289.124 201.667 288.567V283.433C201.667 282.272 200.727 281.333 199.567 281.333H194.433ZM200.062 282.208C200.256 282.208 200.441 282.285 200.578 282.422C200.715 282.559 200.792 282.744 200.792 282.937C200.792 283.131 200.715 283.316 200.578 283.453C200.441 283.59 200.256 283.667 200.062 283.667C199.869 283.667 199.683 283.59 199.547 283.453C199.41 283.316 199.333 283.131 199.333 282.937C199.333 282.744 199.41 282.559 199.547 282.422C199.683 282.285 199.869 282.208 200.062 282.208ZM197 283.083C197.773 283.083 198.515 283.391 199.062 283.938C199.609 284.485 199.917 285.226 199.917 286C199.917 286.774 199.609 287.515 199.062 288.062C198.515 288.609 197.773 288.917 197 288.917C196.226 288.917 195.484 288.609 194.937 288.062C194.39 287.515 194.083 286.774 194.083 286C194.083 285.226 194.39 284.485 194.937 283.938C195.484 283.391 196.226 283.083 197 283.083ZM197 284.25C196.536 284.25 196.091 284.434 195.762 284.763C195.434 285.091 195.25 285.536 195.25 286C195.25 286.464 195.434 286.909 195.762 287.237C196.091 287.566 196.536 287.75 197 287.75C197.464 287.75 197.909 287.566 198.237 287.237C198.565 286.909 198.75 286.464 198.75 286C198.75 285.536 198.565 285.091 198.237 284.763C197.909 284.434 197.464 284.25 197 284.25Z" fill="#9091F3" />
          <g filter="url(#filter2_f_589_273)">
            <circle cx="862.5" cy="360.5" r="12.5" stroke="#4F3FAF" />
          </g>
          <g filter="url(#filter3_f_589_273)">
            <circle cx="862.5" cy="360.5" r="13" stroke="#791FDF" />
          </g>
          <circle cx="862.5" cy="360.5" r="12.5" fill="url(#paint5_linear_589_273)" />
          <circle cx="862.5" cy="360.5" r="12" stroke="#765EFF" stroke-opacity="0.53" />
          <path d="M862.5 355.5C863.034 355.5 863.582 355.514 864.114 355.536L864.741 355.566L865.342 355.602L865.904 355.64L866.418 355.68C866.976 355.722 867.5 355.96 867.9 356.352C868.299 356.743 868.548 357.263 868.602 357.819L868.627 358.085L868.674 358.654C868.717 359.243 868.75 359.886 868.75 360.5C868.75 361.114 868.717 361.757 868.674 362.346L868.627 362.915L868.602 363.181C868.548 363.737 868.299 364.257 867.9 364.649C867.5 365.04 866.975 365.278 866.417 365.32L865.905 365.359L865.343 365.398L864.741 365.434L864.114 365.464C863.576 365.487 863.038 365.499 862.5 365.5C861.962 365.499 861.424 365.487 860.886 365.464L860.259 365.434L859.658 365.398L859.096 365.359L858.582 365.32C858.024 365.278 857.499 365.04 857.1 364.648C856.701 364.257 856.452 363.737 856.398 363.181L856.373 362.915L856.326 362.346C856.279 361.732 856.253 361.116 856.25 360.5C856.25 359.886 856.282 359.243 856.326 358.654L856.373 358.085L856.398 357.819C856.452 357.263 856.7 356.743 857.1 356.352C857.499 355.96 858.024 355.723 858.581 355.68L859.094 355.64L859.657 355.602L860.258 355.566L860.886 355.536C861.423 355.513 861.962 355.501 862.5 355.5ZM862.5 356.75C861.984 356.75 861.454 356.764 860.938 356.785L860.326 356.814L859.739 356.849L859.188 356.886L858.683 356.926C858.418 356.944 858.167 357.056 857.977 357.242C857.786 357.428 857.667 357.675 857.642 357.94C857.569 358.696 857.5 359.636 857.5 360.5C857.5 361.364 857.569 362.304 857.642 363.06C857.695 363.605 858.128 364.029 858.683 364.074L859.188 364.113L859.739 364.151L860.326 364.186L860.938 364.215C861.454 364.236 861.984 364.25 862.5 364.25C863.016 364.25 863.546 364.236 864.062 364.215L864.674 364.186L865.261 364.151L865.812 364.114L866.317 364.074C866.582 364.056 866.833 363.944 867.023 363.758C867.214 363.572 867.333 363.325 867.358 363.06C867.431 362.304 867.5 361.364 867.5 360.5C867.5 359.636 867.431 358.696 867.358 357.94C867.333 357.675 867.214 357.428 867.023 357.242C866.833 357.056 866.582 356.944 866.317 356.926L865.812 356.887L865.261 356.849L864.674 356.814L864.062 356.785C863.542 356.763 863.021 356.751 862.5 356.75ZM861.25 358.984C861.25 358.923 861.265 358.863 861.293 358.809C861.322 358.755 861.363 358.709 861.414 358.674C861.464 358.64 861.522 358.618 861.583 358.612C861.644 358.605 861.705 358.613 861.762 358.635L861.812 358.66L864.438 360.175C864.49 360.205 864.534 360.247 864.566 360.298C864.599 360.349 864.618 360.407 864.624 360.467C864.629 360.528 864.62 360.588 864.596 360.644C864.573 360.699 864.537 360.749 864.491 360.787L864.438 360.825L861.812 362.341C861.76 362.371 861.7 362.388 861.639 362.391C861.578 362.393 861.517 362.381 861.462 362.354C861.407 362.328 861.359 362.288 861.323 362.239C861.287 362.19 861.263 362.132 861.254 362.072L861.25 362.016V358.984Z" fill="#9091F3" />
          <g filter="url(#filter4_f_589_273)">
            <circle cx="1008.5" cy="307.5" r="12.5" stroke="#4F3FAF" />
          </g>
          <g filter="url(#filter5_f_589_273)">
            <circle cx="1008.5" cy="307.5" r="13" stroke="#791FDF" />
          </g>
          <circle cx="1008.5" cy="307.5" r="12.5" fill="url(#paint6_linear_589_273)" />
          <circle cx="1008.5" cy="307.5" r="12" stroke="#765EFF" stroke-opacity="0.53" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1007.56 302.368C1008.17 301.752 1009 301.406 1009.88 301.406H1011.56C1011.69 301.406 1011.81 301.456 1011.89 301.544C1011.98 301.631 1012.03 301.751 1012.03 301.875V304.125C1012.03 304.249 1011.98 304.369 1011.89 304.456C1011.81 304.544 1011.69 304.594 1011.56 304.594H1009.88C1009.86 304.594 1009.85 304.596 1009.84 304.601C1009.83 304.606 1009.82 304.613 1009.81 304.621C1009.8 304.63 1009.79 304.64 1009.79 304.652C1009.78 304.663 1009.78 304.675 1009.78 304.688V305.906H1011.56C1011.63 305.906 1011.7 305.922 1011.77 305.954C1011.83 305.985 1011.89 306.03 1011.93 306.086C1011.98 306.143 1012.01 306.208 1012.02 306.278C1012.04 306.347 1012.03 306.42 1012.02 306.489L1011.46 308.739C1011.43 308.84 1011.37 308.93 1011.29 308.995C1011.21 309.059 1011.1 309.094 1011 309.094H1009.78V313.125C1009.78 313.249 1009.73 313.369 1009.64 313.456C1009.56 313.544 1009.44 313.594 1009.31 313.594H1007.06C1006.94 313.594 1006.82 313.544 1006.73 313.456C1006.64 313.369 1006.59 313.249 1006.59 313.125V309.094H1005.38C1005.25 309.094 1005.13 309.044 1005.04 308.956C1004.96 308.869 1004.91 308.749 1004.91 308.625V306.375C1004.91 306.313 1004.92 306.252 1004.94 306.196C1004.97 306.139 1005 306.087 1005.04 306.044C1005.09 306 1005.14 305.965 1005.2 305.942C1005.25 305.918 1005.31 305.906 1005.38 305.906H1006.59V304.688C1006.59 303.817 1006.94 302.983 1007.56 302.368ZM1009.88 302.344C1009.25 302.344 1008.66 302.591 1008.22 303.03C1007.78 303.47 1007.53 304.066 1007.53 304.688V306.375C1007.53 306.499 1007.48 306.619 1007.39 306.706C1007.31 306.794 1007.19 306.844 1007.06 306.844H1005.84V308.156H1007.06C1007.19 308.156 1007.31 308.206 1007.39 308.294C1007.48 308.381 1007.53 308.501 1007.53 308.625V312.656H1008.84V308.625C1008.84 308.501 1008.89 308.381 1008.98 308.294C1009.07 308.206 1009.19 308.156 1009.31 308.156H1010.63L1010.96 306.844H1009.31C1009.19 306.844 1009.07 306.794 1008.98 306.706C1008.89 306.619 1008.84 306.499 1008.84 306.375V304.688C1008.84 304.414 1008.95 304.152 1009.15 303.958C1009.34 303.765 1009.6 303.656 1009.88 303.656H1011.09V302.344H1009.88Z" fill="#9091F3" />
          <g filter="url(#filter6_f_589_273)">
            <circle cx="56.5" cy="168.5" r="12.5" stroke="#4F3FAF" />
          </g>
          <g filter="url(#filter7_f_589_273)">
            <circle cx="56.5" cy="168.5" r="13" stroke="#791FDF" />
          </g>
          <circle cx="56.5" cy="168.5" r="12.5" fill="url(#paint7_linear_589_273)" />
          <circle cx="56.5" cy="168.5" r="12" stroke="#765EFF" stroke-opacity="0.53" />
          <g clip-path="url(#clip0_589_273)">
            <mask id="mask0_589_273" style={{maskType:'luminance'}} maskUnits="userSpaceOnUse" x="51" y="163" width="11" height="11">
              <path d="M51 163H62V174H51V163Z" fill="white" />
            </mask>
            <g mask="url(#mask0_589_273)">
              <path d="M59.6625 163.515H61.3494L57.6644 167.738L62 173.485H58.6057L55.9453 170L52.9046 173.485H51.2161L55.1572 168.967L51 163.516H54.4807L56.8819 166.701L59.6625 163.515ZM59.0693 172.473H60.0043L53.97 164.475H52.9674L59.0693 172.473Z" fill="#9091F3" />
            </g>
          </g>
          <defs>
            <filter id="filter0_f_589_273" x="182.5" y="272.5" width="28" height="28" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur_589_273" />
            </filter>
            <filter id="filter1_f_589_273" x="180" y="270" width="33" height="33" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="1.5" result="effect1_foregroundBlur_589_273" />
            </filter>
            <filter id="filter2_f_589_273" x="848.5" y="346.5" width="28" height="28" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur_589_273" />
            </filter>
            <filter id="filter3_f_589_273" x="846" y="344" width="33" height="33" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="1.5" result="effect1_foregroundBlur_589_273" />
            </filter>
            <filter id="filter4_f_589_273" x="994.5" y="293.5" width="28" height="28" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur_589_273" />
            </filter>
            <filter id="filter5_f_589_273" x="992" y="291" width="33" height="33" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="1.5" result="effect1_foregroundBlur_589_273" />
            </filter>
            <filter id="filter6_f_589_273" x="42.5" y="154.5" width="28" height="28" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur_589_273" />
            </filter>
            <filter id="filter7_f_589_273" x="40" y="152" width="33" height="33" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="1.5" result="effect1_foregroundBlur_589_273" />
            </filter>
            <linearGradient id="paint0_linear_589_273" x1="532.5" y1="-426" x2="532.5" y2="549" gradientUnits="userSpaceOnUse">
              <stop offset="0.545" stop-color="#A972D9" stop-opacity="0" />
              <stop offset="1" stop-color="#593C73" />
            </linearGradient>
            <linearGradient id="paint1_linear_589_273" x1="532.5" y1="-398" x2="532.5" y2="505" gradientUnits="userSpaceOnUse">
              <stop offset="0.545" stop-color="#A972D9" stop-opacity="0" />
              <stop offset="1" stop-color="#593C73" />
            </linearGradient>
            <linearGradient id="paint2_linear_589_273" x1="533" y1="-345" x2="533" y2="467" gradientUnits="userSpaceOnUse">
              <stop offset="0.545" stop-color="#A972D9" stop-opacity="0" />
              <stop offset="1" stop-color="#593C73" />
            </linearGradient>
            <linearGradient id="paint3_linear_589_273" x1="533.5" y1="-471" x2="533.5" y2="596" gradientUnits="userSpaceOnUse">
              <stop offset="0.545" stop-color="#A972D9" stop-opacity="0" />
              <stop offset="1" stop-color="#593C73" />
            </linearGradient>
            <linearGradient id="paint4_linear_589_273" x1="196.838" y1="299" x2="197.514" y2="259.135" gradientUnits="userSpaceOnUse">
              <stop offset="0.209718" stop-color="#19133A" />
              <stop offset="1" stop-color="#3F318F" />
            </linearGradient>
            <linearGradient id="paint5_linear_589_273" x1="862.838" y1="373" x2="863.514" y2="333.135" gradientUnits="userSpaceOnUse">
              <stop offset="0.209718" stop-color="#19133A" />
              <stop offset="1" stop-color="#3F318F" />
            </linearGradient>
            <linearGradient id="paint6_linear_589_273" x1="1008.84" y1="320" x2="1009.51" y2="280.135" gradientUnits="userSpaceOnUse">
              <stop offset="0.209718" stop-color="#19133A" />
              <stop offset="1" stop-color="#3F318F" />
            </linearGradient>
            <linearGradient id="paint7_linear_589_273" x1="56.8378" y1="181" x2="57.5135" y2="141.135" gradientUnits="userSpaceOnUse">
              <stop offset="0.209718" stop-color="#19133A" />
              <stop offset="1" stop-color="#3F318F" />
            </linearGradient>
            <clipPath id="clip0_589_273">
              <rect width="11" height="11" fill="white" transform="translate(51 163)" />
            </clipPath>
          </defs>
        </svg>

      </div>
      <div className="flex flex-col gap-4 mt-8 w-full justify-center items-center mt-32">
        <h1 className="text-5xl font-semibold text-white mb-[3.5rem]">
          <span>Post a</span>
          <span className="[font-family:'Inter',Helvetica] ml-3 bg-linear-to-r from-[#F17945] via-[#A531E8] to-[#7431E8] bg-clip-text text-transparent">job</span>
        </h1>
        <JobForm />
      </div>
    </div>
  )
}