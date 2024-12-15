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

    if (status === "loading") {
        return (
            <div className="border-b border-zinc-800 sticky top-0 z-50 bg-black/50 backdrop-blur-sm p-[14px] flex justify-between">
                <Skeleton className="h-6 w-48 bg-gray-600 rounded-full"></Skeleton>
                <div className="flex gap-2">
                    <Skeleton className="h-6 w-16 bg-gray-600 rounded-full"></Skeleton>
                    <Skeleton className="h-6 w-16 bg-gray-600 rounded-full"></Skeleton>
                    <Skeleton className="h-6 w-16 bg-gray-600 rounded-full"></Skeleton>
                    <Skeleton className="h-6 w-16 bg-gray-600 rounded-full"></Skeleton>
                    <Skeleton className="h-6 w-16 bg-gray-600 rounded-full"></Skeleton>
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-6 w-20 bg-gray-600 rounded-xl"></Skeleton>
                    <Skeleton className="h-6 w-20 bg-gray-600 rounded-xl"></Skeleton>
                </div>
            </div>
        )
        // Show loading state while the session is being refetched
    }

    const navigation = [
        { name: "Home", href: "/" },
        { name: "Jobs", href: "/jobs" },
        { name: "Talents", href: "/talents" },
        { name: "Companies", href: "/companies" },
        { name: "About", href: "/about" },
      ]

    return (
        <header className="border-b border-zinc-800 sticky top-0 z-50 bg-black/50 backdrop-blur-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-primary text-white"  onClick={() => setCurrentPath('/')}>Content Society</Link>
                <nav className="px-1.5 py-1.5 rounded-full bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50">
                    <ul className="flex items-center space-x-1">
                        {navigation.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors hover:text-white ${
                                        currentPath === item.href ? "bg-zinc-800 text-white" : "text-zinc-400"
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
                        <Button onClick={()  => router.push("/signin")} size="sm" variant="outline" className="text-black border-primary hover:bg-slate-300 hover:text-black">
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