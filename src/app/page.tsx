"use client"
// import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-700">
        <h1 className="">Home page</h1>

        <Button onClick={()  => router.push("/jobs")} variant="default" className="bg-slate-500 border-rose-600">
            <span  className="">Explore jobs</span>                
        </Button>
    </main>
  );
}
