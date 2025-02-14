"use server"
import prisma from "@/config/prisma.config";
import { ProfileSchemaType } from "@/lib/schema/profileSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function updateProfile(data: ProfileSchemaType, imageUrl: string | undefined) {
    try {
        const session = await getServerSession(authOptions);
        console.log("session", session);
        if (!session?.user?.email) {
            return { status: false, error: "You are not authorized, please log in." };
        }

        const updatedUser = await prisma.user.update({
            where: {
                email: session.user.email
            },
            data: {
                profileImg: imageUrl,
                portfolioUrl: data.portfolioUrl,
                skills: data.skills,
                experience: data.experience,
                role: 'APPLICANT'
            }
        });

        return { status: true, user: updatedUser };
    } catch (error) {
        console.error("Error updating profile:", error);
        return { status: false, error: "Failed to update profile" };
    }
}


// To get the user profile
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

// To get the all the profiles -- APPLICANT
export async function getProfiles() {
    try {
        const profiles = await prisma.user.findMany({
            where: {
                role: "APPLICANT"
            },
            select: {
                id: true,
                name: true,
                email: true,
                profileImg: true,
                role: true,
                skills: true,
                experience: true,
                portfolioUrl: true,
            },
            orderBy: {
                name: 'asc'
            }
        });
        return { status: true, profiles };
    } catch (error) {
        console.error("Error fetching profiles:", error);
        return { status: false, error: "Failed to fetch profiles" };
    }
}