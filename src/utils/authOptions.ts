import axios from 'axios';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const checkToken = async (token: string) => {
    try {
        const checkRoute = `${process.env.NEXT_PUBLIC_SERVER_URI}/api/check-wallet-token/${token}`;
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
            // console.log(token)
            if (token.error) return {};
            return {
                ...session,
                user: token?.user || user
            };
        },
        async jwt({ token, user }: any) {
            if (user) {
                token.user = user;
            }

            const jwtToken = token?.user?.jwt || '';
            if (token.exp && token.exp * 1000 < Date.now()) {
                return {
                    ...token,
                    error: 'Token expired'
                };
            }
            const authData = await checkToken(jwtToken);
            if (authData) {
                if (token.error) delete token.error;
                token.user = authData;
            } else {
                return {
                    ...token,
                    error: 'Invalid token'
                };
            }
            return token;
        }
    },
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout'
    }
};
