"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

export default function Appbar() {
    const session = useSession();

    return (
        <main>
            <div className="flex p-2 justify-around bg-slate-500">
                <div className="flex gap-3">
                    <div className="text-[20px] mt-[2px] font-bold italic pr-[6px]">
                        <Link href="/" className="">Content Society</Link>
                    </div>
                </div>
                <div className="variable-menu">
                    <Button variant="outline" className="bg-inherit border-black">
                        <Link href="/signin" className="">Login</Link>                
                    </Button>
                    <Button variant="outline" className="bg-inherit border-black">
                        <Link href="/" className="" onClick={() => signOut({redirect:false})}>Logout</Link>                
                    </Button>
                </div>
                {JSON.stringify(session)}
            </div>
        </main>
    )
}