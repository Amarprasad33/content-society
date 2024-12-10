"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Appbar() {
    const {data: session, status} = useSession();
    const router = useRouter();

    console.log("Data-", session, status);

    if (status === "loading") {
        return <div className="flex p-[14px] justify-around bg-slate-500">Loading...</div>; // Show loading state while the session is being refetched
    }
    return (
        <main>
            <div className="flex p-2 justify-around bg-slate-500">
                <div className="flex gap-3">
                    <div className="text-[20px] mt-[2px] font-bold italic pr-[6px]">
                        <Link href="/" className="">Content Society</Link>
                    </div>
                </div>
                <div className="variable-menu flex gap-[10px] items-center">
                    <Button onClick={()  => router.push("/signin")} variant="outline" className="bg-inherit border-black">
                        <span  className="">Login</span>                
                    </Button>
                    <Button variant="outline" className="bg-inherit border-black"
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
                    <div className="cursor-pointer"><Image className="rounded-full" src={session?.user?.image || '' } width={30} height={30} alt="profile-image" /></div>
                </div>
                {/* {JSON.stringify(session)} */}
            </div>
        </main>
    )
}