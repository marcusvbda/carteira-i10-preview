import axios from 'axios';
import { NextAuthOptions } from 'next-auth';
// eslint-disable-next-line import/no-named-as-default
import CredentialsProvider from 'next-auth/providers/credentials';
import { envoriment } from './constants/environment';

const checkToken = async (token: string) => {
	const encodedToken = encodeURIComponent(token);
	const checkRoute = `${envoriment.apiUrl}/api/check-wallet-token/${encodedToken}`;
	const response = await axios.get(checkRoute);
	return response.data;
};

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Token', type: 'text' },
			},
			async authorize(credentials: any) {
				const { token } = credentials;
				try {
					const authData = await checkToken(token);
					if (!authData) {
						return { error: 'Authentication failed' };
					}
					return {
						...authData,
					};
				} catch (error) {
					console.log('Error', error);
				}

				return null;
			},
		} as any),
	],
	callbacks: {
		async session({ session, user, token }: any) {
			const _user = token?.user || user;
			if (!_user) return {};
			return {
				...session,
				user: _user,
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
		},
	},
	pages: {
		signIn: '/auth/signin',
		signOut: '/auth/signout',
	},
};
