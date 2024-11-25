"use client"
import { FC, ReactNode } from 'react';
import AuthProvider from './auth-provider';
import { SessionProvider } from 'next-auth/react';

const Provider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <AuthProvider>
            <SessionProvider> 
                { children }
            </SessionProvider>
        </AuthProvider>
    );
}

export default Provider;