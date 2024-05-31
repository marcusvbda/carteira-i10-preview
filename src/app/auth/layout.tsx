import NextAuthSessionProvider from '@/providers/SessionProvider';

export default function AuthLayout({ children }: any) {
	return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
