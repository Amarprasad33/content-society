import { TOKEN_EXPIRATION_TIME } from "@/config/auth.config";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider  from 'next-auth/providers/credentials';
import GoogleProvider  from 'next-auth/providers/google';
import { signInFormSchema } from "./schema/authSchema";
import { ErrorHandler } from "./error";
import prisma from '@/config/prisma.config';
import bcrypt from 'bcryptjs';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: 'signin',
            id: 'signin',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'email' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials: any): Promise<any> {
                const result = signInFormSchema.safeParse(credentials);
                // console.log('result-authOptions', result);

                if(!result.success){
                    throw new ErrorHandler(
                        'Bad request',
                        'BAD_REQUEST',
                        {
                            fieldErrors: result.error.flatten().fieldErrors,
                        }
                    )
                }
                const { email, password } = result.data;
                const user:any = await prisma.user.findUnique({
                    where: {
                        email: email,
                    },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        password: true,
                    }
                });
                if(!user || !user.password){
                    throw new ErrorHandler('Email or password is incorrect', 'AUTHENTICATION_FAILED');
                }

                console.log("user -", user)
                const isPasswordMatch = await bcrypt.compare(password, user.password);
                console.log("matchj-- ", isPasswordMatch);

                if(!isPasswordMatch){
                    throw new ErrorHandler('Email or password is incorrect', 'AUTHENTICATION_FAILED');
                }

                // console.log("credentials", credentials);
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                }
            }
        }),
    ],
    callbacks: {
        async signIn(signInProps: any) {
            console.log("props", signInProps);
            let { user, account, profile } = signInProps;

            if(account.provider === 'google'){
                const { id: googleOauthId, name, email, image: profileImg } = user;
                let isUserExist = await prisma.user.findFirst({
                    where: {
                        OR: [{email: email!}, {googleOauthId: googleOauthId!}]
                    }
                })
                if(!isUserExist){
                    isUserExist = await prisma.user.create({
                        data: {
                            name: name as string,
                            email: email as string,
                            googleOauthId,
                            profileImg
                        }
                    });
                }
            }

            return true;
        },

        async jwt(jwtProps){
            // console.log("jwtProps - ", jwtProps);
            const { token } = jwtProps;
            return token;
        },

        session({ session, token, user}) {
            // console.log("session", session);
            // Can edit the session OR add the new fields as required in the front-end
            return session;
        }
    },
    pages: {
        signIn: '/signin',
    },
    session: {
        strategy: 'jwt',
        maxAge: TOKEN_EXPIRATION_TIME
    },
    jwt: {
        maxAge: TOKEN_EXPIRATION_TIME
    },
    secret: process.env.NEXTAUTH_SECRET
} satisfies NextAuthOptions;