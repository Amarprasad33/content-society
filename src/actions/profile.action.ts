"use server"
import prisma from "@/config/prisma.config";
import { ProfileSchemaType } from "@/lib/schema/profileSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function getUserProfile() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return { status: false, error: "Unauthorized" };
        }

        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            },
            select: {
                profileImg: true,
                portfolioUrl: true,
                skills: true,
                experience: true,
                role: true
            }
        });

        return { status: true, user };
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return { status: false, error: "Failed to fetch profile" };
    }
}

export async function updateProfile(data: ProfileSchemaType) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return { status: false, error: "Unauthorized" };
        }

        const updatedUser = await prisma.user.update({
            where: {
                email: session.user.email
            },
            data: {
                profileImg: data.profileImg,
                portfolioUrl: data.portfolioUrl,
                skills: data.skills,
                experience: data.experience,
                role: data.role
            }
        });

        return { status: true, user: updatedUser };
    } catch (error) {
        console.error("Error updating profile:", error);
        return { status: false, error: "Failed to update profile" };
    }
}