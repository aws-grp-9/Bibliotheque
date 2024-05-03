import NextAuth from 'next-auth';
import { authConfig } from '../auth.config';
import Credentials from 'next-auth/providers/credentials';
import { CredentialInput } from 'next-auth/providers/credentials';
import { z } from "zod";
import bcrypt from 'bcryptjs';
import { getUserByEmail } from '@/data/user';

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                async authorize(credentials: { email: string; password: string;   userType: string; } | undefined) {
                    if (!credentials) return null;
                    const { email, password, userType } = credentials;
                    const parsedCredentials = z.object({
                        email: z.string().email(),
                        password: z.string().min(6)
                    }).safeParse({ email, password, userType });
                    if (parsedCredentials.success) {
                        const user = await getUserByEmail(email);
                        if (!user || !user.password) return null;
                        const passwordsMatch = await bcrypt.compare(password, user.password);
                        if (passwordsMatch) return user;
                    }
                    return null;
                }
            }
        })
    ]
});
