"use server"

import prisma from "@/config/prisma.config";
import { signupFormSchema, SignupSchemaType } from "@/lib/schema/authSchema"


export default async function Signup(_data: SignupSchemaType){
    const data = signupFormSchema.parse(_data);

    const isUserExist = await prisma.user.findFirst({
        where: { email: data.email }
    })

    

}