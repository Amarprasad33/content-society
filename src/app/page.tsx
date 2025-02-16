"use client"
// import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";


export default function Home() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get('error');
    const message = searchParams.get('message');
    console.log("error", error);
    console.log("message", message);
    if(error === 'unauthorized' && message){
      console.log("IFF")
      toast({
        variant: 'destructive',
        title: "Access Denied",
        description: decodeURIComponent(message),
      });
    }
  }, [searchParams, toast])

  return (
    <main className="min-h-screen bg-slate-700">
        <h1 className="">Home page</h1>

        <Button onClick={()  => router.push("/jobs")} variant="default" className="bg-slate-500 border-rose-600">
            <span  className="">Explore jobs</span>                
        </Button>
    </main>
  );
}
