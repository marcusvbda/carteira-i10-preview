import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/authOptions';
import { seo } from '@/constants/seo';
import { AuthProvider } from '@/context/authContext';
import { DefinitionsProvider } from '@/context/definitionsContext';
import { ThemeProvider } from '@/context/themeContext';
import { WalletProvider } from '@/context/walletContext';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = seo.default;

export default async function RootLayout({ children }: any) {
	const session = await getServerSession(authOptions);
	return (
		<html lang="pt-BR">
			<body suppressHydrationWarning className={inter.className}>
				<AuthProvider session={session}>
					<WalletProvider>
						<DefinitionsProvider>
							<ThemeProvider>{children}</ThemeProvider>
						</DefinitionsProvider>
					</WalletProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
