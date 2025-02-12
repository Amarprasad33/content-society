import { TOKEN_EXPIRATION_TIME } from "@/config/auth.config";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider  from 'next-auth/providers/credentials';
import GoogleProvider  from 'next-auth/providers/google';
import { signInFormSchema } from "./schema/authSchema";
import { ErrorHandler } from "./error";
import prisma from '@/config/prisma.config';
import bcrypt from 'bcryptjs';
import { DefaultSession } from "next-auth";
import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from "crypto";

const ENCRYPTION_KEY = scryptSync(
    process.env.NEXTAUTH_SECRET || 'fallback-secret',
    'salt',
    32
);
const IV_LENGTH = 16;

declare module "next-auth" {
    interface Session extends DefaultSession {
      id?: string; // Adding the 'id' field
      user?: {
        role?: string,
        profileImg?: string
      } & DefaultSession["user"]
    }
}

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
                        role: true,
                        profileImg: true
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
                    role: user.role,
                    profileImg: user.profileImg
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
                    },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        profileImg: true
                    }
                })
                if(!isUserExist){
                    isUserExist = await prisma.user.create({
                        data: {
                            name: name as string,
                            email: email as string,
                            googleOauthId,
                            profileImg,
                            role: 'USER'
                        }
                    });
                }
                user.dbUser = isUserExist;
            }
            if(account.provider === 'signin'){
                user.dbUser = user;
            }

            return true;
        },
        async redirect({ url, baseUrl }) {
            // Always redirect to the assigned page after login
            if(url.startsWith('/')){
                return `${baseUrl}${url}`;
            }
            // If the url is already absolute but on same host, allow it
            else if (url.startsWith(baseUrl)) {
                return url
            }
            return baseUrl;
        },
        async jwt({ token, user, account }){
            // console.log("jwt-tok-", token);
            // console.log("jwt-User-", user);
            if(user){
                // This runs when user first signs in
                token.role = (user as any).dbUser?.role;
                token.profileImg = (user as any).dbUser.profileImg;
                token.sub = encryptId((user as any).dbUser?.id);

            }
            return token;
        },

        session({ session, token, user}) {
            // console.log("session -authop", session);
            // console.log("TOKEN", token);
            // console.log("user - A-", user);
            if(session.user){
                session.user.role = token.role as string;
                session.user.profileImg = token.profileImg as string;
            }
            if(token.sub){
                session.id = token.sub;
            }
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

function encryptId(id: string): string {
    const iv = randomBytes(IV_LENGTH);
    const cipher = createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(id);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

function decryptId(encrypted: string): string {
    const [ivHex, encryptedHex] = encrypted.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const encryptedText = Buffer.from(encryptedHex, 'hex');
    const decipher = createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}