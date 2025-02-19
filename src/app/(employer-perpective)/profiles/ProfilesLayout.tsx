"use server"
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function ProfilesLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    if (!session || session?.user?.role !== "EMPLOYER") {
        // show a toast saying that "you have to create job to view the profiles"
        redirect("/?callbackUrl=/profiles&error=unauthorized&message=" + encodeURIComponent("Employer access only"));
    }

    return <>{children}</>;
}