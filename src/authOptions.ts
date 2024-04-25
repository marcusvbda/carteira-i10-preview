import axios from 'axios';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const checkToken = async (token: string) => {
    try {
        const encodedToken = encodeURIComponent(token);
        const checkRoute = `${process.env.NEXT_PUBLIC_SERVER_URI}/api/check-wallet-token/${encodedToken}`;
        const response = await axios.get(checkRoute);
        return response.data;
    } catch (error) {
        // console.error(error);
        return null;
    }
};

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Token', type: 'text' }
            },
            async authorize(credentials: any) {
                const { token } = credentials;
                const authData = await checkToken(token);
                return {
                    ...authData
                };
            }
        } as any)
    ],
    callbacks: {
        async session({ session, user, token }: any) {
            const _user = token?.user || user;
            if (!_user) return {};
            return {
                ...session,
                user: _user
            };
        },
        async jwt({ token, user }: any) {
            if (user && !token?.user?.user) {
                token.user = user;
            } else {
                if (!token?.user?.user) {
                    const jwtToken = token?.user?.jwt || false;
                    const authData = await checkToken(jwtToken);
                    token.user = authData;
                }
            }
            return token;
        }
    },
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout'
    }
};
