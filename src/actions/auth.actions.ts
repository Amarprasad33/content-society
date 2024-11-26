"use server"

import prisma from "@/config/prisma.config";
import { ErrorHandler } from "@/lib/error";
import { signupFormSchema, SignupSchemaType } from "@/lib/schema/authSchema";
import bcryptjs from 'bcryptjs';
// import { v4 as uuidv4 } from "uuid";


export default async function signUp(_data: SignupSchemaType){
    try {
        const data = signupFormSchema.parse(_data);

        const isUserExist = await prisma.user.findFirst({
            where: { email: data.email }
        })

        if (isUserExist)
            throw new ErrorHandler('User with this email already exist', 'BAD_REQUEST');

        const hashedPassword = await bcryptjs.hash(
            data.password,
            10
        );
        console.log("hashedPassword", hashedPassword);
         
        const user = await prisma.user.create({
            data: {
                ...data,
                password: hashedPassword
            }
        })
        console.log("user -- db", user);

        // await prisma.$transaction(
        //     async (txn) => {
        //         const user = await txn.user.create({
        //             data: {
        //                 ...data,
        //                 password: hashedPassword
        //             }
        //         });
        //         console.log("user created in db: ", user);
        //         return user;
        //     },
        //     {
        //         maxWait: 5000,
        //         timeout: 15000
        //     }
        // );
        return {
            status: true,
            code: 201,
            message: "User registered successfully."
        };

    } catch (error) {
        console.error("err", error);
        throw new ErrorHandler('Registration failed. Please try again!!', 'INTERNAL_SERVER_ERROR');
    }
    

}