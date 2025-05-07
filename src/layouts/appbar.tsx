"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Appbar() {
    const {data: session, status} = useSession();
    const [currentPath, setCurrentPath] = useState('/');
    // const currentPath = "/jobs"
    const router = useRouter();

    console.log("Data-", session, status);

    // if (status === "loading") {
    //     return (
    //         <div className="border-b border-zinc-800 sticky top-0 z-50 bg-black/50 backdrop-blur-xs p-[14px] flex justify-between">
    //             <Skeleton className="h-6 w-48 bg-gray-600 rounded-full"></Skeleton>
    //             <div className="flex gap-2">
    //                 <Skeleton className="h-6 w-16 bg-gray-600 rounded-full"></Skeleton>
    //                 <Skeleton className="h-6 w-16 bg-gray-600 rounded-full"></Skeleton>
    //                 <Skeleton className="h-6 w-16 bg-gray-600 rounded-full"></Skeleton>
    //                 <Skeleton className="h-6 w-16 bg-gray-600 rounded-full"></Skeleton>
    //                 <Skeleton className="h-6 w-16 bg-gray-600 rounded-full"></Skeleton>
    //             </div>
    //             <div className="flex gap-2">
    //                 <Skeleton className="h-6 w-20 bg-gray-600 rounded-xl"></Skeleton>
    //                 <Skeleton className="h-6 w-20 bg-gray-600 rounded-xl"></Skeleton>
    //             </div>
    //         </div>
    //     )
    //     // Show loading state while the session is being refetched
    // }

    const navigation = [
        { name: "Home", href: "/" },
        { name: "Jobs", href: "/jobs" },
        { name: "Pricing", href: "/pricing" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
      ]

    return (
        <header className="border-b border-zinc-800 sticky top-0 z-50 bg-[#0B051D]/50 backdrop-blur-sm">
            <div className="container flex-wrap mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold text-white text-base leading-[19px] [font-family:'Inter',Helvetica]"  onClick={() => setCurrentPath('/')}>
                    <div className="w-8 h-8">
                        <img
                            className="w-[26px] h-[26px] ml-[2px]"
                            alt="ContentSociety Logo"
                            src="/templanding/mini_assets/cs-logo.svg"
                        />
                    </div>
                    <span>Content Society </span>
                </Link>
                <nav className="px-1.5 py-1.5 rounded-full">
                    <ul className="flex items-center space-x-1">
                        {navigation.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors hover:text-white ${
                                        currentPath === item.href ? "text-white" : "text-zinc-400"
                                    }`}
                                    onClick={() => setCurrentPath(item.href)}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="flex gap-2 items-center">
                    {session?.user && 
                        <Button variant="outline" className="bg-white text-black border-black hover:bg-slate-30"
                            onClick={() => {
                                signOut({ 
                                    callbackUrl: "/",
                                    redirect: true, 
                                });
                                router.refresh();
                            }}
                        >
                            Logout                
                        </Button>
                    }
                     {session?.user?.image? 
                        <div className="cursor-pointer"><Image className="rounded-full" src={session?.user?.image || '' } width={30} height={30} alt="profile-image" /></div>
                        :
                        // Should check if user has uploaded a profile image, if yes show that or show the first letter of the name
                        session?.user && <div className="cursor-pointer">
                            <div className="rounded-full w-[30px] h-[30px] bg-slate-700 flex justify-center items-center">{session?.user?.name?.substring(0,1).toUpperCase()}</div>
                        </div>
                        
                    }
                    {
                        !session?.user && <Button onClick={()  => router.push("/signin")} size="sm" variant="outline" className="text-black border-primary hover:bg-slate-300 hover:text-black">
                            <span  className="">Sign In</span>                
                        </Button>
                    }
                </div>
            </div>
        </header>
    )
}

export function Skeleton({
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>) {
    return (
      <div
        className={cn("animate-pulse rounded-md bg-primary/10", className)}
        {...props}
      />
    )
}